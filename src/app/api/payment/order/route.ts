import { NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { participantId, amount } = await request.json();

    if (!participantId || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: participantId,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
    });
  } catch (err) {
    console.error("Razorpay Order Error:", err);
    return NextResponse.json(
      { error: "Error creating order" },
      { status: 500 },
    );
  }
}
