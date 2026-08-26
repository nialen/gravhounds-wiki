import { WarningIcon } from "@phosphor-icons/react/dist/ssr";

export function StatusCallout({ children, title = "Verification note" }: { children: React.ReactNode; title?: string }) {
  return (
    <aside className="status-callout">
      <WarningIcon aria-hidden size={21} weight="fill" />
      <div>
        <strong>{title}</strong>
        <div>{children}</div>
      </div>
    </aside>
  );
}
