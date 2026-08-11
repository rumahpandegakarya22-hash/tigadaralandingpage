"use client";

import { useState, useTransition } from "react";
import { Pencil, Trash2, ChevronUp, ChevronDown, Plus, X } from "lucide-react";
import { CtaButton } from "@/components/site/cta-button";
import { FormField, type FieldConfig } from "./field";

export type EditableRow = {
  id: number;
  summary: React.ReactNode;
  values: Record<string, string>;
};

export function AdminListEditor({
  rows,
  fields,
  createAction,
  updateAction,
  deleteAction,
  moveAction,
  addLabel,
}: {
  rows: EditableRow[];
  fields: FieldConfig[];
  createAction: (formData: FormData) => Promise<void>;
  updateAction: (id: number, formData: FormData) => Promise<void>;
  deleteAction: (id: number) => Promise<void>;
  moveAction: (id: number, direction: "up" | "down") => Promise<void>;
  addLabel: string;
}) {
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        {rows.map((row, index) => (
          <div key={row.id} className="rounded-md border border-hairline bg-canvas p-4">
            {editingId === row.id ? (
              <form
                action={(formData) => {
                  startTransition(async () => {
                    await updateAction(row.id, formData);
                    setEditingId(null);
                  });
                }}
                className="flex flex-col gap-3"
              >
                {fields.map((field) => (
                  <FormField
                    key={field.name}
                    field={{ ...field, defaultValue: row.values[field.name] }}
                  />
                ))}
                <div className="flex gap-2">
                  <CtaButton type="submit" variant="primary" size="md" disabled={pending} className="text-sm">
                    Simpan
                  </CtaButton>
                  <CtaButton
                    type="button"
                    variant="secondary"
                    size="md"
                    className="text-sm"
                    onClick={() => setEditingId(null)}
                  >
                    Batal
                  </CtaButton>
                </div>
              </form>
            ) : (
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1 text-sm text-ink">{row.summary}</div>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    aria-label="Naikkan urutan"
                    disabled={index === 0 || pending}
                    onClick={() => startTransition(() => moveAction(row.id, "up"))}
                    className="inline-flex size-8 items-center justify-center rounded-sm text-ink hover:bg-surface-soft disabled:opacity-30"
                  >
                    <ChevronUp className="size-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Turunkan urutan"
                    disabled={index === rows.length - 1 || pending}
                    onClick={() => startTransition(() => moveAction(row.id, "down"))}
                    className="inline-flex size-8 items-center justify-center rounded-sm text-ink hover:bg-surface-soft disabled:opacity-30"
                  >
                    <ChevronDown className="size-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Edit"
                    onClick={() => setEditingId(row.id)}
                    className="inline-flex size-8 items-center justify-center rounded-sm text-ink hover:bg-surface-soft"
                  >
                    <Pencil className="size-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Hapus"
                    disabled={pending}
                    onClick={() => {
                      if (confirm("Hapus item ini?")) {
                        startTransition(() => deleteAction(row.id));
                      }
                    }}
                    className="inline-flex size-8 items-center justify-center rounded-sm text-primary-error-text hover:bg-surface-soft"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {rows.length === 0 ? <p className="text-sm text-ink">Belum ada data.</p> : null}
      </div>

      {showAdd ? (
        <form
          key={rows.length}
          action={(formData) => {
            startTransition(async () => {
              await createAction(formData);
              setShowAdd(false);
            });
          }}
          className="flex flex-col gap-3 rounded-md border border-dashed border-hairline p-4"
        >
          {fields.map((field) => (
            <FormField key={field.name} field={field} />
          ))}
          <div className="flex gap-2">
            <CtaButton type="submit" variant="primary" size="md" disabled={pending} className="text-sm">
              Simpan
            </CtaButton>
            <CtaButton
              type="button"
              variant="secondary"
              size="md"
              className="text-sm"
              onClick={() => setShowAdd(false)}
            >
              <X className="size-4" /> Batal
            </CtaButton>
          </div>
        </form>
      ) : (
        <CtaButton
          type="button"
          variant="secondary"
          size="md"
          className="w-fit text-sm"
          onClick={() => setShowAdd(true)}
        >
          <Plus className="size-4" /> {addLabel}
        </CtaButton>
      )}
    </div>
  );
}
