"use client";
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
export default Step;
