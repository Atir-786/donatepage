"use client";
import Form from "../components/Form";

export default function page() {
  return (
    <div
      className="flex flex-col lg:flex-row gap-6 p-6 bg-cover bg-center min-h-screen"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      {/* Left Section - Donation Form */}
      <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
        {/* Initial Details Section */}
        <Form />
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
