import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Las cuatro webs que he montado, todas funcionando. Cada ficha cuenta para qué servía, cómo estaba la cosa antes y qué hice.",
  alternates: { canonical: "/proyectos" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
