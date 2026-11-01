import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

export const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });

// DB lama (sistem kos): hanya dibaca untuk tabel kamar/booking/occupancy_history.
export const pmsClient = createClient({
  url: process.env.TURSO_PMS_DATABASE_URL!,
  authToken: process.env.TURSO_PMS_AUTH_TOKEN,
});
