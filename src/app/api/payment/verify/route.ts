import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabaseAdmin } from '@/lib/supabase';
import { sendConfirmationEmail } from '@/lib/mail';

export async function POST(request: Request) {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            participantId
        } = await request.json();

        // 1. Verify Signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
            .update(body.toString())
            .digest('hex');

        if (expectedSignature !== razorpay_signature) {
            return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
        }

        // 2. Generate Bib Number
        // Simple logic: Count confirmed + 100.
        // In a real high-frequency system, we'd use a sequence or atomic increment.
        const { count } = await supabaseAdmin
            .from('participants')
            .select('id', { count: 'exact', head: true })
            .eq('status', 'confirmed');

        const nextBib = (100 + (count || 0) + 1).toString();

        // 3. Update Participant
        const { data: participant, error } = await supabaseAdmin
            .from('participants')
            .update({
                status: 'confirmed',
                payment_id: razorpay_payment_id,
                bib_number: nextBib
            })
            .eq('id', participantId)
            .select()
            .single();

        if (error || !participant) {
            console.error('DB Update Error:', error);
            return NextResponse.json({ error: 'Payment verified but DB update failed' }, { status: 500 });
        }

        // 4. Send Email (Async, don't block response too long)
        try {
            await sendConfirmationEmail(participant.email, participant.full_name, nextBib);
        } catch (emailErr) {
            console.error('Email sending failed:', emailErr);
            // We still return success as the payment/registration is done.
        }

        return NextResponse.json({ success: true, bib: nextBib });

    } catch (err) {
        console.error('Verification Error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
