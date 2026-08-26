import type { MetadataRoute } from "next";

import { publicPages } from "@/site/page-manifest";
import { canonicalFor } from "@/site/structured-data";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPages.map((page) => ({
    url: canonicalFor(page.slug),
    lastModified: "2026-08-26",
    changeFrequency: page.slug === "" ? "weekly" : "monthly",
    priority: page.slug === "" ? 1 : 0.7
  }));
}
