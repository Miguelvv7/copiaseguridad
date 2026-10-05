import type { Metadata, Viewport } from "next";
import { Antonio } from "next/font/google";
import localFont from "next/font/local";
import SmoothProvider from "@/components/SmoothProvider";
import "./globals.css";

const antonio = Antonio({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-display",
  display: "swap",
});

const proximaNova = localFont({
  src: "../../public/fonts/ProximaNova-Regular.otf",
  variable: "--font-body",
  display: "swap",
});

const SITE = "https://mvictorio.es";
const DESCRIPTION =
  "Tengo 21 años y monto webs y tiendas online desde Écija, Sevilla. Cuatro proyectos funcionando, cada uno explicado por dentro.";

export const metadata: Metadata = {
  title: {
    default: "Miguel Victorio — Monto webs para quien las necesita",
    template: "%s · Miguel Victorio",
  },
  description: DESCRIPTION,
  keywords: [
    "portfolio desarrollo web",
    "hacer web Écija",
    "tienda online Sevilla",
    "Shopify freelance",
    "Next.js",
    "automatizaciones n8n",
  ],
  authors: [{ name: "Miguel Victorio" }],
  creator: "Miguel Victorio",
  metadataBase: new URL(SITE),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Miguel Victorio — Monto webs para quien las necesita",
    description: DESCRIPTION,
    url: SITE,
    siteName: "Miguel Victorio · Portfolio",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Miguel Victorio — Monto webs para quien las necesita",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0c1829",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${antonio.variable} ${proximaNova.variable}`}>
      <body className="antialiased">
        <SmoothProvider>{children}</SmoothProvider>
      </body>
    </html>
  );
}
