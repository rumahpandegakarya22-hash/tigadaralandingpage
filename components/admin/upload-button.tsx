"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";

// Perkecil di browser (maks 1600px, JPEG) agar muat batas body serverless dan hemat kuota.
async function shrink(file: File): Promise<Blob> {
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bmp.width * scale);
  canvas.height = Math.round(bmp.height * scale);
  canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Gagal memproses gambar"))), "image/jpeg", 0.85)
  );
}

export function UploadButton({ name, multiple }: { name: string; multiple?: boolean }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!files.length) return;
    setBusy(true);
    setError("");
    try {
      const urls: string[] = [];
      for (const file of files) {
        const body = new FormData();
        body.set("file", await shrink(file), "foto.jpg");
        const res = await fetch("/api/upload", { method: "POST", body });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? "Upload gagal");
        urls.push(json.url);
      }
      // Input tidak terkontrol (defaultValue), jadi isi langsung lewat DOM milik form yang sama.
      const target = fileRef.current?.closest("form")?.elements.namedItem(name) as
        | HTMLInputElement
        | HTMLTextAreaElement
        | null;
      if (target) {
        target.value = multiple ? [target.value.trim(), ...urls].filter(Boolean).join("\n") : urls[0];
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload gagal");
    } finally {
      setBusy(false);
    }
  }

  return (
    <span className="inline-flex items-center gap-2">
      <button
        type="button"
        disabled={busy}
        onClick={() => fileRef.current?.click()}
        className="inline-flex items-center gap-1 rounded-sm px-2 py-1 text-xs font-medium text-ink hover:bg-surface-soft disabled:opacity-50"
      >
        {busy ? <Loader2 className="size-3.5 animate-spin" /> : <ImagePlus className="size-3.5" />}
        {busy ? "Mengunggah…" : multiple ? "Upload foto" : "Upload"}
      </button>
      {error ? <span className="text-xs text-primary-error-text">{error}</span> : null}
      <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" multiple={multiple} hidden onChange={onChange} />
    </span>
  );
}
