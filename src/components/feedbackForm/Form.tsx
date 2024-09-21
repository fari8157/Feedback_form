import React, { useState } from "react";
import Input from "../common/Input";
import Worst from "../../assets/emoji/Worst.png";
import NotGood from "../../assets/emoji/It's just fine'.png";
import Fine from "../../assets/emoji/Neutral.png";
import LookGood from "../../assets/emoji/Good.png";
import VeryGood from "../../assets/emoji/Loveit.png";

interface Emoji {
  id: number;
  img: string;
  name: string;
  range: number[];
}

interface FormProps {
  onSubmit: (data: { name: string; contact: string; email: string; comment: string; emoji: string }) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [selectedRange, setSelectedRange] = useState<number>(0);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    comment: "",
    emoji: ""
  });
  const [errors, setErrors] = useState<{ name?: string; contact?: string; email?: string; comment?: string }>({});
  const [emojiError, setEmojiError] = useState<string>("");

  const emoji: Emoji[] = [
    { id: 1, img: Worst, name: "Worst", range: [5, 15] },
    { id: 2, img: NotGood, name: "Not Good", range: [16, 40] },
    { id: 3, img: Fine, name: "Fine", range: [41, 60] },
    { id: 4, img: LookGood, name: "Look Good", range: [61, 80] },
    { id: 5, img: VeryGood, name: "Very Good", range: [81, 100] },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rangeValue = Number(e.target.value);
    setSelectedRange(rangeValue);

    const selectedEmoji = emoji.find(item => rangeValue >= item.range[0] && rangeValue <= item.range[1]);
    setFormData(prevData => ({
      ...prevData,
      emoji: selectedEmoji ? selectedEmoji.name : ""
    }));
    setEmojiError(""); // Reset emoji error when the user interacts with the range
  };

  const validateForm = () => {
    const newErrors: { name?: string; contact?: string; email?: string; comment?: string } = {};
    let hasEmojiError = "";
  
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }
    if (!formData.contact.trim()) {
      newErrors.contact = "Contact number is required.";
    } else if (!/^(?:\+91|91)?[789]\d{9}$/.test(formData.contact)) {
      newErrors.contact = "Contact number is invalid. It should be a 10-digit Indian number.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!formData.comment.trim()) {
      newErrors.comment = "Comment is required.";
    }
    if (!formData.emoji.trim()) {
      hasEmojiError = "Please select an emoji to express your feedback.";
    }
  
    setErrors(newErrors);
    setEmojiError(hasEmojiError);
    return Object.keys(newErrors).length === 0 && hasEmojiError === "";
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData); // Pass formData to the parent
      setFormData({
        name: "",
        contact: "",
        email: "",
        comment: "",
        emoji: ""
      });
      setSelectedRange(0); // Reset the range
      setErrors({}); // Clear errors
      setEmojiError(""); // Clear emoji error
    }
  };

  const getOpacity = (range: number[]) => {
    return selectedRange >= range[0] && selectedRange <= range[1]
      ? "grayscale-0"
      : "grayscale";
  };

  return (
    <div className="lg:w-[410px] bg-white p-6 rounded-xl text-[#2071B2]">
      <h1 className="font-medium text-sm">Please Provide your Feedback</h1>
      <form className="mt-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <Input
              text="Name"
              example="name"
              name="name"
              setFormData={setFormData}
              value={formData.name}
            />
            {errors.name && <div className="text-red-500 text-xs">{errors.name}</div>}
          </div>
          <div>
            <Input
              text="Contact Number"
              example="+91 00000 00000"
              name="contact"
              setFormData={setFormData}
              value={formData.contact}
            />
            {errors.contact && <div className="text-red-500 text-xs">{errors.contact}</div>}
          </div>
          <div>
            <Input
              text="Email Address"
              example="xyz123@gmail.com"
              name="email"
              setFormData={setFormData}
              value={formData.email}
            />
            {errors.email && <div className="text-red-500 text-xs">{errors.email}</div>}
          </div>
        </div>
        <div className="mt-5">
          <h1 className="font-bold text-sm mb-4">Share Your Experience in Scaling</h1>
          <div className="grid grid-cols-5 gap-4 w-full mb-2">
            {emoji.map((item) => (
              <div key={item.id} className="flex flex-col items-center">
                <div className={`w-12 h-12 mb-2 ${getOpacity(item.range)}`}>
                  <img className="w-full h-full object-cover" src={item.img} alt={item.name} />
                </div>
                <h1 className={`font-bold text-sm text-center text-[#105955] ${getOpacity(item.range)}`}>
                  {item.name}
                </h1>
              </div>
            ))}
          </div>
          {emojiError && <div className="text-red-500 text-xs mt-1">{emojiError}</div>}
          <input
      className="w-full h-2 appearance-none cursor-pointer bg-[#A5E0DD] rounded-lg"
      type="range"
      min="1"
      max="100"
      value={selectedRange}
      onChange={handleChange}
      style={{
        background: `linear-gradient(to right, #105955 ${selectedRange}%, #A5E0DD ${selectedRange}%)`,
      }}
    />
        </div>
        <textarea
          name="comment"
          value={formData.comment}
          placeholder="Add your comments..."
          className="w-full h-20 rounded-lg text-xs px-3 py-2 border-[2px] shadow-md border-[#888888] focus:border-[#105955] focus:outline-none mt-5"
          onChange={(e) => setFormData((prevData) => ({ ...prevData, comment: e.target.value }))}
        ></textarea>
        {errors.comment && <div className="text-red-500 text-xs mt-1">{errors.comment}</div>}
        <button
          type="submit"
          className="bg-[#20B2AA] w-full py-3 text-[#FFFFFF] font-bold text-sm rounded-[8px] mt-6"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
