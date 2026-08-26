import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

import { publicPages } from "@/site/page-manifest";

import {
  contentFrontmatterSchema,
  type ContentPage
} from "./schema";

const contentDirectory = path.join(process.cwd(), "content", "en");

export function validateContent(pages: ContentPage[]): ContentPage[] {
  const keys = new Set<string>();

  for (const page of pages) {
    const parsed = contentFrontmatterSchema.parse(page.frontmatter);
    const key = `${parsed.locale}:${parsed.slug}`;

    if (keys.has(key)) {
      throw new Error(`Duplicate locale and slug pair: ${key}`);
    }

    keys.add(key);
  }

  return pages;
}

export function getStaticSlugs(): string[] {
  return publicPages.map((page) => page.slug).filter(Boolean);
}

export async function getPublicContent(): Promise<ContentPage[]> {
  let files: string[];

  try {
    files = (await readdir(contentDirectory)).filter((file) =>
      file.endsWith(".mdx")
    );
  } catch {
    return [];
  }

  const pages = await Promise.all(
    files.map(async (file) => {
      const raw = await readFile(path.join(contentDirectory, file), "utf8");
      const parsed = matter(raw);

      return {
        frontmatter: contentFrontmatterSchema.parse(parsed.data),
        body: parsed.content.trim()
      } satisfies ContentPage;
    })
  );

  return validateContent(pages).filter((page) => {
    const manifestPage = publicPages.find(
      (entry) => entry.slug === page.frontmatter.slug
    );

    return Boolean(manifestPage) && !page.frontmatter.draft;
  });
}

export async function getContentBySlug(
  slug: string
): Promise<ContentPage | null> {
  const pages = await getPublicContent();
  return pages.find((page) => page.frontmatter.slug === slug) ?? null;
}
