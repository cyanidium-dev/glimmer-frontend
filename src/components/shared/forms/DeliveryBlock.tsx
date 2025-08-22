"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useFormikContext, ErrorMessage } from "formik";
import CustomizedInput from "../formComponents/CustomizedInput";
import RadioButtonInput from "../formComponents/RadioButtonInput";
import LocationInput from "../formComponents/LocationInput";
import { City } from "@/types/city";
import { getNPBranches } from "@/utils/getNpBranches";

interface DeliveryBlockProps {
  citiesNovaPost: City[];
}

interface Warehouse {
  Description: string;
  Ref: string;
  CategoryOfWarehouse: string;
}

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

export default function DeliveryBlock({ citiesNovaPost }: DeliveryBlockProps) {
  const [isCitiesDropDownOpen, setIsCitiesDropDownOpen] = useState(false);
  const [cityRef, setCityRef] = useState<string | null>(null);
  const [filteredCities, setFilteredCities] = useState<
    { key: string; description: string }[]
  >([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [isLoadingWarehouses, setIsLoadingWarehouses] = useState(false);
  const [filteredWarehouses, setFilteredWarehouses] = useState<
    { key: string; description: string }[]
  >([]);
  const [isWarehousesDropDownOpen, setIsWarehousesDropDownOpen] =
    useState(false);

  const deliveryTypes = [
    { label: "Відділення", value: "Відділення" },
    { label: "Доставка кур’єром", value: "Доставка кур’єром" },
    { label: "Поштомат", value: "Поштомат" },
  ];

  const { values, setFieldValue, errors, touched, handleChange } =
    useFormikContext<Values>();

  useEffect(() => {
    setFieldValue("deliveryType", "Відділення");
  }, [setFieldValue]);

  useEffect(() => {
    if (!cityRef) return;
    setIsLoadingWarehouses(true);

    getNPBranches(cityRef)
      .then((data) => setWarehouses(data))
      .catch(() => setWarehouses([]))
      .finally(() => setIsLoadingWarehouses(false));
  }, [cityRef]);

  const onCitiesLocationInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleChange(e);
    const inputValue = e.target.value.trim().toLowerCase();

    if (inputValue.length > 0) {
      const filtered = citiesNovaPost
        .filter((city) => {
          const cityName = city.Description.split("(")[0].trim().toLowerCase();
          return cityName.startsWith(inputValue);
        })
        .map((city) => ({
          key: city.Ref,
          description: city.Description,
        }));

      setFilteredCities(filtered);
      setIsCitiesDropDownOpen(true);
    } else {
      setFilteredCities([]);
      setIsCitiesDropDownOpen(false);
    }
  };

  const onWarehousesInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    const inputValue = e.target.value.trim().toLowerCase();

    if (inputValue.length > 0) {
      const filtered = warehouses
        .filter((w) => w.Description.toLowerCase().includes(inputValue))
        .map((w) => ({
          key: w.Ref,
          description: w.Description,
        }));

      setFilteredWarehouses(filtered);
      setIsWarehousesDropDownOpen(true);
    } else {
      setFilteredWarehouses([]);
      setIsWarehousesDropDownOpen(false);
    }
  };

  const isDeliveryChecked = !!values.deliveryService;

  return (
    <>
      {/* Служби доставки */}
      <div className="relative">
        <div className="flex gap-4 lg:gap-8">
          {deliveryServices.map((service) => (
            <button
              type="button"
              key={service.label}
              onClick={() => setFieldValue("deliveryService", service.label)}
              className={`cursor-pointer flex items-center gap-2 w-1/2 h-12 rounded-[12px] p-3 justify-center shadow-sm ${
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
        className={`pb-3 transition-[max-height] duration-500 ${
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
          <LocationInput
            fieldName="city"
            placeholder={"Назва населеного пункту"}
            errors={errors}
            touched={touched}
            options={filteredCities}
            isDropDownOpen={isCitiesDropDownOpen}
            setIsDropDownOpen={setIsCitiesDropDownOpen}
            onChange={onCitiesLocationInputChange}
            onSelect={(city) => {
              setFieldValue("city", city.description);
              setCityRef(city.key);
              setIsCitiesDropDownOpen(false);
            }}
          />

          {/* Відділення */}
          {values.deliveryType !== "Доставка кур’єром" ? (
            <LocationInput
              fieldName="branchNumber"
              placeholder={
                values.deliveryType === "Відділення"
                  ? "Номер відділення"
                  : "Номер поштомату"
              }
              errors={errors}
              touched={touched}
              options={filteredWarehouses}
              isLoading={isLoadingWarehouses}
              isDropDownOpen={isWarehousesDropDownOpen}
              setIsDropDownOpen={setIsWarehousesDropDownOpen}
              onChange={onWarehousesInputChange}
              onSelect={(branch) => {
                setFieldValue("branchNumber", branch.description);
                setIsWarehousesDropDownOpen(false);
              }}
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
