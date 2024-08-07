const MultipleChoiceQuestion = ({ question, onAnswer }) => {
  return (
    <div>
      <p className="text-lg font-bold">{question.question}</p>
      {question.options.map((option, index) => (
        <button
          key={index}
          className="mt-2 p-2 bg-blue-500 text-white rounded transition"
          onClick={() => onAnswer(option)}
          aria-label={`Select ${option}`}>
          {option}
        </button>
      ))}
    </div>
  );
};

export default MultipleChoiceQuestion;
