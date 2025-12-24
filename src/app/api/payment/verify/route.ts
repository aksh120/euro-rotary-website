import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase";
import { sendConfirmationEmail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      participantId,
    } = await request.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const { count } = await supabaseAdmin
      .from("participants")
      .select("id", { count: "exact", head: true })
      .eq("status", "confirmed");

    const nextBib = (100 + (count || 0) + 1).toString();

    const { data: participant, error } = await supabaseAdmin
      .from("participants")
      .update({
        status: "confirmed",
        payment_id: razorpay_payment_id,
        bib_number: nextBib,
      })
      .eq("id", participantId)
      .select()
      .single();

    if (error || !participant) {
      console.error("DB Update Error:", error);
      return NextResponse.json(
        { error: "Payment verified but DB update failed" },
        { status: 500 },
      );
    }

    try {
      await sendConfirmationEmail(
        participant.email,
        participant.full_name,
        nextBib,
      );
    } catch (emailErr) {
      console.error("Email sending failed:", emailErr);
    }

    return NextResponse.json({ success: true, bib: nextBib });
  } catch (err) {
    console.error("Verification Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
