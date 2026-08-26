import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StatusStrip } from "@/components/status-strip";

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <StatusStrip />
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
