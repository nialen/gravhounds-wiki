import type { SourceStatus } from "@/site/page-manifest";

const labels: Record<SourceStatus, string> = {
  official: "Official source",
  "multi-source": "Multiple sources",
  "single-source": "Single source",
  unverified: "Unverified"
};

export function EvidenceBadge({ status }: { status: SourceStatus }) {
  return <span className={`evidence-badge evidence-${status}`}>{labels[status]}</span>;
}
