"use client";
const PaymentSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-6 bg-green-100 border border-green-400 rounded-lg shadow-lg">
      <div className="text-6xl text-green-600 animate-bounce">✅</div>
      <h1 className="text-2xl font-bold text-green-700">Payment Successful!</h1>
      <p className="text-green-600">Thank you for your donation.</p>
    </div>
  );
};
export default PaymentSuccess;
