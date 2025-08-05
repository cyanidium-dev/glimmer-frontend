"use client";

import {
  ErrorMessage,
  Field,
  FormikErrors,
  FormikTouched,
  useFormikContext,
} from "formik";
import MaskedInput from "react-text-mask";
import { useId } from "react";
import LoaderIcon from "../icons/LoaderIcon";

interface Values {
  [fieldName: string]: string;
}

interface CustomizedInputProps {
  fieldName: string;
  placeholder: string;
  errors: FormikErrors<Values>;
  touched: FormikTouched<Values>;
  isRequired?: boolean;
  as?: string | typeof MaskedInput;
  labelClassName?: string;
  fieldClassName?: string;
  mask?: string | RegExp | (string | RegExp)[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
  inputType?: string;
  fieldFontSize?: string;
 }

const labelStyles = "relative flex flex-col w-full";
const fieldStyles =
  "relative w-full px-3 py-2 text-dark bg-white placeholder-transparent border-2 rounded-full outline-none resize-none transition duration-300 ease-out";
const errorStyles =
  "absolute bottom-[-11px] left-2 text-[9px] font-normal leading-none text-red-500";

export default function CustomizedInput({
  fieldName,
  placeholder,
  errors,
  touched,
  isRequired = false,
  as,
  labelClassName = "",
  fieldClassName = "",
  fieldFontSize = "",
  mask = "",
  onChange,
  onFocus,
  inputType = "text",
  isLoading = false,
}: CustomizedInputProps) {
  const { handleChange, values } = useFormikContext<Values>();
  const isError = (errors as Record<string, unknown>)[fieldName];
  const isTouched = (touched as Record<string, unknown>)[fieldName];
  const fieldValue = values[fieldName];
  const showPlaceholder = !fieldValue;
  const inputId = useId();

  return (
    <label htmlFor={inputId} className={`${labelStyles} ${labelClassName}`}>
      <div className="relative w-full">
        <Field
          id={inputId}
          as={as}
          mask={mask}
          name={fieldName}
          type={inputType}
          autoComplete="on"
          onChange={onChange || handleChange}
          onFocus={onFocus}
          className={`${fieldStyles} ${fieldClassName} ${fieldFontSize} ${
            isError && isTouched ? "border-red-500" : "border-gray"
          }`}
        />
        {isLoading && <LoaderIcon />}
        <span
          className={`pointer-events-none absolute left-5 ${
            as === "textarea" ? "top-3" : "top-1/2 -translate-y-1/2"
          } text-placeholder whitespace-nowrap`}
        >
    
          {showPlaceholder && (
            <>
              <span>
                {isRequired && <span className="text-red-500 mr-1"> *</span>}
              </span>
              <span className="text-placeholder">{placeholder}</span>
            </>
          )}
        </span>
      </div>

      <ErrorMessage name={fieldName} component="p" className={errorStyles} />
    </label>
  );
}
