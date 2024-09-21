import { InputProps } from "./types";

const Input: React.FC<InputProps> = ({ text, example, name, setFormData, value }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setFormData((prevData) => ({ ...prevData, [name]: newValue }));
  };

  return (
    <div className="flex flex-col mb-2">
      <label className="font-bold text-sm mb-2">{text}</label>
      <input
        className={`${
          value ? "text-[#105955] font-bold" : "font-normal italic"
        } rounded-lg text-xs px-3 py-2 border-[2px] shadow-md border-[#888888] focus:border-[#105955] focus:outline-none`}
        type="text"
        name={name}
        value={value} // Control the input value with props
        onChange={handleChange}
        placeholder={example}
      />
    </div>
  );
};

export default Input;
