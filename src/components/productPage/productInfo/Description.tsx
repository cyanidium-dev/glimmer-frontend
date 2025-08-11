interface DescriptionProps {
  description: string;
}

export default function Description({ description }: DescriptionProps) {
  return (
    <div>
      <h3 className="mb-4 text-[14px] lg:text-[18px] font-medium leading-[120%]">
        Опис
      </h3>
      <p className="leading-[150%]">{description}</p>
    </div>
  );
}
