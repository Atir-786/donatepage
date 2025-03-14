"use client";
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
export default SelectField;
