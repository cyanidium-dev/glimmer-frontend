import Container from "../shared/container/Container";
import SectionTitle from "../shared/titles/SectionTitle";
import ReviewedSlider from "./ReviewedSlider";

export default function ReviewedProducts() {
  return (
    <section className="py-8 lg:py-10">
      <Container>
        <SectionTitle className="mb-6 lg:mb-12">
          Переглянуті товари
        </SectionTitle>
        <ReviewedSlider />
      </Container>
    </section>
  );
}
