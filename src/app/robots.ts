import type { MetadataRoute } from "next";

import { siteConfig } from "@/site/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/en/" },
    sitemap: new URL("/sitemap.xml", siteConfig.baseUrl).toString()
  };
}
