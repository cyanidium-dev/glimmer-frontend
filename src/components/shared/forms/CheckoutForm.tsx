"use client";
import { Form, Formik, FormikHelpers } from "formik";
import { Dispatch, SetStateAction, useState } from "react";
import MaskedInput from "react-text-mask";
import { motion } from "framer-motion";
import { listVariants, listItemVariants } from "@/utils/animationVariants";
import { useRouter } from "next/navigation";
import { checkoutValidation } from "@/schemas/checkoutValidation";
// import { handleSubmitForm } from "@/shared/utils/handleSubmitForm";
import { phoneMask } from "@/regex/regex";
import { useCartStore } from "@/store/cartStore";
// import { useMonopayBasketOrder } from "@/shared/hooks/useMonopayBasketOrder";
import CustomizedInput from "../formComponents/CustomizedInput";
import CheckoutSubTitle from "./CheckoutSubtitle";
// import RadioButtonInput from "../../formComponents/RadioButtonInput";
// import DeliveryBlockUkraine from "./DeliveryBlockUkraine";
import { fetchSanityDataServer } from "@/utils/fetchSanityData";
import { promocodeByCodeQuery } from "@/lib/queries";
import MainButton from "../buttons/MainButton";
import CartList from "../cartModal/CartList";
import RecommendedProducts from "./RecommendedProducts";
import CartTotal from "../cartModal/CartTotal";

export interface ValuesCheckoutFormType {
  name: string;
  surname: string;
  phone: string;
  email: string;
  deliveryService: string;
  deliveryType: string;
  city: string;
  branchNumber: string;
  address: string;
  payment: string;
  message: string;
  promocode: string;
}

interface CheckoutFormProps {
  setIsError: Dispatch<SetStateAction<boolean>>;
  setIsUnavailable: Dispatch<SetStateAction<boolean>>;
  setIsNotificationShown: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

export default function CheckoutForm({
  setIsError,
  setIsUnavailable,
  setIsNotificationShown,
  className = "",
}: CheckoutFormProps) {
  const { getCartTotal, promoCode, applyPromoCode, removePromoCode, cart } =
    useCartStore();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPromocode, setIsLoadingPromocode] = useState(false);

  const initialValues = {
    name: "",
    surname: "",
    phone: "",
    email: "",
    deliveryService: "Нова пошта",
    deliveryType: "Відділення",
    city: "",
    branchNumber: "",
    address: "",
    payment: "Оплата картою онлайн Visa, Mastercard",
    message: "",
    promocode: promoCode?.code || "",
  };

  const validationSchema = checkoutValidation();

