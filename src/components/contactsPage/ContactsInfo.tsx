import PageTitle from "../shared/titles/PageTitle";
import SectionDescription from "../shared/sectionDescription/SectionDescription";
import Container from "../shared/container/Container";
import ContactsList from "./ContactsList";

export default function ContactsInfo() {
  return (
    <section className="pb-8 lg:pb-10">
      <Container>
        <div className="flex flex-col gap-3 lg:flex-row lg:gap-0 lg:justify-between lg:items-center mb-8 lg:mb-12">
          <PageTitle>Контакти</PageTitle>
          <SectionDescription className="lg:max-w-[440px]">
            Зв’язатися з нами легко — ми завжди раді допомогти! Якщо у вас
            виникли питання щодо замовлення, доставки чи асортименту — пишіть,
            дзвоніть або приходьте особисто. Ми поруч!
          </SectionDescription>
        </div>
        <ContactsList />
      </Container>
    </section>
  );
}
