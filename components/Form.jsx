"use client";
import React, { useState } from "react";
import Script from "next/script";
import PaymentErrorModel from "./PaymentErrorModel";
import PaymentSuccess from "./PaymentSuccess";
import Step from "./Step";
import SelectField from "./SelectField";
import Button from "./Button";
const currencies = JSON.parse(process.env.NEXT_PUBLIC_CURRENCIES) || [];
const programs = JSON.parse(process.env.NEXT_PUBLIC_PROGRAMS) || [];
const projects = JSON.parse(process.env.NEXT_PUBLIC_PROJECTS) || [];
// console.log(currencies);
export default function DonationForm() {
  const [tab, setTab] = useState("initial");
  const [currency, setCurrency] = useState("");
  const [program, setProgram] = useState("");
  const [project, setProject] = useState("");
  const [amount, setAmount] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const [errors, setErrors] = useState({});
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const validateInitialDetails = () => {
    const newErrors = {};
    if (!currency) newErrors.currency = "Currency is required";
    if (!program) newErrors.program = "Program is required";
    if (!project || project === "--Select A Project--")
      newErrors.project = "Project is required";
    // console.log(newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (tab === "initial") {
      const isValid = validateInitialDetails();
      if (isValid) setTab("donation");
    } else if (tab === "donation" && amount && amount > 0) {
      setTab("personal");
    } else if (!amount || amount == 0) {
      setErrors({ ...errors, amount: "Amount is required" });
    }
  };

  const validatePersonalInfo = () => {
    const newErrors = {};
    const requiredFields = ["name", "email", "phoneNumber"];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field.replace(/([A-Z])/g, " $1")} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePay = async () => {
    if (validateInitialDetails() && amount && validatePersonalInfo()) {
      console.log("Payment Process Started");
      // console.log(formData, currency);
      await processPayment();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const createOrderId = async () => {
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parseFloat(amount) * 100,
          currency: currency,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      // console.log("order id is ", data.orderId);
      return data.orderId;
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };
  const processPayment = async () => {
    // e.preventDefault();
    console.log(currency);
    try {
      const orderId = await createOrderId();
      // console.log("order id is ", orderId);
      const options = {
        key: process.env.KEY_ID,
        amount: parseFloat(amount) * 100,
        currency: currency,
        name: formData.name,
        description: "Donation Payment",
        order_id: orderId,
        notes: {
          program: program,
          project: project,
        },
        handler: async function (response) {
          const data = {
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          const result = await fetch("/api/verify", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
          });
          const res = await result.json();
          // console.log(res);
          if (res.isOk) {
            setPaymentSuccess(true);
            // alert("payment succeed");
          } else {
            alert(res.message);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
        },
        theme: {
          color: "#3399cc",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", function (response) {
        // alert(response.error.description);
        setPaymentError(response.error.description);
      });
      paymentObject.open();
    } catch (error) {
      console.log(error);
      setPaymentError("Something went wrong. Please try again.");
    }
  };
  return (
    <div className="mx-auto p-2 md:p-4 lg:p-6 space-y-6 border rounded-lg shadow-lg">
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      {paymentError && (
        <PaymentErrorModel
          paymentError={paymentError}
          setPaymentError={setPaymentError}
        />
      )}
      {paymentSuccess ? (
        <PaymentSuccess />
      ) : (
        <>
          {/* Initial Details */}
          <Step
            title="1. Initial Details"
            active={tab === "initial"}
            onEdit={() => setTab("initial")}
          >
            <SelectField
              label="Choose your currency"
              value={currency}
              onChange={setCurrency}
              options={currencies}
              error={errors.currency}
            />

            <SelectField
              label="Select a program"
              value={program}
              onChange={setProgram}
              options={programs}
              error={errors.program}
            />
            <SelectField
              label="Select a project"
              value={project}
              onChange={setProject}
              options={projects}
              error={errors.project}
            />
            <Button onClick={handleNext} text="Choose an Amount →" />
          </Step>

          {/* Donation Amount Details */}
          <Step
            title="2. Donation Amount Details"
            active={tab === "donation"}
            onEdit={() => setTab("donation")}
          >
            <input
              type="text"
              placeholder="Amount"
              value={amount}
              onChange={(e) => {
                const newValue = e.target.value;
                if (/^\d*\.?\d*$/.test(newValue)) {
                  setAmount(newValue);
                }
              }}
              className="w-full p-2 border rounded mb-2"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm">{errors.amount}</p>
            )}
            <Button
              onClick={handleNext}
              text="Proceed to Personal Information →"
            />
          </Step>

          {/* Personal Information */}
          <Step
            title="3. Personal Information"
            active={tab === "personal"}
            onEdit={() => setTab("personal")}
          >
            {Object.entries(formData).map(([key, value]) => (
              <div key={key} className="mb-2">
                <input
                  type="text"
                  name={key}
                  value={value}
                  onChange={handleInputChange}
                  placeholder={key.replace(/([A-Z])/g, " $1")}
                  className="w-full p-2 border rounded"
                />
                {errors[key] && <ErrorMessage text={errors[key]} />}
              </div>
            ))}
            <Button className="cursor-pointer" onClick={handlePay} text="Pay" />
          </Step>
        </>
      )}
    </div>
  );
}
const ErrorMessage = ({ text }) => (
  <p className="text-red-500 text-sm">{text}</p>
);
