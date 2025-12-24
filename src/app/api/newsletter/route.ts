import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { sendNewsletter } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    const { error } = await supabaseAdmin
      .from("newsletter_subscriptions")
      .insert([{ email }]);

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { message: "Already subscribed" },
          { status: 200 },
        );
      }
      throw error;
    }

    await sendNewsletter(
      [email],
      "Welcome to the Euro Rotary Inner Circle",
      `
            <p>Welcome.</p>
            <p>You have secured your place in our inner circle. You will now be the first to know about route reveals, VIP checkpoints, and exclusive gatherings.</p>
            <p>Prepare your engine.</p>
            `,
    );

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed",
    });
  } catch (error: any) {
    console.error("Newsletter Error:", error);
    return NextResponse.json(
      { error: error.message || "Subscription failed" },
      { status: 500 },
    );
  }
}
