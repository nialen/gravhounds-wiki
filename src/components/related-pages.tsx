import Link from "next/link";

import { publicPages } from "@/site/page-manifest";

export function RelatedPages({ slugs = [] }: { slugs?: string[] }) {
  const pages = publicPages.filter((page) => slugs.includes(page.slug));

  if (pages.length === 0) return null;

  return (
    <section aria-labelledby="related-guides" className="related-section">
      <h2 id="related-guides">Related guides</h2>
      <div className="related-grid">
        {pages.map((page) => (
          <Link href={`/en/${page.slug}/`} key={page.slug}>
            <span>{page.title}</span>
            <small>{page.description}</small>
          </Link>
        ))}
      </div>
    </section>
  );
}
