import Container from "@/components/shared/container/Container";
import Section from "@/components/shared/section/Section";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import SectionDescription from "@/components/shared/sectionDescription/SectionDescription";
import NewProductsSlider from "./NewProductsSlider";
import { Product } from "@/types/product";

interface NewProductsProps {
  newProducts: Product[];
}

export default function NewProducts({ newProducts }: NewProductsProps) {
  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-3 lg:flex-row lg:gap-0 lg:justify-between lg:items-center mb-6 lg:mb-12">
          <SectionTitle>Наші новинки</SectionTitle>
          <SectionDescription>
            У цьому розділі зібрані наші новинки, які ви можете замовити на
            нашому сайті!
          </SectionDescription>
        </div>
        <NewProductsSlider newProducts={newProducts} />
      </Container>
    </Section>
  );
}
