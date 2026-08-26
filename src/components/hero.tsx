import { ArrowSquareOutIcon, CrosshairIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { siteAssets } from "@/site/assets";
import { siteConfig } from "@/site/site-config";

export function Hero() {
  const asset = siteAssets.hero;

  return (
    <section className="home-hero">
      <Image
        alt={asset.alt}
        className="hero-image"
        height={asset.height}
        priority
        src={asset.src}
        width={asset.width}
      />
      <div className="hero-shade" />
      <div className="site-container hero-content">
        <p className="eyebrow">Independent pre-release field manual</p>
        <h1>Know the job before you hit the planet.</h1>
        <p>
          Verified GRAVHOUNDS release status, gameplay systems, PC requirements,
          platform details and access information in one evidence-led hub.
        </p>
        <div className="hero-actions">
          <Link className="button-link" href="/en/gameplay/">
            <CrosshairIcon aria-hidden size={19} weight="bold" />
            Explore gameplay
          </Link>
          <a className="text-link" href={siteConfig.officialLinks.steam}>
            Open Steam
            <ArrowSquareOutIcon aria-hidden size={17} />
          </a>
        </div>
      </div>
      <a className="asset-credit" href={asset.sourceUrl}>
        {asset.sourceLabel}
      </a>
    </section>
  );
}
