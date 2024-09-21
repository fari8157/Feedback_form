import Worst from "../../assets/emoji/Worst.png";
import NotGood from "../../assets/emoji/It's just fine'.png";
import Fine from "../../assets/emoji/Neutral.png";
import LookGood from "../../assets/emoji/Good.png";
import VeryGood from "../../assets/emoji/Loveit.png";

interface FeedbackData {
  name: string;
  contact: string;
  email: string;
  comment: string;
  emoji: string;
}

interface FeedbacksProps {
  feedbackData: FeedbackData;
}

const Feedbacks: React.FC<FeedbacksProps> = ({ feedbackData }) => {
  const emojis = [
    { id: 1, img: Worst, name: "Worst", range: [5, 15] },
    { id: 2, img: NotGood, name: "Not Good", range: [16, 40] },
    { id: 3, img: Fine, name: "Fine", range: [41, 60] },
    { id: 4, img: LookGood, name: "Look Good", range: [61, 80] },
    { id: 5, img: VeryGood, name: "Very Good", range: [81, 100] },
  ];

  // Find the emoji that matches the feedbackData.emoji
  const selectedEmoji = emojis.find(emoji => emoji.name === feedbackData.emoji);

  return (
    <div className="w-full md:w-[410px] bg-white p-4 rounded-xl text-[#2071B2] flex items-center justify-between mt-3">
      <div>
        <h1 className="font-bold text-sm">{feedbackData.comment}</h1>
        <p className="font-medium text-sm mt-2">{feedbackData.name}</p>
      </div>
      <div className="flex flex-col items-center">
        {selectedEmoji ? (
          <>
            <img src={selectedEmoji.img} alt={selectedEmoji.name} />
            <h1 className="font-bold text-[10.5px] text-[#39AB26]">{selectedEmoji.name}</h1>
          </>
        ) : (
          <p className="font-medium text-[10.5px] text-[#39AB26]">No Emoji</p>
        )}
      </div>
    </div>
  );
};

export default Feedbacks;
