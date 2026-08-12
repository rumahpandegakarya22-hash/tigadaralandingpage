// Migration idempoten: tabel landing_room_photos, kolom is_cover di galeri,
// dan index untuk mempercepat query cek ketersediaan.
// Jalankan: npx tsx scripts/migrate-room-photos.mjs
import { createClient } from "@libsql/client";
import { readFileSync } from "node:fs";

for (const line of readFileSync(new URL("../.env.local", import.meta.url), "utf8").split("\n")) {
  const i = line.indexOf("=");
  if (i === -1 || line.trim().startsWith("#")) continue;
  const key = line.slice(0, i).trim();
  if (!process.env[key]) process.env[key] = line.slice(i + 1).trim();
}

const c = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function columnExists(table, column) {
  const r = await c.execute(`PRAGMA table_info(${table})`);
  return r.rows.some((row) => row.name === column);
}

// 1. Tabel foto per kamar
await c.execute(`
  CREATE TABLE IF NOT EXISTS landing_room_photos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    room_id INTEGER NOT NULL REFERENCES landing_rooms(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    alt TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    is_cover INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (current_timestamp),
    updated_at TEXT NOT NULL DEFAULT (current_timestamp)
  )
`);
console.log("landing_room_photos: OK");

// 2. Kolom is_cover di galeri (kalau belum ada)
if (!(await columnExists("landing_gallery_photos", "is_cover"))) {
  await c.execute(`ALTER TABLE landing_gallery_photos ADD COLUMN is_cover INTEGER NOT NULL DEFAULT 0`);
  console.log("landing_gallery_photos.is_cover: ditambahkan");
} else {
  console.log("landing_gallery_photos.is_cover: sudah ada");
}

// 3. Index
const indexes = [
  `CREATE INDEX IF NOT EXISTS idx_room_photos_room ON landing_room_photos(room_id, "order")`,
  // Percepat cek ketersediaan
  `CREATE INDEX IF NOT EXISTS idx_kamar_tipe ON kamar(tipe_kamar)`,
  `CREATE INDEX IF NOT EXISTS idx_occ_status ON occupancy_history(status)`,
  `CREATE INDEX IF NOT EXISTS idx_booking_status ON booking(status_booking)`,
];
for (const sql of indexes) {
  await c.execute(sql);
}
console.log(`index: ${indexes.length} OK`);

console.log("Migration selesai.");
process.exit(0);
