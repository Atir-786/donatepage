"use client";
export default function PaymentErrorModel({ paymentError, setPaymentError }) {
  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full shadow-lg">
        <h2 className="text-xl font-bold text-red-500 mb-4">Payment Failed</h2>
        <p className="text-gray-700">{paymentError}</p>
        <button
          onClick={() => setPaymentError(null)}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}
