import Image from "next/image";
import Link from "next/link";

import { publicPages } from "@/site/page-manifest";
import { siteConfig } from "@/site/site-config";

import { MobileNav } from "./mobile-nav";

const primaryPages = publicPages.filter((page) => page.navLabel);

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <Link aria-label={`${siteConfig.name} home`} className="brand" href="/en/">
          <Image alt="" height={32} src="/icons/icon-32.png" width={32} />
          <span>{siteConfig.shortName}</span>
        </Link>
        <nav aria-label="Primary navigation" className="desktop-nav">
          {primaryPages.map((page) => (
            <Link
              href={page.slug ? `/en/${page.slug}/` : "/en/"}
              key={page.slug || "home"}
            >
              {page.navLabel}
            </Link>
          ))}
        </nav>
        <MobileNav pages={primaryPages} />
      </div>
    </header>
  );
}
