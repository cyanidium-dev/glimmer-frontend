import Container from "@/components/shared/container/Container";
import Section from "@/components/shared/section/Section";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import SectionDescription from "@/components/shared/sectionDescription/SectionDescription";

export default function NewProducts() {
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
      </Container>
    </Section>
  );
}
