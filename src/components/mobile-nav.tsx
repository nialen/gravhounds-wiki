"use client";

import { ListIcon, XIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

import type { PageDefinition } from "@/site/page-manifest";

import { NavigationLinks } from "./navigation-links";

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
          <NavigationLinks onNavigate={() => setOpen(false)} pages={pages} />
        </nav>
      ) : null}
    </div>
  );
}
