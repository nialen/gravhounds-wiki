export function TableOfContents({ children }: { children?: React.ReactNode }) {
  return (
    <nav aria-label="On this page" className="table-of-contents">
      <strong>On this page</strong>
      <div className="toc-links">{children}</div>
    </nav>
  );
}
