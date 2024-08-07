import { useState } from "react";

const FillInTheBlankQuestion = ({ question, onAnswer }) => {
  const [userInput, setUserInput] = useState("");

  return (
    <div>
      <p className="text-lg font-bold">{question.question}</p>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onAnswer(userInput)}
        className="mt-2 p-2 border rounded"
        placeholder="Your answer"
      />
      <button
        className="mt-2 p-2 bg-blue-500 text-white rounded transition"
        onClick={() => onAnswer(userInput)}>
        Submit
      </button>
    </div>
  );
};

export default FillInTheBlankQuestion;
