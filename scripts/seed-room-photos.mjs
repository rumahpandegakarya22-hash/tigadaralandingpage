// Isi landing_room_photos untuk kamar yang belum punya foto slideshow.
// Foto utama (landing_rooms.photo_url) jadi cover, ditambah beberapa variasi demo.
// Non-destruktif: kamar yang sudah punya foto dilewati.
// Jalankan: npx tsx scripts/seed-room-photos.mjs
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

const rooms = await c.execute("SELECT id, name, photo_url, photo_alt FROM landing_rooms ORDER BY id");

for (const r of rooms.rows) {
  const existing = await c.execute({
    sql: "SELECT COUNT(*) n FROM landing_room_photos WHERE room_id = ?",
    args: [r.id],
  });
  if (Number(existing.rows[0].n) > 0) {
    console.log(`Kamar ${r.id} (${r.name}): sudah ada foto, dilewati.`);
    continue;
  }

  const slug = String(r.name).toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const urls = [
    r.photo_url,
    `https://picsum.photos/seed/${slug}-2/1200/900`,
    `https://picsum.photos/seed/${slug}-3/1200/900`,
    `https://picsum.photos/seed/${slug}-4/1200/900`,
  ];

  for (let i = 0; i < urls.length; i++) {
    await c.execute({
      sql: `INSERT INTO landing_room_photos (room_id, url, alt, "order", is_cover)
            VALUES (?, ?, ?, ?, ?)`,
      args: [r.id, urls[i], r.photo_alt, i, i === 0 ? 1 : 0],
    });
  }
  console.log(`Kamar ${r.id} (${r.name}): ${urls.length} foto ditambahkan.`);
}

console.log("Seed foto kamar selesai.");
process.exit(0);
