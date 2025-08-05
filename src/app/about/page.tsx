import Breadcrumbs from "@/components/shared/breadcrumbs/Breadcrumbs";
import MarqueeLine from "@/components/shared/marquee/MarqueeLine";
import TelegramCTA from "@/components/shared/telegramCTA/TelegramCTA";

export default function AboutPage() {
  const crumbs = [
    { label: "Головна", href: "/" },
    {
      label: "Про нас",
      href: "/about",
    },
  ];

  return (
    <>
      <Breadcrumbs crumbs={crumbs} />
      <MarqueeLine />
      <TelegramCTA />
    </>
  );
}
