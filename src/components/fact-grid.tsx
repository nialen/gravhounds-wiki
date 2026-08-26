import {
  DesktopTowerIcon,
  PlanetIcon,
  UsersThreeIcon,
  WrenchIcon
} from "@phosphor-icons/react/dist/ssr";

const facts = [
  { label: "Team size", value: "1 to 4 players", Icon: UsersThreeIcon },
  { label: "Core loop", value: "Gather, build, defend, extract", Icon: WrenchIcon },
  { label: "Worlds", value: "Hostile alien job sites", Icon: PlanetIcon },
  { label: "Confirmed systems", value: "Windows PC and Xbox Series X|S", Icon: DesktopTowerIcon }
];

export function FactGrid() {
  return (
    <section aria-label="Verified quick facts" className="site-container fact-grid">
      {facts.map(({ Icon, label, value }) => (
        <article key={label}>
          <Icon aria-hidden size={22} weight="duotone" />
          <span>{label}</span>
          <strong>{value}</strong>
        </article>
      ))}
    </section>
  );
}
