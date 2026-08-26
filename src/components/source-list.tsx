import type { SourceReference } from "@/content/schema";

export function SourceList({ sources }: { sources: SourceReference[] }) {
  return (
    <section aria-labelledby="sources" className="sources-section">
      <h2 id="sources">Sources</h2>
      <div className="source-grid">
        {sources.map((source) => (
          <article className="source-entry" key={source.url}>
            <a href={source.url} rel="noreferrer" target="_blank">
              {source.title}
            </a>
            <p>{source.note}</p>
            <span>
              {source.publisher}, checked {source.checkedAt}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
