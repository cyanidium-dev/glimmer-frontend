import CallBack from "@/components/contactsPage/CallBack";
import ContactsInfo from "@/components/contactsPage/ContactsInfo";
import Breadcrumbs from "@/components/shared/breadcrumbs/Breadcrumbs";
import MarqueeLine from "@/components/shared/marquee/MarqueeLine";
import TelegramCTA from "@/components/shared/telegramCTA/TelegramCTA";

export default function ContactsPage() {
  const crumbs = [
    { label: "Головна", href: "/" },
    {
      label: "Контакти",
      href: "/contacts",
    },
  ];

  return (
    <>
      <Breadcrumbs crumbs={crumbs} />
      <ContactsInfo />
      <CallBack />
      <MarqueeLine />
      <TelegramCTA />
    </>
  );
}
