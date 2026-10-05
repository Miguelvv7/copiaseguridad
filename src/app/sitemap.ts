import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const SITE = "https://mvictorio.es";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/proyectos", "/sobre-mi", "/contacto"].map((route) => ({
    url: `${SITE}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${SITE}/proyectos/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
