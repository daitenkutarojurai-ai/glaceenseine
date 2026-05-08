import type { MetadataRoute } from "next";

const BASE = "https://glaceenseine.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/",                priority: 1.0, changeFrequency: "weekly" },
    { path: "/menu",            priority: 0.9, changeFrequency: "weekly" },
    { path: "/emplacement",     priority: 0.9, changeFrequency: "monthly" },
    { path: "/privatisation",   priority: 0.8, changeFrequency: "monthly" },
    { path: "/notre-histoire",  priority: 0.7, changeFrequency: "yearly" },
    { path: "/contact",         priority: 0.6, changeFrequency: "yearly" },
  ];
  return routes.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
