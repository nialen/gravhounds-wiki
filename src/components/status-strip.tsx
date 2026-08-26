import { siteConfig } from "@/site/site-config";

export function StatusStrip() {
  return (
    <div className="status-strip">
      <div className="site-container status-inner">
        <span>Pre-release coverage</span>
        <span>Facts checked {siteConfig.lastChecked}</span>
      </div>
    </div>
  );
}
