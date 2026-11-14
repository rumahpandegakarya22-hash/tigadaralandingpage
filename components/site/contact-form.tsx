"use client";

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CtaButton } from "./cta-button";
import { fillCopy, type LandingCopy } from "@/lib/copy";

const PHONE_PATTERN = /^(\+62|62|0)8[0-9]{8,11}$/;
const FIELD_CLASS =
  "w-full rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

type FormErrors = { name?: string; phone?: string; server?: string };

export function ContactForm({
  copy,
  slug,
  kamarTypes,
}: {
  copy: LandingCopy;
  slug: string;
  kamarTypes: string[];
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [roomType, setRoomType] = useState("");
  const [moveInDate, setMoveInDate] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const today = new Date().toISOString().slice(0, 10);

  function validate(): FormErrors {
    const nextErrors: FormErrors = {};
    if (name.trim().length < 2) {
      nextErrors.name = copy.form_error_name;
    }
    if (!PHONE_PATTERN.test(phone.trim().replace(/[\s-]/g, ""))) {
      nextErrors.phone = copy.form_error_phone;
    }
    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, name, phone, roomType, moveInDate, message, website }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrors(data.field === "phone" ? { phone: copy.form_error_phone } : { server: copy.form_error_server });
        setStatus("idle");
        return;
      }
      setStatus("success");
    } catch {
      setErrors({ server: copy.form_error_server });
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-md border border-hairline bg-canvas p-8 text-center">
        <CheckCircle2 className="size-10 text-primary" aria-hidden="true" />
        <p className="font-heading text-lg font-semibold text-ink">{fillCopy(copy.form_success_title, { name })}</p>
        <p className="text-sm text-ink">{fillCopy(copy.form_success_desc, { phone })}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-name">{copy.form_name_label}</Label>
        <Input
          id="contact-name"
          name="name"
          autoComplete="name"
          placeholder={copy.form_name_placeholder}
          value={name}
          maxLength={80}
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
        <Label htmlFor="contact-phone">{copy.form_phone_label}</Label>
        <Input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder={copy.form_phone_placeholder}
          value={phone}
          maxLength={20}
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {kamarTypes.length > 0 ? (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="contact-room">{copy.form_type_label}</Label>
            <select
              id="contact-room"
              name="roomType"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className={`${FIELD_CLASS} h-8`}
            >
              <option value="">{copy.form_type_placeholder}</option>
              {kamarTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        ) : null}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="contact-date">{copy.form_date_label}</Label>
          <input
            id="contact-date"
            name="moveInDate"
            type="date"
            min={today}
            value={moveInDate}
            onChange={(e) => setMoveInDate(e.target.value)}
            className={`${FIELD_CLASS} h-8`}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-message">{copy.form_message_label}</Label>
        <textarea
          id="contact-message"
          name="message"
          rows={3}
          maxLength={500}
          placeholder={copy.form_message_placeholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={FIELD_CLASS}
        />
      </div>

      {/* Kolom jebakan bot: tersembunyi dari pengguna dan pembaca layar. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {errors.server ? <p className="text-sm text-primary-error-text">{errors.server}</p> : null}

      <CtaButton type="submit" variant="primary" disabled={status === "submitting"} className="mt-1 w-full">
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            {copy.form_sending}
          </>
        ) : (
          copy.form_submit
        )}
      </CtaButton>
    </form>
  );
}
