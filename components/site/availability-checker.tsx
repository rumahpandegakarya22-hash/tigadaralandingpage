"use client";

import { useState, type FormEvent } from "react";
import { Search, CheckCircle, XCircle, Loader2, MessageCircle } from "lucide-react";
import { Container } from "./container";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { CtaButton } from "./cta-button";
import type { Property } from "@/lib/types";
import type { LandingCopy } from "@/lib/copy";
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
      ? `Halo, saya ingin memesan kamar ${result.tipe_kamar} di ${property.name}. Rencana masuk tanggal ${formattedDate}. Apakah bisa diproses?`
      : `Halo, saya tertarik kamar ${tipeKamar} di ${property.name} tapi sepertinya penuh. Apakah ada daftar tunggu?`;

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
                    Rencana Tanggal Masuk
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
                    Tipe Kamar
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
                {status === "loading" ? "Mengecek..." : copy.availability_submit}
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
                          ? `${result.available} kamar tersedia`
                          : "Kamar penuh untuk tanggal ini"}
                      </p>
                      <p className="mt-1 text-sm text-ink">
                        {result.available > 0
                          ? `${result.tipe_kamar} · ${result.available} dari ${result.total} unit kosong per ${formattedDate}`
                          : `Semua ${result.total} unit ${result.tipe_kamar} sudah terisi atau dipesan`}
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
                        {result.available > 0 ? "Pesan Sekarang via WA" : "Daftar Waiting List"}
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
