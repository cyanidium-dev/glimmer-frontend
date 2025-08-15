import Container from "../shared/container/Container";
import PageTitle from "../shared/titles/PageTitle";
import SectionDescription from "../shared/sectionDescription/SectionDescription";
import CheckoutFormWithNotifications from "./CheckoutFormWithNotifications";

export default function Checkout() {
  return (
    <section className="lg:pb-10">
      <Container>
        <div className="flex flex-col gap-3 lg:flex-row lg:gap-0 lg:justify-between lg:items-center mb-8 lg:mb-12">
          <PageTitle>Контакти</PageTitle>
          <SectionDescription className="lg:max-w-[440px]">
            Зв’язатися з нами легко — ми завжди раді допомогти! Якщо у вас
            виникли питання щодо замовлення, доставки чи асортименту — пишіть,
            дзвоніть або приходьте особисто. Ми поруч!
          </SectionDescription>
        </div>
        <CheckoutFormWithNotifications />
      </Container>
    </section>
  );
}
