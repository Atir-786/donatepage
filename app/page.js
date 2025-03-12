"use client";
import { useState } from "react";

export default function DonationForm() {
  const [isInitialOpen, setIsInitialOpen] = useState(true);
  const [isDonationOpen, setIsDonationOpen] = useState(false);
  const [currency, setCurrency] = useState("");
  const [program, setProgram] = useState("");
  const [project, setProject] = useState("");
  const [errors, setErrors] = useState({});
  const [amount, setAmount] = useState(0);
  const [isPersonalOpen, setIsPersonalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const validateInitialDetails = () => {
    let newErrors = {};
    if (!currency) newErrors.currency = "Currency is required";
    if (!program) newErrors.program = "Program is required";
    if (!project || project === "--Select A Project--")
      newErrors.project = "Project is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateInitialDetails()) {
      setIsInitialOpen(false);
      setIsDonationOpen(true);
    }
  };

  const validatePersonalInfo = () => {
    let newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value)
        newErrors[key] = `${key.replace(/([A-Z])/g, " $1")} is required`;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handlePay = () => {
    if (validatePersonalInfo()) {
      console.log("Payment Process Started");
    }
  };
  return (
    <div
      className="flex flex-col lg:flex-row gap-6 p-6 bg-cover bg-center min-h-screen"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      {/* Left Section - Donation Form */}
      <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
        {/* Initial Details Section */}
        <div className="border rounded-lg overflow-hidden">
          <div
            className={`px-4 py-2 text-lg font-semibold cursor-pointer ${
              isInitialOpen ? "bg-[#e36955] text-white" : "bg-gray-200"
            }`}
            onClick={() => {
              setIsInitialOpen(true);
              setIsDonationOpen(false);
            }}
          >
            1. INITIAL DETAILS
          </div>
          {isInitialOpen && (
            <div className="p-4 space-y-4">
              <label className="block">
                <span className="font-medium">Choose your currency *</span>
                <select
                  className="w-full mt-1 p-2 border rounded"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value="">Select Currency</option>
                  <option>INR</option>
                  <option>USD</option>
                  <option>EUR</option>
                </select>
                {errors.currency && (
                  <p className="text-red-500 text-sm">{errors.currency}</p>
                )}
              </label>

              <label className="block">
                <span className="font-medium">Select a program *</span>
                <select
                  className="w-full mt-1 p-2 border rounded"
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                >
                  <option value="">Select Program</option>
                  <option>Youth Development</option>
                  <option>Education</option>
                </select>
                {errors.program && (
                  <p className="text-red-500 text-sm">{errors.program}</p>
                )}
              </label>

              <label className="block">
                <span className="font-medium">Select a project *</span>
                <select
                  className="w-full mt-1 p-2 border rounded"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                >
                  <option>--Select A Project--</option>
                  <option>Project A</option>
                  <option>Project B</option>
                </select>
                {errors.project && (
                  <p className="text-red-500 text-sm">{errors.project}</p>
                )}
              </label>

              <button
                className="bg-[#e36955] text-white px-4 py-2 rounded hover:bg-[#e36955] transition"
                onClick={handleNext}
              >
                Choose an Amount →
              </button>
            </div>
          )}
        </div>

        {/* Donation Amount Details */}
        <div className="border rounded-lg overflow-hidden mt-6">
          <div
            className={`px-4 py-2 text-lg font-semibold cursor-pointer ${
              isDonationOpen ? "bg-[#e36955] text-white" : "bg-gray-200"
            }`}
            onClick={() => {
              setIsDonationOpen(true);
              setIsInitialOpen(false);
              setIsPersonalOpen(false);
            }}
          >
            2. DONATION AMOUNT DETAILS
          </div>
          {isDonationOpen && (
            <div className="p-4">
              {/* <button className="w-full bg-teal-100 border border-teal-500 text-teal-700 py-2 rounded-lg mb-4 font-medium">
                Other Amount
              </button> */}
              <input
                type="number"
                className="w-full p-2 border rounded mb-4"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <p className="font-medium">Your Donation Amount</p>
              <p className="text-2xl font-bold">₹ {amount}</p>
              <button
                className="w-full bg-[#e36955] text-white px-4 py-2 mt-4 rounded-lg hover:bg-[#e36955] transition flex justify-center items-center"
                onClick={() => {
                  setIsDonationOpen(false);
                  setIsPersonalOpen(true);
                }}
              >
                Proceed to Personal Information →
              </button>
            </div>
          )}
        </div>
        {/* Personal Information Section */}
        <div className="border rounded-lg overflow-hidden mt-6">
          <div
            className={`px-4 py-2 text-lg font-semibold cursor-pointer ${
              isPersonalOpen ? "bg-[#e36955] text-white" : "bg-gray-200"
            }`}
            onClick={() => {
              setIsPersonalOpen(true);
              setIsInitialOpen(false);
              setIsDonationOpen(false);
            }}
          >
            3. PERSONAL INFORMATION
          </div>
          {isPersonalOpen && (
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    className="w-full p-2 border rounded"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
                <div>
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number *"
                    className="w-full p-2 border rounded"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
                  )}
                </div>
              </div>
              <div>
                <input
                  type="text"
                  name="address"
                  placeholder="Address *"
                  className="w-full p-2 border rounded"
                  value={formData.address}
                  onChange={handleInputChange}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">{errors.address}</p>
                )}
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <input
                    type="text"
                    name="city"
                    placeholder="City *"
                    className="w-full p-2 border rounded"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm">{errors.city}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="state"
                    placeholder="State *"
                    className="w-full p-2 border rounded"
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm">{errors.state}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code *"
                    className="w-full p-2 border rounded"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                  />
                  {errors.postalCode && (
                    <p className="text-red-500 text-sm">{errors.postalCode}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>
                    Yes, I would like to make this gift in someone's honor.
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Yes, for Zakat Donation</span>
                </label>
              </div>
              <button
                className="w-full bg-[#e36955] text-white px-4 py-2 mt-4 rounded-lg hover:bg-[#e36955] transition"
                onClick={handlePay}
              >
                Pay
              </button>
            </div>
          )}
        </div>

        {/* Donation Support Section */}
        <div className="mt-4 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">
            What does your generous donation support?
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Child Development", icon: "👶" },
              { label: "Livelihood Support", icon: "💜" },
              { label: "Quality Education", icon: "📘" },
              { label: "Youth Development", icon: "🧑" },
              { label: "Other Projects", icon: "📋" },
              { label: "Crisis Relief", icon: "🚨" },
            ].map((item, index) => (
              <button
                key={index}
                className="flex items-center justify-center gap-2 p-4 border rounded-lg  transition"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Right Section - Other Ways to Donate */}
      <div className="lg:w-1/3 bg-white shadow-lg rounded-lg p-6 lg:self-start">
        <h2 className="text-lg font-semibold mb-4">OTHER WAYS TO DONATE</h2>
        {["PayPal", "Venmo", "Zelle", "Cheque", "Stocks"].map(
          (method, index) => (
            <div key={index} className="flex flex-col items-center my-10 ">
              <button className="bg-[#e36955] text-white px-10 py-2 rounded">
                {method}
              </button>
              {index < 3 && (
                <img
                  src="frame.png"
                  alt={`${method} QR`}
                  className="w-64 h-64"
                />
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}
