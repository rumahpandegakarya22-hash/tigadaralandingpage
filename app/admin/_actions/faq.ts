"use server";

import { z } from "zod";
import { landingFaqs } from "@/lib/db/schema";
import { createRow, updateRow, deleteRow, reorderRow, nextOrder, revalidateProperty } from "@/lib/admin/crud-helpers";

const schema = z.object({
  question: z.string().min(1, "Pertanyaan wajib diisi"),
  answer: z.string().min(1, "Jawaban wajib diisi"),
});

export async function createFaq(propertyId: number, slug: string, formData: FormData) {
  const data = schema.parse({ question: formData.get("question"), answer: formData.get("answer") });
  const order = await nextOrder(landingFaqs, propertyId);
  await createRow(landingFaqs, { ...data, propertyId, order });
  revalidateProperty(slug);
}

export async function updateFaq(slug: string, id: number, formData: FormData) {
  const data = schema.parse({ question: formData.get("question"), answer: formData.get("answer") });
  await updateRow(landingFaqs, id, data);
  revalidateProperty(slug);
}

export async function deleteFaq(slug: string, id: number) {
  await deleteRow(landingFaqs, id);
  revalidateProperty(slug);
}

export async function moveFaq(propertyId: number, slug: string, id: number, direction: "up" | "down") {
  await reorderRow(landingFaqs, id, propertyId, direction);
  revalidateProperty(slug);
}
