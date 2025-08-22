"use client";

import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import CustomizedInput from "./CustomizedInput";
import { FormikTouched, FormikErrors } from "formik";
import { ValuesCheckoutFormType } from "../forms/CheckoutForm";

interface Option {
  key: string;
  description: string;
}

interface LocationInputProps {
  fieldName: string;
  placeholder: string;
  errors: FormikErrors<ValuesCheckoutFormType>;
  touched: FormikTouched<ValuesCheckoutFormType>;
  options: Option[];
  isLoading: boolean;
  isDropDownOpen: boolean;
  setIsDropDownOpen: Dispatch<SetStateAction<boolean>>;
  onSelect: (option: Option) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function LocationInput({
  fieldName,
  placeholder,
  errors,
  touched,
  options,
  isLoading,
  setIsDropDownOpen,
  isDropDownOpen,
  onSelect,
  onChange,
}: LocationInputProps) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropDownOpen(false);
      }
    }

    if (isDropDownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropDownOpen, setIsDropDownOpen]);

  return (
    <div
      ref={dropdownRef}
      className="relative w-full laptop:w-[49%] deskxl:w-[31.5%] h-fit"
    >
      <CustomizedInput
        fieldName={fieldName}
        isRequired
        isLoading={isLoading}
        placeholder={placeholder}
        errors={errors}
        touched={touched}
        onChange={onChange}
      />
      <ul
        className={`${
          isDropDownOpen ? "block" : "hidden"
        } absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-grey rounded-[16px] h-[180px] overflow-x-hidden overflow-y-auto z-50 
        text-12med laptop:text-14med deskxl:text-18med scrollbar scrollbar-w-[2px] scrollbar-h-[2px] scrollbar-thumb-rounded-full scrollbar-track-rounded-full 
        scrollbar-thumb-yellow popup-scroll`}
      >
        {options.map((item: Option) => (
          <li
            key={item.key}
            className="p-2 cursor-pointer hover:bg-lightGrey"
            onClick={() => {
              onSelect(item);
              setIsDropDownOpen(false);
            }}
          >
            {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
