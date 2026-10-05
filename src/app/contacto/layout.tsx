import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contacto",
  description:
    "¿Necesitas una tienda online, una web o automatizar algo que haces a mano? Cuéntamelo y te digo si sé hacerlo, cuánto cuesta y cuándo lo tendrías.",
  alternates: { canonical: "/contacto" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
