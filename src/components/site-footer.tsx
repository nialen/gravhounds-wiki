import Link from "next/link";

import { siteConfig } from "@/site/site-config";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-grid">
        <div>
          <Link className="footer-brand" href="/en/">
            {siteConfig.name}
          </Link>
          <p>
            Independent fan resource. Not affiliated with Octopus Panic, Steam,
            Xbox or Microsoft.
          </p>
        </div>
        <div className="footer-links">
          <a href={siteConfig.officialLinks.website} rel="noreferrer" target="_blank">Official site</a>
          <a href={siteConfig.officialLinks.steam} rel="noreferrer" target="_blank">Steam</a>
          <a href={siteConfig.officialLinks.xbox} rel="noreferrer" target="_blank">Xbox</a>
          <a href={siteConfig.officialLinks.discord} rel="noreferrer" target="_blank">Discord</a>
        </div>
      </div>
    </footer>
  );
}
