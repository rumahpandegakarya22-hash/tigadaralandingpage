"use client";

import { useState, useTransition } from "react";
import { CtaButton } from "@/components/site/cta-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DEFAULT_COPY, type CopySection } from "@/lib/copy";

export function CopyForm({
  section,
  values,
  action,
}: {
  section: CopySection;
  values: Record<string, string>;
  action: (formData: FormData) => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  return (
    <form
      action={(formData) => {
        setSaved(false);
        setError("");
        startTransition(async () => {
          try {
            await action(formData);
            setSaved(true);
          } catch {
            setError("Gagal menyimpan. Coba login ulang lalu simpan lagi.");
          }
        });
      }}
      className="flex flex-col gap-4 rounded-md border border-hairline bg-canvas p-6"
    >
      <div>
        <h2 className="font-heading text-base font-semibold text-ink">{section.title}</h2>
        <p className="mt-1 text-xs text-ink">
          {section.description ?? "Kosongkan kolom untuk kembali ke teks bawaan."}
        </p>
      </div>

      {section.fields.map((field) => {
        const value = values[field.key] ?? "";
        const changed = value !== DEFAULT_COPY[field.key];
        return (
          <div key={field.key} className="flex flex-col gap-1.5">
            <Label htmlFor={field.key}>{field.label}</Label>
            {field.multiline ? (
              <textarea
                id={field.key}
                name={field.key}
                defaultValue={value}
                rows={3}
                className="w-full rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            ) : (
              <Input id={field.key} name={field.key} defaultValue={value} />
            )}
            {changed ? <p className="text-xs text-muted">Bawaan: {DEFAULT_COPY[field.key]}</p> : null}
          </div>
        );
      })}

      <div className="flex items-center gap-3">
        <CtaButton type="submit" variant="primary" size="md" disabled={pending} className="w-fit text-sm">
          {pending ? "Menyimpan..." : "Simpan Teks"}
        </CtaButton>
        {saved ? <span className="text-sm text-ink">Tersimpan.</span> : null}
        {error ? <span className="text-sm text-primary-error-text">{error}</span> : null}
      </div>
    </form>
  );
}
