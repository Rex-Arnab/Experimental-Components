export const Feedback = ({ userAnswers, questions }) => {
  return (
    <div className="p-5 space-y-5 bg-slate-200">
      {questions.map((question, index) => (
        <div key={index} className="border p-5 w-fit shadow bg-white">
          <p className="text-xl font-bold">{question.question}</p>
          <p>Your answer: {userAnswers[index]}</p>
          <p className="text-gray-500">{question.explanation}</p>
        </div>
      ))}
    </div>
  );
};
