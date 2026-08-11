"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CtaButton } from "@/components/site/cta-button";
import { loginAction, type LoginState } from "./actions";

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState<LoginState, FormData>(loginAction, undefined);

  return (
    <div className="flex min-h-svh items-center justify-center bg-surface-soft/40 p-4">
      <form
        action={action}
        className="flex w-full max-w-sm flex-col gap-4 rounded-md border border-hairline bg-canvas p-8"
      >
        <div>
          <h1 className="font-heading text-xl font-bold text-ink">Admin Kost Tiga Dara</h1>
          <p className="mt-1 text-sm text-ink">Masuk buat kelola konten landing page.</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Password Admin</Label>
          <Input id="password" name="password" type="password" autoFocus required />
        </div>

        {state?.error ? <p className="text-xs text-primary-error-text">{state.error}</p> : null}

        <CtaButton type="submit" variant="primary" disabled={pending} className="mt-1 w-full">
          {pending ? "Masuk..." : "Masuk"}
        </CtaButton>
      </form>
    </div>
  );
}
