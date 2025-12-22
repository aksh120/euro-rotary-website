import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { fullName, email, gender } = body;

        // Basic validation
        if (!fullName || !email) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Insert into Supabase
        const { data, error } = await supabaseAdmin
            .from('participants')
            .insert([
                {
                    full_name: fullName,
                    email: email,
                    phone: null, // Phone is optional in schema, and we removed the field from form
                    gender,
                    status: 'pending'
                }
            ])
            .select()
            .single();

        if (error) {
            console.error('Supabase Error:', error);
            return NextResponse.json({ error: 'Database error' }, { status: 500 });
        }

        return NextResponse.json({ success: true, participantId: data.id });
    } catch (err) {
        console.error('Registration Error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
