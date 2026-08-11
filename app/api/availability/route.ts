import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/db/client";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const tipe_kamar = searchParams.get("tipe_kamar");
  const check_in_date = searchParams.get("check_in_date");

  if (!tipe_kamar || !check_in_date) {
    return NextResponse.json({ error: "Parameter tidak lengkap" }, { status: 400 });
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(check_in_date)) {
    return NextResponse.json({ error: "Format tanggal tidak valid" }, { status: 400 });
  }

  try {
    const [totalResult, availableResult] = await Promise.all([
      client.execute({
        sql: "SELECT COUNT(*) AS total FROM kamar WHERE tipe_kamar = ?",
        args: [tipe_kamar],
      }),
      client.execute({
        sql: `SELECT COUNT(*) AS available
              FROM kamar k
              WHERE k.tipe_kamar = ?
                AND k.no_kamar NOT IN (
                  SELECT CAST(oh.no_kamar AS INTEGER)
                  FROM occupancy_history oh
                  WHERE oh.status = 'Check-in'
                )
                AND k.no_kamar NOT IN (
                  SELECT b.kamar_no
                  FROM booking b
                  WHERE b.status_booking = 'Check-in'
                )`,
        args: [tipe_kamar],
      }),
    ]);

    const total = Number(totalResult.rows[0].total);
    const available = Number(availableResult.rows[0].available);

    return NextResponse.json({ available, total, tipe_kamar, check_in_date });
  } catch (err) {
    console.error("Availability check error:", err);
    return NextResponse.json({ error: "Gagal mengecek ketersediaan" }, { status: 500 });
  }
}
