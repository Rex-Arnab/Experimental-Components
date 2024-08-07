const TrueFalseQuestion = ({ question, onAnswer }) => {
  return (
    <div>
      <p className="text-lg font-bold">{question.question}</p>
      <button
        className="mt-2 p-2 bg-blue-500 text-white rounded transition"
        onClick={() => onAnswer(true)}
        aria-label="Select True">
        True
      </button>
      <button
        className="mt-2 p-2 bg-blue-500 text-white rounded transition"
        onClick={() => onAnswer(false)}
        aria-label="Select False">
        False
      </button>
    </div>
  );
};

export default TrueFalseQuestion;
