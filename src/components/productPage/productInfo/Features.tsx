interface FeaturesProps {
  features: { featureName: string; value: string }[];
}

export default function Features({ features }: FeaturesProps) {
  return (
    <div className="py-4 lg:py-6 border-t border-black/60">
      <h3 className="mb-4 text-[14px] lg:text-[18px] font-medium leading-[120%]">
        Характеристики
      </h3>
      <ul className="flex flex-col gap-3">
        {features.map(({ featureName, value }, idx) => (
          <li key={idx} className="flex">
            <p className="shrink-0">{featureName}</p>
            <div className="w-full mx-0.5 border-b border-dashed border-black/60" />
            <p className="shrink-0">{value}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
