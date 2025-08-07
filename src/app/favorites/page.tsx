import MarqueeLine from "@/components/shared/marquee/MarqueeLine";
import TelegramCTA from "@/components/shared/telegramCTA/TelegramCTA";
import Breadcrumbs from "@/components/shared/breadcrumbs/Breadcrumbs";
import Favorites from "@/components/favoritesPage/Favorites";

export default function FavoritesPage() {
  const crumbs = [
    { label: "Головна", href: "/" },
    {
      label: "Обрані товари",
      href: "/favorites",
    },
  ];

  return (
    <div className="pt-[85px]">
      <Breadcrumbs crumbs={crumbs} />
      <Favorites />
      <MarqueeLine />
      <TelegramCTA />
    </div>
  );
}
