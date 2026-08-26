import Link from "next/link";

interface BreadcrumbsProps {
  current: string;
}

export function Breadcrumbs({ current }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <Link href="/en/">Home</Link>
      <span aria-hidden>/</span>
      <span aria-current="page">{current}</span>
    </nav>
  );
}
