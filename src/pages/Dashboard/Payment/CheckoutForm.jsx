import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import "./CheckoutForm.css";

const CheckoutForm = ({ price, carts }) => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [axiosSecure] = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        // console.log("client secret", res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    console.log(card);
    if (card === null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("error", error);
      setCardError(error.message);
    } else {
      setCardError("");
      // console.log("[PaymentMethod]", paymentMethod);
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(
        // '{PAYMENT_INTENT_CLIENT_SECRET}',
        clientSecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              name: user?.name || user?.displayName,
              email: user?.email,
            },
          },
        }
      );
    if (confirmError) {
      console.log(confirmError);
    }

    console.log("payment intent", paymentIntent);
    setProcessing(false);
    if (paymentIntent.status === "succeeded") {
      const transactionId = paymentIntent.id;
      // console.log(transactionId, 74);
      setTransactionId(paymentIntent.id);
      //   Todo next step:
      // save payment info in server:
      const payment = {
        email: user?.email,
        transactionId: transactionId,
        price,
        date: new Date(),
        quantity: carts.length,
        cartItems: carts.map((item) => item.name),
        menuItems: carts.map((item) => item._id),
        status: "service pending",
        itemNames: carts.map((item) => item.name),
      };
      axiosSecure.post("/payment", payment).then((res) => {
        console.log(res.data);
        if (res.data.deletedResult.acknowledged) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Payment Successfull",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        <button
          className="btn btn-warning btn-sm my-5"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
      {cardError && (
        <h4 className="text-xl font-semibold text-red-500 my-6">{cardError}</h4>
      )}

      {transactionId && (
        <h4 className="text-xl text-green-700 font-semibold">
          Transaction complete with transactionId: {transactionId}
        </h4>
      )}
    </div>
  );
};

export default CheckoutForm;
