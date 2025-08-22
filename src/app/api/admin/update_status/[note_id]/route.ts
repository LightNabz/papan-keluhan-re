import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ note_id: string }> }
) {
  const { params } = context;
  const { note_id } = await params;

  const cookies = req.cookies;
  if (!cookies.get("admin_logged_in")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { status } = body as { status: string };

  try {
    await axios.patch(
      `${process.env.SUPABASE_URL}/rest/v1/notes?id=eq.${note_id}`,
      { status },
      {
        headers: {
          apikey: process.env.SUPABASE_KEY!,
          Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
      }
    );

    return NextResponse.json({ message: "Status updated successfully" });
  } catch {
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}
