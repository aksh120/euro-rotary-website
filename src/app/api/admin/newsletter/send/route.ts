import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendNewsletter } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: subscribers, error: dbError } = await supabase
      .from("newsletter_subscriptions")
      .select("email")
      .eq("unsubscribed", false);

    if (dbError) throw dbError;

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json(
        { message: "No subscribers found" },
        { status: 400 },
      );
    }

    const emailList = subscribers.map((s) => s.email);
    const { subject, message } = await request.json();

    if (!subject || !message) {
      return NextResponse.json(
        { error: "Subject and message are required" },
        { status: 400 },
      );
    }

    await sendNewsletter(emailList, subject, message);

    return NextResponse.json({ success: true, count: emailList.length });
  } catch (error: any) {
    console.error("Send Newsletter Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send" },
      { status: 500 },
    );
  }
}
