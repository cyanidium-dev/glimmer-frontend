import { FormikHelpers } from "formik";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { ValuesCheckoutFormType } from "@/components/shared/forms/checkoutForm/CheckoutForm";
import { generateOrderNumber } from "./generateOrderNumber";
import { fetchSanityDataClient } from "./fetchSanityDataClient";
import { productsByIds, promocodeByCodeQuery } from "../lib/queries";
import { useCartStore } from "../store/cartStore";
import { useOrderStore } from "@/store/orderStore";
import { CartItem } from "@/types/cartItem";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";
import { sendDataToKeyCrm } from "./sendDataToKeyCrm";
import { OrderConfirmationEmail } from "@/components/checkoutPage/OrderConfirmationEmail";
import { BasketOrder } from "@/hooks/useMonopayBasletOrder";
import { render, pretty } from "@react-email/render";

export const handleSubmitForm = async <T>(
  { resetForm, setFieldError }: FormikHelpers<T>,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setIsError: Dispatch<SetStateAction<boolean>>,
  setIsUnavailable: Dispatch<SetStateAction<boolean>>,
  setIsNotificationShown: Dispatch<SetStateAction<boolean>>,
  values: ValuesCheckoutFormType,
  router: ReturnType<typeof useRouter>,
  basketOrder: BasketOrder
) => {
  const {
    clearCart,
    cart,
    promoCode,
    promoDiscountPercent,
    promoPublishers,
    applyPromoCode,
    removePromoCode,
    getCartTotal,
  } = useCartStore.getState();

  const { clearOrder, setOrder } = useOrderStore.getState();

  clearOrder();

  setIsLoading(true);

  //Формуємо номер замовлення
  const orderNumber = generateOrderNumber();

  // Формуємо дату та час замовлення
  const now = new Date();

  // Форматуємо дату
  const formattedDate = now.toLocaleDateString("uk-UA");

  // Форматуємо час
  const formattedTime = now.toLocaleTimeString("uk-UA");

  // Об'єднуємо дату та час
  const orderDate = formattedDate;

  const orderTime = formattedTime;

  //Запитуємо з cms актуальні ціни на товари в кошику
  const productsIds = cart.map((cartItem: CartItem) => cartItem.product.id);
  const resProducts = await fetchSanityDataClient(productsByIds, {
    ids: productsIds,
  });

  //Запитуємо з cms актуальний промокод
  const resPromo = promoCode
    ? await fetchSanityDataClient(promocodeByCodeQuery, {
        promocode: promoCode,
      })
    : null;

  const updatedDiscount = resPromo ? resPromo.discountPercent : 0;
  const updatedPromocode = resPromo ? resPromo.code : null;
  const updatedExpirationDate = resPromo
    ? new Date(resPromo.expirationDate)
    : null;
  const updatedPublishers = resPromo ? resPromo.publishers : null;

  if (updatedExpirationDate && updatedExpirationDate < now) {
    setFieldError("promocode", "Термін дії промокоду вичерпано");
    return;
  }

  //Оновлюємо в cartStore промокод та знижку на актуальні
  if (updatedPromocode) {
    applyPromoCode(updatedPromocode, updatedDiscount, updatedPublishers);
  } else {
    removePromoCode();
  }

  // Оновлюємо cartItems і перевіряємо наявність товарів
  const updatedCartItems: CartItem[] = [];
  const unavailableProducts: string[] = [];

  cart.forEach((cartItem) => {
    const productFromCms = resProducts.find(
      (product: Product) => product.id === cartItem.product.id
    );

    if (!productFromCms) {
      unavailableProducts.push(cartItem.product.title);
      return;
    }

    updatedCartItems.push({
      ...cartItem,
      product: {
        ...cartItem.product,
        price: productFromCms.price,
        discountPrice: productFromCms.discountPrice,
      },
    });
  });

  useCartStore.setState({ cart: updatedCartItems });

  // Якщо знайдено недоступні товари — показати помилку і припинити процес замовлення
  if (unavailableProducts.length > 0) {
    setIsLoading(false);
    setIsError(true);
    setIsUnavailable(true);
    alert(unavailableProducts);
    // setIsNotificationShown(true);
    return;
  }

  const totalOrderSum = getCartTotal();

  const collectedOrderData = {
    orderDate,
    orderTime,
    orderNumber,
    name: values.name.trim(),
    surname: values.surname.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
    deliveryService: values.deliveryService.trim(),
    deliveryType: values.deliveryType.trim(),
    city: values.city.trim(),
    branchNumber: values.branchNumber.trim(),
    address: values.address.trim(),
    payment: values.payment.trim(),
    message: values.message.trim(),
    cart,
    promoCode,
    promoDiscountPercent,
    promoPublishers,
    totalOrderSum,
  };

  // Записуємо в orderState зібрану та оновлену інформацію по замовленню
  setOrder(collectedOrderData);

  // Формуємо список товарів з переносами на новий рядок для Telegram
  const orderedListProducts = cart
    .map((cartItem) => {
      const quantityLine = ` - ${cartItem.quantity} шт.`;
      const authorLine = cartItem.product?.author
        ? `, ${cartItem.product?.author}`
        : "";
      const skuLine = `, код товару: ${cartItem.product?.sku}`;
      return `- ${cartItem.product.title}${authorLine}${skuLine}${quantityLine}`;
    })
    .join("\n");

  // Формуємо дані для telegram
  const dataTelegram =
    `<b>Замовлення #${orderNumber}</b>\n` +
    `<b>Дата замовлення:</b> ${orderDate} ${orderTime}\n` +
    `<b>Ім'я:</b> ${values.name.trim()}\n` +
    `<b>Прізвище:</b> ${values.surname.trim()}\n` +
    `<b>Телефон:</b> ${values.phone.replace(/[^\d+]/g, "")}\n` +
    `<b>Email:</b> ${values.email.trim()}\n` +
    `<b>Сервіс доставки:</b> ${values.deliveryService.trim()}\n` +
    `<b>Тип доставки:</b> ${values.deliveryType.trim()}\n` +
    `<b>Насeлений пункт:</b> ${values.city.trim()}\n` +
    `<b>Номер відділення або поштомату:</b> ${values.branchNumber?.trim() || ""}\n` +
    `<b>Адреса:</b> ${values.address?.trim() || ""}\n` +
    `<b>Оплата:</b> ${values.payment.trim()}\n` +
    `<b>Повідомлення:</b> ${values.message?.trim()}\n` +
    `<b>Промокод:</b> ${promoCode || ""}\n` +
    `<b>Розмір знижки за промокодом:</b> ${promoDiscountPercent ? `${promoDiscountPercent}%` : ""}\n` +
    `<b>Список товарів в замовленні:</b>\n${orderedListProducts}\n` +
    `<b>Сума замовлення:</b> ${totalOrderSum} грн\n`;

  if (collectedOrderData.payment === "Оплата картою онлайн Visa, Mastercard") {
    try {
      const res = await axios.post("/api/monopay/invoice", {
        amount: totalOrderSum * 100, // сума в копійках
        orderNumber,
        basketOrder,
      });

      const { pageUrl } = res?.data;

      //Очищаємо форму
      resetForm();
      //Очищаємо кошик
      clearCart();
      //Видаляємо промокод
      removePromoCode();

      // if (pageUrl) {
      //   window.location.href = pageUrl; // переадресація на оплату
      // } else {
      //   console.error("Payment error: немає pageUrl", res?.data);
      // }
    } catch (error) {
      // setIsError(true);
      // setIsNotificationShown(true);
      // setIsLoading(false);
      alert(error);
      console.error(error);
      // return error;
    }
  }

  try {
    await axios({
      method: "post",
      url: "/api/telegram",
      data: dataTelegram,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const html = await pretty(
      await render(
        OrderConfirmationEmail({
          orderNumber,
          orderDate,
          name: values.name.trim(),
          phone: values.phone.trim(),
          city: values.city.trim(),
          deliveryService: values.deliveryService.trim(),
          deliveryType: values.deliveryType.trim(),
          branchNumber: values.branchNumber.trim(),
          address: values.address.trim(),
          paymentMethod: values.payment.trim(),
          cart,
          totalOrderSum,
        })
      )
    );

    await axios({
      method: "post",
      url: "/api/send-email",
      data: JSON.stringify({
        email: collectedOrderData.email,
        subject: `Glimmer: Підтвердження замовлення №${collectedOrderData.orderNumber}`,
        message: html,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    await sendDataToKeyCrm(collectedOrderData);

    //Очищаємо форму
    resetForm();
    //Очищаємо кошик
    clearCart();
    //Видаляємо промокод
    removePromoCode();
    //Редірект на сторінку підтвердження замовлення
    router.push("/confirmation");
  } catch (error) {
    // setIsError(true);
    // setIsNotificationShown(true);
    alert(error);
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};
