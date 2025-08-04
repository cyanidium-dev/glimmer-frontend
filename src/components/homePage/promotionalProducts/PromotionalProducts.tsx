import Container from "@/components/shared/container/Container";
import Section from "@/components/shared/section/Section";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import SectionDescription from "@/components/shared/sectionDescription/SectionDescription";

export default function PromotionalProducts() {
  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-3 lg:flex-row lg:gap-0 lg:justify-between lg:items-center mb-6 lg:mb-12">
          <SectionTitle>Акційні товари</SectionTitle>
          <SectionDescription>
            У цьому розділі зібрані книги зі знижками, спеціальними пропозиціями
            та сезонними акціями. Обмежена кількість примірників — встигніть
            замовити за вигідною ціною.
          </SectionDescription>
        </div>
      </Container>
    </Section>
  );
}
