"use client";

// Loader global next/image: foto Cloudinary di-resize oleh Cloudinary sendiri (sekali proses, tanpa
// kompresi ulang oleh Next). `c_limit` tidak pernah memperbesar melewati ukuran asli.
// Host lain (mis. placeholder picsum) dikirim apa adanya.
const CLOUDINARY = /^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(?:[^/]+\/)*?(v\d+\/.+)$/;

export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  const m = CLOUDINARY.exec(src);
  if (!m) return src;
  // quality >= 85 (hero, pratinjau layar penuh) memakai q_auto:best; selebihnya q_auto:good.
  const q = quality && quality >= 85 ? "q_auto:best" : "q_auto:good";
  return `${m[1]}f_auto,${q},c_limit,w_${width}/${m[2]}`;
}
