import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { EvidenceBadge } from "@/components/evidence-badge";
import { RelatedPages } from "@/components/related-pages";
import { SourceList } from "@/components/source-list";
import {
  getContentBySlug,
  getStaticSlugs
} from "@/content/loader";
import { publicPages } from "@/site/page-manifest";
import { siteConfig } from "@/site/site-config";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

function slugFromParams(slug?: string[]) {
  return slug?.join("/") ?? "";
}

export async function generateStaticParams() {
  return getStaticSlugs().map((slug) => ({ slug: [slug] }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = slugFromParams((await params).slug);
  const content = await getContentBySlug(slug);
  const manifestPage = publicPages.find((page) => page.slug === slug);

  if (!content || !manifestPage) return {};

  const canonical = slug ? `/en/${slug}/` : "/en/";

  return {
    title: content.frontmatter.title,
    description: content.frontmatter.description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      locale: "en_US",
      url: canonical,
      siteName: siteConfig.name,
      title: content.frontmatter.title,
      description: content.frontmatter.description,
      images: [{ url: "/images/gravhounds-hero.webp", width: 1920, height: 1080 }]
    },
    twitter: {
      card: "summary_large_image",
      title: content.frontmatter.title,
      description: content.frontmatter.description,
      images: ["/images/gravhounds-hero.webp"]
    }
  };
}

export default async function EnglishContentPage({ params }: PageProps) {
  const slug = slugFromParams((await params).slug);
  const content = await getContentBySlug(slug);

  if (!content) notFound();

  const isHome = slug === "";

  return (
    <main>
      <article className={isHome ? "home-page" : "article-page"}>
        {!isHome ? (
          <div className="site-container article-header">
            <Breadcrumbs current={content.frontmatter.title} />
            <EvidenceBadge status={content.frontmatter.sourceStatus} />
            <h1>{content.frontmatter.title}</h1>
            <p className="article-deck">{content.frontmatter.description}</p>
            <p className="updated-at">Updated {content.frontmatter.updatedAt}</p>
          </div>
        ) : null}
        <div className={isHome ? undefined : "site-container article-layout"}>
          <div className="mdx-content">
            <MDXRemote source={content.body} />
          </div>
          {!isHome ? (
            <>
              <RelatedPages slugs={content.frontmatter.related} />
              <SourceList sources={content.frontmatter.sources} />
            </>
          ) : null}
        </div>
      </article>
    </main>
  );
}
