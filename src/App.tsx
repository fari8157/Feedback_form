import { useState } from "react";
import Form from "./components/feedbackForm/Form";
import Feedbacks from "./components/feedbacks/Feedbacks";

interface FeedbackData {
  name: string;
  contact: string;
  email: string;
  comment: string;
  emoji: string;
}

function App() {
  const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([]); // Change to an array

  const handleFeedbackSubmit = (data: FeedbackData) => {
    setFeedbacks((prevFeedbacks) => [...prevFeedbacks, data]); // Append new feedback data
  };

  return (
    <div className="py-14 grid lg:grid-cols-2 bg-[#D5E4F1] px-3 md:justify-center">
      <div className="md:flex md:justify-center">
        <Form onSubmit={handleFeedbackSubmit} />
      </div>
      <div className="mt-5 lg:mt-0">
        <h1 className="font-extrabold text-xl text-[#2071B2] mb-5">
          Submitted Feedbacks
        </h1>
        {feedbacks.map((feedback, index) => (
          <Feedbacks key={index} feedbackData={feedback} /> // Use index as key
        ))}
      </div>
    </div>
  );
}

export default App;
