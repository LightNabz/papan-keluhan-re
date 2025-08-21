import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const title = form.get("title") as string;
    const content = form.get("content") as string;
    const name = (form.get("name") as string) || "Anon";
    const jenis_keluhan = form.get("jenis_keluhan") as string;
    const status = (form.get("status") as string) || "Menunggu Respon";

    let image_url = null;
    const file = form.get("image") as File | null;

    if (file) {
      const filename = `${uuidv4()}_${file.name}`;
      const arrayBuffer = await file.arrayBuffer();
      const { error } = await supabase.storage
        .from(process.env.SUPABASE_BUCKET!)
        .upload(filename, arrayBuffer, { contentType: file.type });

      if (!error) {
        image_url = `${process.env.SUPABASE_URL}/storage/v1/object/public/${process.env.SUPABASE_BUCKET}/${filename}`;
      }
    }

    const { error: insertError } = await supabase
      .from("notes")
      .insert([{ title, content, name, jenis_keluhan, status, image_url }]);

    if (insertError) throw insertError;

    return new Response(JSON.stringify({ message: "Note submitted successfully" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || "Failed to submit note" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
