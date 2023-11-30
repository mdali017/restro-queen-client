import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutForm from "./CheckoutForm";
import useCart from "../../../hooks/useCart";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const [carts] = useCart();
  const total = carts.reduce((sum, item) => sum + item.price, 0);
  const price = parseFloat(total.toFixed(2));
  // console.log(total);
  return (
    <div className="w-9/12">
      <h4 className="text-2xl text-green-500 font-semibold my-10">Payment</h4>
      <Elements stripe={stripePromise}>
        <CheckoutForm price={price} carts={carts}></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Payment;
