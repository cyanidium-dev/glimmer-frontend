import { Montserrat } from "next/font/google";
import "./globals.css";
import "react-image-gallery/styles/css/image-gallery.css";
import Header from "@/components/shared/header/Header";
import Footer from "@/components/shared/footer/Footer";
import { fetchSanityDataServer } from "@/utils/fetchSanityData";
import { allCategoriesQuery } from "@/lib/queries";
import { getDefaultMetadata } from "@/utils/getDefaultMetadata";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
});

export async function generateMetadata() {
  return getDefaultMetadata();
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allCategories = await fetchSanityDataServer(allCategoriesQuery);

  return (
    <html lang="uk" className="scroll-smooth">
      <body
        className={`${montserrat.variable} flex min-h-dvh flex-col antialiased text-[12px] lg:text-[15px] font-light leading-[120%]`}
      >
        <Header categories={allCategories} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
