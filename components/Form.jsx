"use client";
import React, { useState } from "react";
import Script from "next/script";

export default function DonationForm() {
  const [tab, setTab] = useState("initial");
  const [currency, setCurrency] = useState("");
  const [program, setProgram] = useState("");
  const [project, setProject] = useState("");
  const [amount, setAmount] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const [errors, setErrors] = useState({});
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const validateInitialDetails = () => {
    const newErrors = {};
    if (!currency) newErrors.currency = "Currency is required";
    if (!program) newErrors.program = "Program is required";
    if (!project || project === "--Select A Project--")
      newErrors.project = "Project is required";
    console.log(newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (tab === "initial") {
      const isValid = validateInitialDetails();
      if (isValid) setTab("donation");
    } else if (tab === "donation" && amount) {
      setTab("personal");
    } else if (!amount) {
      setErrors({ ...errors, amount: "Amount is required" });
    }
  };

  const validatePersonalInfo = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value)
        newErrors[key] = `${key.replace(/([A-Z])/g, " $1")} is required`;
    });
    setErrors(newErrors);
    // console.log(newErrors)
    return Object.keys(newErrors).length === 0;
  };

  const handlePay = async () => {
    if (validateInitialDetails() && amount && validatePersonalInfo()) {
      console.log("Payment Process Started");
      console.log(formData, currency);
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
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("order id is ", data.orderId);
      return data.orderId;
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };
  const processPayment = async () => {
    // e.preventDefault();
    try {
      const orderId = await createOrderId();
      console.log("order id is ", orderId);
      const options = {
        key: process.env.KEY_ID,
        amount: parseFloat(amount) * 100,
        currency: currency,
        name: formData.name,
        description: program,
        order_id: orderId,
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
          console.log(res);
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
        alert(response.error.description);
      });
      paymentObject.open();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-lg mx-auto p-6 space-y-6 border rounded-lg shadow-lg">
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

      {paymentSuccess ? (
        <div className="flex flex-col items-center justify-center space-y-4 p-6 bg-green-100 border border-green-400 rounded-lg shadow-lg">
          <div className="text-6xl text-green-600 animate-bounce">✅</div>
          <h1 className="text-2xl font-bold text-green-700">
            Payment Successful!
          </h1>
          <p className="text-green-600">Thank you for your donation.</p>
        </div>
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
              options={["INR", "USD", "EUR"]}
              error={errors.currency}
            />

            <SelectField
              label="Select a program"
              value={program}
              onChange={setProgram}
              options={["Youth Development", "Education"]}
              error={errors.program}
            />
            <SelectField
              label="Select a project"
              value={project}
              onChange={setProject}
              options={["Project A", "Project B"]}
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
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            {errors.amount && <ErrorMessage text={errors.amount} />}
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
                  placeholder={key.replace(/([A-Z])/g, " $1") + " *"}
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

const Step = ({ title, active, children, onEdit }) => (
  <div className="border rounded-lg overflow-hidden mb-4">
    <div
      className={`px-4 py-2 text-lg font-semibold ${
        active ? "bg-[#e36955] text-white" : "bg-gray-200"
      }`}
    >
      {title}{" "}
      {!active && (
        <button className="ml-2 text-sm text-blue-500" onClick={onEdit}>
          Edit
        </button>
      )}
    </div>
    {active && <div className="p-4 space-y-4">{children}</div>}
  </div>
);

const SelectField = ({ label, value, onChange, options, error }) => (
  <div>
    <label className="block mb-1 font-medium">{label} *</label>
    <select
      className="w-full p-2 border rounded"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Select</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {/* errro is{error} */}
    {error && <ErrorMessage text={error} />}
  </div>
);

const ErrorMessage = ({ text }) => (
  <p className="text-red-500 text-sm">{text}</p>
);

const Button = ({ className, onClick, text }) => (
  <button
    className={`${className} cursor-pointer w-full bg-[#e36955] text-white px-4 py-2 mt-4 rounded-lg hover:bg-[#e36955] transition`}
    onClick={onClick}
  >
    {text}
  </button>
);
