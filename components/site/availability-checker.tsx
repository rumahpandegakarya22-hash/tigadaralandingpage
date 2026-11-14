"use client";

import { useState, type FormEvent } from "react";
import { Search, CheckCircle, XCircle, Loader2, MessageCircle } from "lucide-react";
import { Container } from "./container";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { CtaButton } from "./cta-button";
import type { Property } from "@/lib/types";
import { fillCopy, type LandingCopy } from "@/lib/copy";
import { buildWhatsappLink, cn } from "@/lib/utils";

type AvailabilityResult = {
  available: number;
  total: number;
  tipe_kamar: string;
  check_in_date: string;
};

type Status = "idle" | "loading" | "success" | "error";

export function AvailabilityChecker({
  property,
  kamarTypes,
  copy,
}: {
  property: Property;
  kamarTypes: string[];
  copy: LandingCopy;
}) {
  const [tipeKamar, setTipeKamar] = useState(kamarTypes[0] ?? "");
  const [checkInDate, setCheckInDate] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<AvailabilityResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const today = new Date().toISOString().split("T")[0];

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!tipeKamar || !checkInDate) return;

    setStatus("loading");
    setResult(null);
    setErrorMsg("");

    try {
      const params = new URLSearchParams({ tipe_kamar: tipeKamar, check_in_date: checkInDate });
      const res = await fetch(`/api/availability?${params}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Gagal mengecek ketersediaan");
      setResult(data);
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Gagal mengecek ketersediaan");
      setStatus("error");
    }
  }

  const formattedDate = result
    ? new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(
        new Date(result.check_in_date + "T00:00:00")
      )
    : "";

  const whatsappMsg =
    result?.available
      ? fillCopy(copy.wa_book_message, { tipe: result.tipe_kamar, name: property.name, tanggal: formattedDate })
      : fillCopy(copy.wa_waitlist_message, { tipe: tipeKamar, name: property.name });

  const whatsappLink = buildWhatsappLink(property.whatsappNumber, whatsappMsg);

  return (
    <section id="cek-kamar" className="border-y border-hairline py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow={copy.availability_eyebrow}
          title={copy.availability_title}
          description={copy.availability_desc}
          align="center"
          className="mx-auto"
        />

        <Reveal>
          <div className="mx-auto mt-10 max-w-xl">
            <form
              onSubmit={handleSubmit}
              className="rounded-md border border-hairline bg-surface-soft/40 p-6 sm:p-8"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="check-in-date" className="text-sm font-medium text-ink">
                    {copy.availability_date_label}
                  </label>
                  <input
                    id="check-in-date"
                    type="date"
                    required
                    min={today}
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="h-12 rounded-sm border border-hairline bg-canvas px-3 text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="tipe-kamar" className="text-sm font-medium text-ink">
                    {copy.availability_type_label}
                  </label>
                  <select
                    id="tipe-kamar"
                    required
                    value={tipeKamar}
                    onChange={(e) => setTipeKamar(e.target.value)}
                    className="h-12 rounded-sm border border-hairline bg-canvas px-3 text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  >
                    {kamarTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <CtaButton
                type="submit"
                disabled={status === "loading" || !checkInDate}
                variant="primary"
                className="mt-6 w-full"
              >
                {status === "loading" ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Search className="size-4" aria-hidden="true" />
                )}
                {status === "loading" ? copy.availability_loading : copy.availability_submit}
              </CtaButton>
            </form>

            {status === "success" && result && (
              <Reveal>
                <div
                  className={cn(
                    "mt-4 rounded-md border p-6",
                    result.available > 0
                      ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/30"
                      : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30"
                  )}
                >
                  <div className="flex items-start gap-3">
                    {result.available > 0 ? (
                      <CheckCircle
                        className="mt-0.5 size-5 shrink-0 text-green-600 dark:text-green-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <XCircle
                        className="mt-0.5 size-5 shrink-0 text-red-600 dark:text-red-400"
                        aria-hidden="true"
                      />
                    )}
                    <div className="flex-1">
                      <p
                        className={cn(
                          "font-heading font-semibold",
                          result.available > 0
                            ? "text-green-800 dark:text-green-300"
                            : "text-red-800 dark:text-red-300"
                        )}
                      >
                        {result.available > 0
                          ? fillCopy(copy.availability_available, { n: result.available })
                          : copy.availability_full}
                      </p>
                      <p className="mt-1 text-sm text-ink">
                        {result.available > 0
                          ? fillCopy(copy.availability_available_detail, {
                              tipe: result.tipe_kamar,
                              n: result.available,
                              total: result.total,
                              tanggal: formattedDate,
                            })
                          : fillCopy(copy.availability_full_detail, { total: result.total, tipe: result.tipe_kamar })}
                      </p>
                      <CtaButton
                        as="a"
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant={result.available > 0 ? "primary" : "secondary"}
                        className="mt-4"
                      >
                        <MessageCircle className="size-4" aria-hidden="true" />
                        {result.available > 0 ? copy.availability_book_cta : copy.availability_waitlist_cta}
                      </CtaButton>
                    </div>
                  </div>
                </div>
              </Reveal>
            )}

            {status === "error" && (
              <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300">
                {errorMsg}
              </div>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
