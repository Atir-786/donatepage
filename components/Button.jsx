"use client";
const Button = ({ className, onClick, text }) => (
  <button
    className={`${className} cursor-pointer w-full bg-[#e36955] text-white px-4 py-2 mt-4 rounded-lg hover:bg-[#e36955] transition`}
    onClick={onClick}
  >
    {text}
  </button>
);
export default Button;
