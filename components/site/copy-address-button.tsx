"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyAddressButton({ address }: { address: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — no-op, user can select text manually.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "inline-flex items-center gap-2 rounded-sm border border-hairline px-3 py-2 text-sm font-medium text-ink transition-colors cursor-pointer hover:bg-surface-soft",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      )}
    >
      {copied ? (
        <>
          <Check className="size-4 text-primary" aria-hidden="true" />
          Alamat disalin
        </>
      ) : (
        <>
          <Copy className="size-4" aria-hidden="true" />
          Salin alamat
        </>
      )}
    </button>
  );
}
