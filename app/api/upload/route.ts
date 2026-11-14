import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/session";

const MAX_BYTES = 4 * 1024 * 1024; // batas body serverless Vercel ±4.5MB
const FOLDER = "kost-tiga-dara";

// proxy.ts hanya menjaga /admin, jadi route ini wajib cek sesi sendiri.
export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }

  const { CLOUDINARY_CLOUD_NAME: cloud, CLOUDINARY_API_KEY: key, CLOUDINARY_API_SECRET: secret } = process.env;
  if (!cloud || !key || !secret) {
    return NextResponse.json({ error: "Cloudinary belum dikonfigurasi di env" }, { status: 500 });
  }

  const file = (await req.formData()).get("file");
  if (!(file instanceof File) || !["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    return NextResponse.json({ error: "File harus JPG, PNG, atau WebP" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Ukuran file maksimal 4MB" }, { status: 413 });
  }

  // Signed upload: parameter diurutkan abjad, lalu ditambah API secret dan di-SHA1.
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signature = createHash("sha1")
    .update(`folder=${FOLDER}&timestamp=${timestamp}${secret}`)
    .digest("hex");

  const body = new FormData();
  body.set("file", file);
  body.set("api_key", key);
  body.set("timestamp", timestamp);
  body.set("folder", FOLDER);
  body.set("signature", signature);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, { method: "POST", body });
  const json = await res.json();
  if (!res.ok) {
    return NextResponse.json({ error: json.error?.message ?? "Upload ke Cloudinary gagal" }, { status: 502 });
  }

  return NextResponse.json({ url: (json.secure_url as string).replace("/upload/", "/upload/f_auto,q_auto/") });
}
