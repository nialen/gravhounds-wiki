import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import pngToIco from "png-to-ico";
import sharp from "sharp";

const root = process.cwd();
const steamDir = path.join(root, "素材", "官方-Steam");
const iconSource = path.join(
  root,
  "品牌与图标素材",
  "favicon-source-512.png"
);
const imageDir = path.join(root, "public", "images");
const iconDir = path.join(root, "public", "icons");

await mkdir(imageDir, { recursive: true });
await mkdir(iconDir, { recursive: true });

const images = [
  {
    input: path.join(steamDir, "page-background.jpg"),
    output: path.join(imageDir, "gravhounds-hero.webp"),
    width: 1920,
    height: 1080,
    quality: 82
  },
  {
    input: path.join(steamDir, "screenshot-03.jpg"),
    output: path.join(imageDir, "gameplay-operation.webp"),
    width: 1280,
    height: 720,
    quality: 80
  },
  {
    input: path.join(steamDir, "screenshot-08.jpg"),
    output: path.join(imageDir, "gameplay-defense.webp"),
    width: 1280,
    height: 720,
    quality: 80
  }
];

for (const image of images) {
  await sharp(image.input)
    .resize(image.width, image.height, { fit: "cover", position: "centre" })
    .webp({ quality: image.quality, effort: 5 })
    .toFile(image.output);
}

const iconSizes = [16, 32, 180, 192, 512];
const iconPaths = new Map();

for (const size of iconSizes) {
  const filename =
    size === 180 ? "apple-touch-icon.png" : `icon-${size}.png`;
  const output = path.join(iconDir, filename);
  await sharp(iconSource)
    .resize(size, size, { fit: "contain" })
    .png({ compressionLevel: 9 })
    .toFile(output);
  iconPaths.set(size, output);
}

const favicon = await pngToIco([iconPaths.get(16), iconPaths.get(32)]);
await writeFile(path.join(root, "public", "favicon.ico"), favicon);

const manifest = {
  name: "GRAVHOUNDS Field Manual",
  short_name: "GH Field Manual",
  description: "Independent GRAVHOUNDS release and gameplay guide",
  start_url: "/en/",
  display: "standalone",
  background_color: "#101c38",
  theme_color: "#1fe0e8",
  icons: [
    {
      src: "/icons/icon-192.png",
      sizes: "192x192",
      type: "image/png"
    },
    {
      src: "/icons/icon-512.png",
      sizes: "512x512",
      type: "image/png"
    }
  ]
};

await writeFile(
  path.join(root, "public", "site.webmanifest"),
  `${JSON.stringify(manifest, null, 2)}\n`,
  "utf8"
);

console.log(`Prepared ${images.length} images and ${iconSizes.length} icon sizes.`);
