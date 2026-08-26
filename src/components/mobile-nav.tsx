"use client";

import { ListIcon, XIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useState } from "react";

import type { PageDefinition } from "@/site/page-manifest";

interface MobileNavProps {
  pages: PageDefinition[];
}

export function MobileNav({ pages }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="mobile-nav">
      <button
        aria-controls="mobile-navigation"
        aria-expanded={open}
        aria-label={open ? "Close navigation" : "Open navigation"}
        className="menu-button"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        {open ? <XIcon aria-hidden size={23} /> : <ListIcon aria-hidden size={23} />}
      </button>
      {open ? (
        <nav aria-label="Mobile navigation" className="mobile-menu" id="mobile-navigation">
          {pages.map((page) => (
            <Link
              href={page.slug ? `/en/${page.slug}/` : "/en/"}
              key={page.slug || "home"}
              onClick={() => setOpen(false)}
            >
              {page.navLabel ?? page.title}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
