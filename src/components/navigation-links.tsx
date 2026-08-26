"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { PageDefinition } from "@/site/page-manifest";

interface NavigationLinksProps {
  pages: PageDefinition[];
  onNavigate?: () => void;
}

function normalizePath(path: string) {
  return path === "/" ? path : path.replace(/\/+$/, "");
}

export function NavigationLinks({ pages, onNavigate }: NavigationLinksProps) {
  const pathname = normalizePath(usePathname());

  return pages.map((page) => {
    const href = page.slug ? `/en/${page.slug}/` : "/en/";
    const isActive = pathname === normalizePath(href);

    return (
      <Link
        aria-current={isActive ? "page" : undefined}
        className={isActive ? "nav-link is-active" : "nav-link"}
        href={href}
        key={page.slug || "home"}
        onClick={onNavigate}
      >
        {page.navLabel ?? page.title}
      </Link>
    );
  });
}
