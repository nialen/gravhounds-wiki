import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GRAVHOUNDS Field Manual",
    short_name: "GH Field Manual",
    description: "Source-grounded GRAVHOUNDS release and gameplay information.",
    start_url: "/en/",
    display: "standalone",
    background_color: "#101c38",
    theme_color: "#1fe0e8",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" }
    ]
  };
}
