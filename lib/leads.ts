import { z } from "zod";
import { pmsClient } from "@/lib/db/client";

// Prospek ditulis ke tabel `leads` di DB ops (dibaca Mini App Ops dan laporan marketing).
// Struktur tabel TIDAK diubah: hanya INSERT baris baru + SELECT untuk cek duplikat/batas harian.
const SOURCE = "Landing Page";
const PLATFORM = "Website";
const DAILY_CAP = 100;

export const leadSchema = z.object({
  slug: z.string().trim().min(1).max(80),
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(8).max(20),
  roomType: z.string().trim().max(60).default(""),
  moveInDate: z.union([z.literal(""), z.string().regex(/^\d{4}-\d{2}-\d{2}$/)]).default(""),
  message: z.string().trim().max(500).default(""),
  website: z.string().default(""), // honeypot: manusia tidak mengisinya
});
export type LeadInput = z.infer<typeof leadSchema>;

/** Sama dengan normalizePhone di Mini App Ops, agar format no_hp_wa konsisten (62812...). */
export function normalizePhone(input: string): string {
  let p = input.replace(/[^0-9+]/g, "");
  if (p.startsWith("+62")) p = "62" + p.slice(3);
  else if (p.startsWith("0")) p = "62" + p.slice(1);
  else if (p.startsWith("8")) p = "62" + p;
  if (!/^628[0-9]{7,12}$/.test(p)) throw new Error("PHONE_INVALID");
  return p;
}

const todayWib = () => new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Jakarta" }).format(new Date());

export type SaveResult = { status: "created" | "duplicate" | "capped"; phone: string; id?: number };

export async function saveLead(lead: LeadInput, propertyName: string): Promise<SaveResult> {
  const phone = normalizePhone(lead.phone);
  const tanggal = todayWib();

  const [dup, cap] = await Promise.all([
    pmsClient.execute({
      sql: "SELECT id FROM leads WHERE no_hp_wa = ? AND sumber_leads = ? AND tanggal = ? LIMIT 1",
      args: [phone, SOURCE, tanggal],
    }),
    pmsClient.execute({
      sql: "SELECT COUNT(*) AS n FROM leads WHERE sumber_leads = ? AND tanggal = ?",
      args: [SOURCE, tanggal],
    }),
  ]);
  if (dup.rows.length) return { status: "duplicate", phone };
  if (Number(cap.rows[0].n) >= DAILY_CAP) return { status: "capped", phone };

  const keterangan = [`Properti: ${propertyName}`, lead.message].filter(Boolean).join("\n");
  const res = await pmsClient.execute({
    sql: `INSERT INTO leads
            (tanggal, nama_leads, no_hp_wa, sumber_leads, platform, kamar_dicari, checkin_rencana,
             status_leads, tindak_lanjut, pic, keterangan)
          VALUES (?, ?, ?, ?, ?, ?, ?, 'Baru', '', '', ?)`,
    args: [tanggal, lead.name, phone, SOURCE, PLATFORM, lead.roomType, lead.moveInDate || null, keterangan],
  });
  return { status: "created", phone, id: Number(res.lastInsertRowid) };
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(new Date(`${iso}T00:00:00`));

export function buildLeadMessage(lead: LeadInput, phone: string, propertyName: string): string {
  const time = new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
  const lines = [
    "🔔 <b>Prospek baru dari Landing Page</b>",
    `🏠 ${esc(propertyName)}`,
    `👤 ${esc(lead.name)}`,
    `📱 +${phone}`,
    lead.roomType ? `🛏 ${esc(lead.roomType)}` : "",
    lead.moveInDate ? `📅 Rencana masuk: ${formatDate(lead.moveInDate)}` : "",
    lead.message ? `💬 ${esc(lead.message)}` : "",
    `🕒 ${time} WIB`,
  ];
  return lines.filter(Boolean).join("\n");
}

/** Kirim ke grup Telegram. Tidak pernah melempar error: kegagalan notifikasi tidak boleh membatalkan prospek. */
export async function notifyTelegram(text: string, phone: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("[leads] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID belum diisi, notifikasi dilewati.");
    return false;
  }

  const body = JSON.stringify({
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
    reply_markup: { inline_keyboard: [[{ text: "💬 Chat WhatsApp", url: `https://wa.me/${phone}` }]] },
  });

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        signal: AbortSignal.timeout(5000),
      });
      if (res.ok) return true;
      console.error(`[leads] Telegram percobaan ${attempt} gagal: HTTP ${res.status}`);
    } catch (err) {
      console.error(`[leads] Telegram percobaan ${attempt} error:`, err instanceof Error ? err.message : err);
    }
  }
  return false;
}
