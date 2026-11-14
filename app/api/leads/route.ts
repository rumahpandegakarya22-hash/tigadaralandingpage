import { NextRequest, NextResponse } from "next/server";
import { getAllProperties } from "@/lib/data";
import { buildLeadMessage, leadSchema, notifyTelegram, saveLead } from "@/lib/leads";

// Endpoint publik formulir kontak: simpan ke `leads`, lalu notifikasi Telegram.
export async function POST(req: NextRequest) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "INVALID" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    const field = String(parsed.error.issues[0]?.path[0] ?? "");
    return NextResponse.json({ error: "INVALID", field }, { status: 400 });
  }
  const lead = parsed.data;

  // Bot mengisi kolom jebakan: pura-pura sukses supaya tidak belajar menghindarinya.
  if (lead.website) return NextResponse.json({ ok: true });

  const property = (await getAllProperties()).find((p) => p.slug === lead.slug);
  if (!property) return NextResponse.json({ error: "INVALID", field: "slug" }, { status: 400 });

  try {
    const saved = await saveLead(lead, property.name);
    if (saved.status === "created") {
      await notifyTelegram(buildLeadMessage(lead, saved.phone, property.name), saved.phone);
    } else if (saved.status === "capped") {
      return NextResponse.json({ error: "BUSY" }, { status: 429 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof Error && err.message === "PHONE_INVALID") {
      return NextResponse.json({ error: "INVALID", field: "phone" }, { status: 400 });
    }
    console.error("[leads] gagal menyimpan prospek:", err);
    return NextResponse.json({ error: "SERVER" }, { status: 500 });
  }
}
