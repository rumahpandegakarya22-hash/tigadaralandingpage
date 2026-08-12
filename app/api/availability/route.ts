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
    // Satu query: total unit + berapa yang tersedia sekaligus (conditional aggregation),
    // hemat satu round-trip ke DB remote. Subquery ditandai NOT EXISTS + index status.
    const res = await client.execute({
      sql: `SELECT
              COUNT(*) AS total,
              SUM(
                CASE WHEN NOT EXISTS (
                    SELECT 1 FROM occupancy_history oh
                    WHERE CAST(oh.no_kamar AS INTEGER) = k.no_kamar AND oh.status = 'Check-in'
                  )
                  AND NOT EXISTS (
                    SELECT 1 FROM booking b
                    WHERE b.kamar_no = k.no_kamar AND b.status_booking = 'Check-in'
                  )
                THEN 1 ELSE 0 END
              ) AS available
            FROM kamar k
            WHERE k.tipe_kamar = ?`,
      args: [tipe_kamar],
    });

    const row = res.rows[0];
    const total = Number(row.total);
    const available = Number(row.available ?? 0);

    return NextResponse.json({ available, total, tipe_kamar, check_in_date });
  } catch (err) {
    console.error("Availability check error:", err);
    return NextResponse.json({ error: "Gagal mengecek ketersediaan" }, { status: 500 });
  }
}
