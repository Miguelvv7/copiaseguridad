import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Las webs que he montado, una por una. Cada ficha cuenta para qué servía, cómo estaba la cosa antes y qué hice.",
  alternates: { canonical: "/proyectos" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