  const verifyPromo = async (
    values: ValuesCheckoutFormType,
    setFieldError: (
      field: keyof ValuesCheckoutFormType,
      message: string
    ) => void
  ) => {
    try {
      setIsLoadingPromocode(true);
      const promocode = await fetchSanityDataServer(promocodeByCodeQuery, {
        code: values.promocode,
      });
      if (promocode) {
        const discount = promocode.discountPercent;
        applyPromoCode(values.promocode, discount);
      } else {
        setFieldError("promocode", "Промокод не знайдений");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
    } finally {
      setIsLoadingPromocode(false);
    }
  };

  const removePromo = async (
    setFieldValue: (
      field: keyof ValuesCheckoutFormType,
      message: string
    ) => void
  ) => {
    removePromoCode();
    setFieldValue("promocode", "");
  };

  //   const basketOrder = useMonopayBasketOrder();

  const submitForm = async (
    values: ValuesCheckoutFormType,
    formikHelpers: FormikHelpers<ValuesCheckoutFormType>
  ) => {
    // await handleSubmitForm<ValuesCheckoutFormType>(
    //   formikHelpers,
    //   setIsLoading,
    //   setIsError,
    //   setIsUnavailable,
    //   setIsNotificationShown,
    //   values,
    //   router,
    //   basketOrder
    // );
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submitForm}
      validationSchema={validationSchema}
    >
      {({
        errors,
        touched,
        dirty,
        isValid,
        values,
        setFieldError,
        setFieldValue,
      }) => (
        <Form
          className={`relative flex flex-col md:flex-row md:gap-8 w-full ${className}`}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.2 }}
            variants={listVariants({
              staggerChildren: 0.2,
              delayChildren: 0.4,
            })}
            className="flex flex-col md:gap-8 w-full md:w-[calc(50%-16px)]"
          >
            <motion.div
              viewport={{ once: true, amount: 0.2 }}
              variants={listItemVariants}
              className="py-9 md:p-8 md:rounded-[12px] border-t md:border-none border-black/10 md:shadow-sm"
            >
              <CheckoutSubTitle>Контактна інформація</CheckoutSubTitle>
              <div className="flex flex-col gap-y-4">
                <CustomizedInput
                  fieldName="name"
                  placeholder={"Ім'я"}
                  isRequired
                  errors={errors}
                  touched={touched}
                />
                <CustomizedInput
                  fieldName="surname"
                  placeholder={"Прізвище"}
                  isRequired
                  errors={errors}
                  touched={touched}
                />
                <CustomizedInput
                  fieldName="phone"
                  inputType="tel"
                  placeholder={"Номер телефону"}
                  isRequired
                  errors={errors}
                  touched={touched}
                  as={MaskedInput}
                  mask={phoneMask}
                />
                <CustomizedInput
                  fieldName="email"
                  inputType="email"
                  placeholder={"Електронна пошта"}
                  errors={errors}
                  touched={touched}
                />
              </div>
            </motion.div>

            <motion.div
              viewport={{ once: true, amount: 0.2 }}
              variants={listItemVariants}
              className="py-9 md:p-8 md:rounded-[12px] border-t md:border-none border-black/10 md:shadow-sm"
            >
              <CheckoutSubTitle>Доставка</CheckoutSubTitle>

              {/* <DeliveryBlockUkraine /> */}
            </motion.div>

            <motion.div
              viewport={{ once: true, amount: 0.2 }}
              variants={listItemVariants}
              className="py-9 md:p-8 md:rounded-[12px] border-t md:border-none border-black/10 md:shadow-sm"
            >
              <CheckoutSubTitle>Оплата</CheckoutSubTitle>
              {/* <RadioButtonInput
                fieldName="payment"
                label={"Оплата картою онлайн Visa, Mastercard"}
                value="Оплата картою онлайн Visa, Mastercard"
              />
              <RadioButtonInput
                fieldName="payment"
                label={"Оплата під час отримання товару"}
                value="Оплата під час отримання товару"
              /> */}
            </motion.div>

            <motion.div
              viewport={{ once: true, amount: 0.2 }}
              variants={listItemVariants}
              className="py-9 md:p-8 md:rounded-[12px] border-t md:border-none border-black/10 md:shadow-sm"
            >
              <CheckoutSubTitle>Додати коментар</CheckoutSubTitle>
              <CustomizedInput
                fieldName="message"
                as="textarea"
                placeholder={"Повідомлення"}
                errors={errors}
                touched={touched}
                fieldClassName="h-[120px] lg:h-[160px] py-4 rounded-[12px]"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.2 }}
            variants={listVariants({
              staggerChildren: 0.2,
              delayChildren: 0.4,
            })}
            className="flex flex-col md:gap-6 w-full md:w-[calc(50%-16px)] md:p-8 md:rounded-[12px] md:shadow-sm md:overflow-hidden"
          >
            <motion.div
              viewport={{ once: true, amount: 0.2 }}
              variants={listItemVariants}
              className="border-t md:border-none border-black/10"
            >
              <CheckoutSubTitle>Інформація про замовлення</CheckoutSubTitle>
              <CartList />
              <div className="py-3 px-2.5 md:p-6 rounded-[12px] bg-main/40">
                <CheckoutSubTitle>Рекомендовані товари</CheckoutSubTitle>
                <RecommendedProducts />
              </div>
            </motion.div>
            <motion.div
              viewport={{ once: true, amount: 0.2 }}
              variants={listItemVariants}
              className="py-6 md:p-8 md:rounded-[12px] border-t md:border-none border-black/10 md:shadow-sm"
            >
              <CheckoutSubTitle>Промокод</CheckoutSubTitle>
              <CustomizedInput
                fieldName="promocode"
                placeholder={"Введіть свій промокод"}
                isLoading={isLoadingPromocode}
                errors={errors}
                touched={touched}
              />
              <button
                onClick={
                  promoCode
                    ? () => removePromo(setFieldValue)
                    : () => verifyPromo(values, setFieldError)
                }
                type="button"
                className="mt-1.5 block w-fit ml-auto cursor-pointer text-[10px] xl:text-[12px] font-medium leading-[120%] text-black/60 xl:hover:text-main 
                focus-visible:text-main active:text-main transition duration-300 ease-in-out"
              >
                {promoCode ? "Видалити промокод" : "Застосувати промокод"}
              </button>
            </motion.div>

            <motion.div
              viewport={{ once: true, amount: 0.2 }}
              variants={listItemVariants}
              className="py-6 md:p-0 border-t md:border-none border-black/10"
            >
              <CartTotal
                variant="checkout"
                disabled={
                  !(
                    dirty &&
                    isValid &&
                    !!cart?.length &&
                    getCartTotal() !== 0
                  ) || isLoading
                }
                isLoading={isLoading}
              />
            </motion.div>
          </motion.div>
        </Form>
      )}
    </Formik>
  );
}
