import React, { useState } from "react";

const QuizCreator = () => {
  const [questions, setQuestions] = useState([]);

  const addQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  const handleSubmit = () => {
    // Submit the quiz data to your backend
  };

  return (
    <div>
      <h2>Create a Quiz</h2>
      {/* Form for adding questions */}
      <button onClick={handleSubmit}>Submit Quiz</button>
    </div>
  );
};

export default QuizCreator;
