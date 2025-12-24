import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { createClient } from "@/lib/supabase/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error("Auth Error:", authError);
      return NextResponse.json(
        { error: "Unauthorized: " + (authError?.message || "No user found") },
        { status: 401 },
      );
    }

    const { error } = await supabaseAdmin
      .from("participants")
      .delete()
      .eq("id", params.id);

    if (error) {
      console.error("Supabase Delete Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Delete Unexpected Error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to delete participant" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error("Auth Error:", authError);
      return NextResponse.json(
        { error: "Unauthorized: " + (authError?.message || "No user found") },
        { status: 401 },
      );
    }

    const body = await request.json();

    delete body.id;
    delete body.created_at;

    const { data, error } = await supabaseAdmin
      .from("participants")
      .update(body)
      .eq("id", params.id)
      .select()
      .single();

    if (error) {
      console.error("Supabase Update Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err: any) {
    console.error("Update Unexpected Error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to update participant" },
      { status: 500 },
    );
  }
}
