"use client";

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CtaButton } from "./cta-button";

const PHONE_PATTERN = /^(\+62|62|0)8[0-9]{8,11}$/;

type FormErrors = { name?: string; phone?: string };

export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  function validate(): FormErrors {
    const nextErrors: FormErrors = {};
    if (name.trim().length < 2) {
      nextErrors.name = "Nama minimal 2 karakter.";
    }
    if (!PHONE_PATTERN.test(phone.trim().replace(/[\s-]/g, ""))) {
      nextErrors.phone = "Masukkan nomor HP/WhatsApp yang valid, contoh 08123456789.";
    }
    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    // Mockup: belum terhubung ke backend (Turso/Drizzle) — simulasi pengiriman prospek.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-md border border-hairline bg-canvas p-8 text-center">
        <CheckCircle2 className="size-10 text-primary" aria-hidden="true" />
        <p className="font-heading text-lg font-semibold text-ink">Terima kasih, {name}!</p>
        <p className="text-sm text-ink">
          Pesan Anda sudah kami terima. Tim kami akan segera menghubungi Anda ke nomor {phone}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-name">Nama</Label>
        <Input
          id="contact-name"
          name="name"
          autoComplete="name"
          placeholder="Nama lengkap Anda"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
        />
        {errors.name ? (
          <p id="contact-name-error" className="text-xs text-primary-error-text">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-phone">Nomor HP / WhatsApp</Label>
        <Input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="08123456789"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "contact-phone-error" : undefined}
        />
        {errors.phone ? (
          <p id="contact-phone-error" className="text-xs text-primary-error-text">
            {errors.phone}
          </p>
        ) : null}
      </div>

      <CtaButton type="submit" variant="primary" disabled={status === "submitting"} className="mt-1 w-full">
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Mengirim...
          </>
        ) : (
          "Hubungi Saya"
        )}
      </CtaButton>
    </form>
  );
}
