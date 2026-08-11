import { asc, eq } from "drizzle-orm";
import type { SQLiteTable } from "drizzle-orm/sqlite-core";
import { db } from "@/lib/db/client";
import { isAdminAuthenticated } from "@/lib/session";
import { revalidatePath } from "next/cache";

/** Semua Server Action admin WAJIB panggil ini duluan — proxy.ts cuma optimistic check. */
export async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    throw new Error("Unauthorized");
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyTable = SQLiteTable & { id: any; propertyId: any; order: any };

export async function createRow<T extends AnyTable>(
  table: T,
  values: Record<string, unknown>
) {
  await requireAdmin();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await db.insert(table).values(values as any);
}

export async function updateRow<T extends AnyTable>(
  table: T,
  id: number,
  values: Record<string, unknown>
) {
  await requireAdmin();
  await db
    .update(table)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .set({ ...values, updatedAt: new Date().toISOString() } as any)
    .where(eq(table.id, id));
}

export async function deleteRow<T extends AnyTable>(table: T, id: number) {
  await requireAdmin();
  await db.delete(table).where(eq(table.id, id));
}

export async function reorderRow<T extends AnyTable>(
  table: T,
  id: number,
  propertyId: number,
  direction: "up" | "down"
) {
  await requireAdmin();
  const rows = await db
    .select()
    .from(table)
    .where(eq(table.propertyId, propertyId))
    .orderBy(asc(table.order));

  const idx = rows.findIndex((r) => r.id === id);
  if (idx === -1) return;
  const swapIdx = direction === "up" ? idx - 1 : idx + 1;
  if (swapIdx < 0 || swapIdx >= rows.length) return;

  const current = rows[idx];
  const swapWith = rows[swapIdx];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await db.update(table).set({ order: swapWith.order } as any).where(eq(table.id, current.id));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await db.update(table).set({ order: current.order } as any).where(eq(table.id, swapWith.id));
}

export async function nextOrder<T extends AnyTable>(table: T, propertyId: number) {
  const rows = await db.select({ order: table.order }).from(table).where(eq(table.propertyId, propertyId));
  return rows.length === 0 ? 0 : Math.max(...rows.map((r) => r.order)) + 1;
}

export function revalidateProperty(slug: string) {
  revalidatePath(`/${slug}`);
  revalidatePath("/");
}
