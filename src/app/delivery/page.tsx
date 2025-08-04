import Breadcrumbs from "@/components/shared/breadcrumbs/Breadcrumbs";
import MarqueeLine from "@/components/shared/marquee/MarqueeLine";
import TelegramCTA from "@/components/shared/telegramCTA/TelegramCTA";

export default function DeliveryPage() {
  const crumbs = [
    { label: "Головна", href: "/" },
    {
      label: "Доставка та оплата",
      href: "/delivery",
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
