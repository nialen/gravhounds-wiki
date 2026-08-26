import { z } from "zod";

export const sourceReferenceSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
  publisher: z.string().min(1),
  type: z.enum(["official", "platform", "database", "media"]),
  officialStatus: z.enum(["official", "independent", "unverified"]),
  checkedAt: z.iso.date(),
  note: z.string().min(1)
});

export const contentFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(100).max(170),
  slug: z.string(),
  category: z.enum(["overview", "release", "guide", "platform", "media"]),
  updatedAt: z.iso.date(),
  sourceStatus: z.enum([
    "official",
    "multi-source",
    "single-source",
    "unverified"
  ]),
  draft: z.boolean(),
  locale: z.literal("en"),
  sources: z.array(sourceReferenceSchema).min(1),
  related: z.array(z.string()).optional(),
  heroAsset: z.enum(["hero", "planetOperation", "baseDefense"]).optional()
});

export type SourceReference = z.infer<typeof sourceReferenceSchema>;
export type ContentFrontmatter = z.infer<typeof contentFrontmatterSchema>;

export interface ContentPage {
  frontmatter: ContentFrontmatter;
  body: string;
}
