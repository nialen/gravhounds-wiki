import { getPublicContent } from "../src/content/loader";
import { deferredPages, publicPages } from "../src/site/page-manifest";

const pages = await getPublicContent();
const expected = new Set(publicPages.map((page) => page.slug));
const actual = new Set(pages.map((page) => page.frontmatter.slug));
const errors: string[] = [];

for (const slug of expected) {
  if (!actual.has(slug)) errors.push(`Missing public content: ${slug || "home"}`);
}

for (const page of pages) {
  const { frontmatter, body } = page;

  if (!expected.has(frontmatter.slug)) {
    errors.push(`Unexpected public content: ${frontmatter.slug}`);
  }

  if (body.length < 500) errors.push(`Content is too thin: ${frontmatter.slug || "home"}`);
  if (/[–—]/.test(`${frontmatter.title}${frontmatter.description}${body}`)) {
    errors.push(`Visible copy contains a banned long dash: ${frontmatter.slug || "home"}`);
  }

  for (const deferred of deferredPages) {
    if (body.includes(`/en/${deferred.slug}/`)) {
      errors.push(`Public page links to deferred route: ${frontmatter.slug || "home"} -> ${deferred.slug}`);
    }
  }
}

if (pages.length !== publicPages.length) {
  errors.push(`Expected ${publicPages.length} public pages, received ${pages.length}`);
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `Content valid: ${pages.length} public pages, 0 invalid pages, 0 duplicate slugs, ${deferredPages.length} deferred routes absent.`
  );
}
