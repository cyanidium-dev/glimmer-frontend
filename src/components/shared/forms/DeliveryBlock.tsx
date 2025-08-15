"use client";
import { useEffect } from "react";
import Image from "next/image";
import { useFormikContext, ErrorMessage } from "formik";
import CustomizedInput from "../formComponents/CustomizedInput";
import RadioButtonInput from "../formComponents/RadioButtonInput";

interface Values {
  [fieldName: string]: string;
}

const deliveryServices = [
  {
    label: "Нова пошта",
    logo: "/images/deliveryPage/deliveryConditions/novaPost.svg",
  },
  {
    label: "Укрпошта",
    logo: "/images/deliveryPage/deliveryConditions/ukrPost.svg",
  },
];

export default function DeliveryBlock() {
  const deliveryTypes = [
    { label: "Відділення", value: "Відділення" },
    { label: "Доставка кур’єром", value: "Доставка кур’єром" },
    { label: "Поштомат", value: "Поштомат" },
  ];

  const { values, setFieldValue, errors, touched } = useFormikContext<Values>();

  useEffect(() => {
    setFieldValue("deliveryType", "Відділення");
  }, [setFieldValue]);

  const isDeliveryChecked = !!values.deliveryService;

  return (
    <>
      {/* Служби доставки */}
      <div className="relative">
        <div className="flex gap-4">
          {deliveryServices.map((service) => (
            <button
              type="button"
              key={service.label}
              onClick={() => setFieldValue("deliveryService", service.label)}
              className={`cursor-pointer flex items-center gap-2 w-1/2 h-14 xl:h-[125px] rounded-[12px] p-3 justify-center shadow-sm ${
                values.deliveryService === service.label
                  ? "bg-main"
                  : "bg-white"
              } transition duration-300 ease-in-out`}
            >
              <Image
                src={service.logo}
                alt={service.label}
                width={92}
                height={36}
                className="w-auto h-6 object-contain"
              />
              <span className="text-[14px] lg:text-[18px] font-medium leading-[120%]">
                {service.label}
              </span>
            </button>
          ))}
        </div>
        <ErrorMessage
          name={"deliveryService"}
          component="p"
          className="absolute bottom-[-11px] left-2 text-[9px] font-normal leading-none text-red-500"
        />
      </div>

      <div
        className={`pb-3 overflow-hidden transition-[max-height] duration-500 ${
          isDeliveryChecked ? "max-h-[500px] ease-in" : "max-h-0 ease-out"
        }`}
      >
        {/* Тип доставки */}
        <div className="flex flex-col gap-4 my-6">
          {deliveryTypes.map((type, idx) => (
            <RadioButtonInput
              key={idx}
              fieldName="deliveryType"
              value={type.value}
              onClick={() => setFieldValue("deliveryType", type)}
              label={type.label}
            />
          ))}
        </div>
        {values.deliveryService === "Укрпошта" ? (
          <p className="mb-6 text-[14px] lg:text-[15px] font-medium leading-[120%]">
            {"Оберіть відділення Укрпошти"}
          </p>
        ) : (
          <p className="mb-6 text-[14px] lg:text-[15px] font-medium leading-[120%]">
            {"Оберіть відділення Нової пошти"}
          </p>
        )}

        {/* Інпути */}
        <div className="flex flex-col gap-4">
          <CustomizedInput
            fieldName="city"
            placeholder={"Назва населеного пункту"}
            isRequired
            errors={errors}
            touched={touched}
          />
          {values.deliveryType !== "Доставка кур’єром" ? (
            <CustomizedInput
              fieldName="branchNumber"
              placeholder={
                values.deliveryType === "Відділення"
                  ? "Номер відділення"
                  : "Номер поштомату"
              }
              isRequired
              errors={errors}
              touched={touched}
            />
          ) : (
            <CustomizedInput
              fieldName="address"
              placeholder={"Адреса"}
              isRequired
              errors={errors}
              touched={touched}
            />
          )}
        </div>
      </div>
    </>
  );
}
