import type { Metadata } from "next";
import { Lora, Poppins } from "next/font/google";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Kost Putri Dekat UGM Sleman Jogja | Kost Tiga Dara",
  description:
    "Kost putri dekat UGM di Caturtunggal, Sleman, Jogja. Kamar nyaman, fasilitas lengkap, keamanan 24 jam. Cek kamar, harga, dan ketersediaan.",
  verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "Kost Tiga Dara",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${lora.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-ink">
        {children}
      </body>
    </html>
  );
}
