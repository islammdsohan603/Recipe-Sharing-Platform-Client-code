"use client";

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// Replace with your actual Stripe Publishable Key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_TYooMQauvdEDq54NiTphI7jx");

const CheckoutForm = ({ userEmail, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    axios
      .post(
        "http://localhost:5000/api/create-payment-intent",
        { price: 10 }, // Example $10 premium fee
        { withCredentials: true }
      )
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => {
        console.error("Error creating payment intent", err);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements || !clientSecret) {
      setLoading(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      setLoading(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    } else {
      setError(null);
    }

    // Confirm Payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: userEmail || "anonymous",
          name: userEmail || "anonymous",
        },
      },
    });

    if (confirmError) {
      setError(confirmError.message);
    } else {
      if (paymentIntent.status === "succeeded") {
        toast.success("Payment Successful! You are now a premium member.");
        
        // Save payment to DB
        const payment = {
          userEmail,
          transactionId: paymentIntent.id,
          amount: paymentIntent.amount / 100,
          paymentStatus: paymentIntent.status,
          date: new Date(),
        };

        await axios.post("http://localhost:5000/api/payments", payment, { withCredentials: true });
        
        if (onSuccess) onSuccess();
      }
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-xl shadow-md bg-white text-black">
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
        className="mt-6 w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-400"
        type="submit"
        disabled={!stripe || !clientSecret || loading}
      >
        {loading ? "Processing..." : "Pay $10"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default function StripeCheckoutWrapper({ userEmail, onSuccess }) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm userEmail={userEmail} onSuccess={onSuccess} />
    </Elements>
  );
}
