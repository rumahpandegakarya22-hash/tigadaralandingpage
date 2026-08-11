import { notFound } from "next/navigation";
import Link from "next/link";
import { LogOut, Plus } from "lucide-react";
import { getAllProperties, getLandingData } from "@/lib/data";
import { logoutAction } from "@/app/admin/_actions/auth";
import { createProperty } from "@/app/admin/_actions/property";
import { CtaButton } from "@/components/site/cta-button";

const navItems = [
  { href: "property", label: "Info Properti" },
  { href: "highlights", label: "Keunggulan" },
  { href: "gallery", label: "Galeri & Video" },
  { href: "rooms", label: "Kamar & Harga" },
  { href: "facilities", label: "Fasilitas" },
  { href: "testimonials", label: "Testimoni" },
  { href: "faq", label: "FAQ" },
];

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ propertySlug: string }>;
}) {
  const { propertySlug } = await params;
  const data = await getLandingData(propertySlug);
  if (!data) notFound();

  const properties = await getAllProperties();

  return (
    <div className="flex min-h-svh bg-surface-soft/30">
      <aside className="flex w-64 shrink-0 flex-col gap-6 border-r border-hairline bg-canvas p-5">
        <div>
          <p className="font-heading text-sm font-bold text-ink">Admin Landing Page</p>
          <p className="mt-1 text-xs text-ink">{data.property.name}</p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">Properti</p>
          {properties.map((p) => (
            <Link
              key={p.slug}
              href={`/admin/${p.slug}/property`}
              className={`rounded-sm px-2 py-1.5 text-sm ${
                p.slug === propertySlug ? "bg-primary/10 font-semibold text-primary" : "text-ink hover:bg-surface-soft"
              }`}
            >
              {p.name}
            </Link>
          ))}
          <form action={createProperty} className="mt-1 flex gap-1.5">
            <input
              name="name"
              placeholder="Nama properti baru"
              required
              className="h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2 text-xs outline-none focus-visible:border-ring"
            />
            <button
              type="submit"
              aria-label="Tambah properti"
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-sm border border-hairline text-ink hover:bg-surface-soft"
            >
              <Plus className="size-4" />
            </button>
          </form>
        </div>

        <nav className="flex flex-col gap-1">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">Konten</p>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={`/admin/${propertySlug}/${item.href}`}
              className="rounded-sm px-2 py-1.5 text-sm text-ink hover:bg-surface-soft"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-2">
          <Link
            href={`/${propertySlug}`}
            target="_blank"
            className="text-xs text-ink underline underline-offset-2"
          >
            Lihat landing page publik ↗
          </Link>
          <form action={logoutAction}>
            <CtaButton type="submit" variant="secondary" size="md" className="w-full text-sm">
              <LogOut className="size-4" /> Keluar
            </CtaButton>
          </form>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <div className="mx-auto max-w-3xl">{children}</div>
      </main>
    </div>
  );
}
