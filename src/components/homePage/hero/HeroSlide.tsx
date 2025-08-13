import MainButton from "@/components/shared/buttons/MainButton";
import Container from "@/components/shared/container/Container";
import Image from "next/image";
import Link from "next/link";

interface HeroSlideProps {
  banner: {
    title: string;
    description: string;
    image: string;
    button: {
      label: string;
      link: string;
      position: string;
    };
    order: number;
  };
}

export default function HeroSlide({ banner }: HeroSlideProps) {
  const { title, description, image, button } = banner;
  return (
    <div className="flex relative z-10 w-dvw pt-[150px] lg:pt-[155px] pb-[116px] lg:pb-[103px] overflow-hidden min-h-full">
      <Image
        src={image}
        alt="hero banner"
        fill
        sizes="100vw"
        priority
        className="-z-10 object-cover"
      />
      <Container
        className={`flex  min-h-full flex-1 ${button.position === "bottomLeft" ? "flex-col justify-between" : button.position === "bottomRight" ? "flex-col justify-between" : "flex-col-reverse"}`}
      >
        {title || description ? (
          <div
            className={`flex flex-col gap-10  mb-10 lg:mb-9 text-white ${button.position === "bottomLeft" ? "md:flex-row md:gap-20 lg:gap-50" : ""}`}
          >
            {title ? (
              <h1 className="max-w-[320px] lg:max-w-[380px] text-[24px] lg:text-[40px] font-normal leading-[120%] uppercase">
                {title}
              </h1>
            ) : null}
            {description ? (
              <p
                className={`${button.position === "bottomLeft" ? "max-w-[150px]" : "max-w-[300px] lg:max-w-[380px]"}`}
              >
                {description}
              </p>
            ) : null}
          </div>
        ) : null}
        <Link
          href={button?.link}
          className={`w-fit ${button.position === "bottomRight" ? "ml-auto" : button.position === "bottomLeft" ? "mt-auto" : "ml-auto mb-8"} `}
        >
          <MainButton variant="secondary" className="w-[230px] h-[53px]">
            {button?.label}
          </MainButton>
        </Link>
      </Container>
    </div>
  );
}
