"use client";

import { useTransition } from "react";
import { CtaButton } from "@/components/site/cta-button";

export function DeletePropertyButton({
  propertyId,
  deleteAction,
}: {
  propertyId: number;
  deleteAction: (propertyId: number) => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <CtaButton
      type="button"
      variant="secondary"
      size="md"
      disabled={pending}
      className="mt-4 !border-primary-error-text !text-primary-error-text text-sm"
      onClick={() => {
        if (confirm("Yakin hapus properti ini beserta semua kontennya? Tidak bisa dibatalkan.")) {
          startTransition(() => deleteAction(propertyId));
        }
      }}
    >
      Hapus Properti Ini
    </CtaButton>
  );
}
