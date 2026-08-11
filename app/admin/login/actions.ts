"use server";

import { redirect } from "next/navigation";
import { createAdminSession } from "@/lib/session";

export type LoginState = { error?: string } | undefined;

export async function loginAction(_state: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return { error: "Password salah." };
  }

  await createAdminSession();
  redirect("/admin");
}
