import Container from "@/components/shared/container/Container";
import Section from "@/components/shared/section/Section";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import SectionDescription from "@/components/shared/sectionDescription/SectionDescription";

export default function Bestsellers() {
  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-3 lg:flex-row lg:gap-0 lg:justify-between lg:items-center mb-6 lg:mb-12">
          <SectionTitle>Топ продажів</SectionTitle>
          <SectionDescription>
            Наші улюбленці — і ваші теж. Ці товари обирають найчастіше, бо вони
            справді особливі.
          </SectionDescription>
        </div>
      </Container>
    </Section>
  );
}
