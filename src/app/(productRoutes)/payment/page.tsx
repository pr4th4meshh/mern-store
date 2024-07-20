"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { message, Button } from "antd";
import { useCreateOrderMutation } from "@/lib/api-slices/ordersApiSlice";
import { useRouter } from "next/navigation";

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [createOrder] = useCreateOrderMutation();
  const router = useRouter();

  useEffect(() => {
    // Retrieve and parse orderDetails from query params
    const details = searchParams.get("orderDetails");
    if (details) {
      setOrderDetails(JSON.parse(decodeURIComponent(details)));
    } else {
      message.error("Order details not found");
      router.push("/"); // Redirect to home or error page
    }
  }, [searchParams, router]);

  console.log(orderDetails)

  const paymentHandler = async (e) => {
    e.preventDefault();
  
    if (!orderDetails) {
      message.error("Order details not available");
      return;
    }
  
    const { totalAmount } = orderDetails;
    const currency = "INR";
    const receiptId = "qwsaq1"; // You may want to generate a unique receiptId
  
    try {
      const response = await fetch("http://localhost:5000/api/payment/order", {
        method: "POST",
        body: JSON.stringify({
          amount: totalAmount, // amount in paise
          currency,
          receipt: receiptId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to initiate payment');
      }
  
      const order = await response.json();
      console.log(order);
  
      var options = {
        key: process.env.RAZORPAY_KEY,
        amount: totalAmount ,
        currency,
        name: "Re-Inventory",
        description: "Buying products",
        image: "",
        order_id: order.id,
        handler: async function (response) {
          const body = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };
  
          try {
            const validateRes = await fetch("http://localhost:5000/api/payment/verify", {
              method: "POST",
              body: JSON.stringify(body),
              headers: {
                "Content-Type": "application/json",
              },
            });
  
            if (!validateRes.ok) {
              throw new Error('Failed to verify payment');
            }
  
            const jsonRes = await validateRes.json();
            console.log(jsonRes);
  
            if (jsonRes.msg === "success") {
              await createOrder(orderDetails);
              message.success("Order created successfully!");
              router.push("/order-success");
            } else {
              message.error("Payment verification failed");
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
            message.error("Failed to verify payment");
          }
        },
        prefill: {
          name: "re-inventory",
          email: "help.reinventory@rein.com",
          contact: "7506096826",
        },
        notes: {
          address: "Re-Inventory, India",
        },
        theme: {
          color: "#f58d42",
        },
      };
  
      var rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      rzp1.open();
      e.preventDefault();
    } catch (error) {
      console.error("Error initiating payment:", error);
      message.error("Failed to initiate payment");
    }
  };  

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Proceeding with Payment</h1>
      <Button
        onClick={paymentHandler}
        className="p-6 my-4 rounded-full w-full bg-secondary text-white uppercase text-lg"
      >
        Pay Now
      </Button>
    </div>
  );
};

export default PaymentPage;
