import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sobre mí",
  description:
    "Tengo 21 años y monto webs desde Écija, Sevilla. Cómo trabajo, con qué herramientas y qué no hago.",
  alternates: { canonical: "/sobre-mi" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
