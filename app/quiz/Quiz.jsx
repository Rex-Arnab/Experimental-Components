import React, { useState, useEffect } from "react";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import TrueFalseQuestion from "./TrueFalseQuestion";
import FillInTheBlankQuestion from "./FillInTheBlankQuestion";
import RearrangeQuestion from "./RearrangeQuestion";
import { Feedback } from "./Feedback";

const Quiz = ({ quizData }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quizData.timeLimit);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (isFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      // setIsFinished(true);
      clearInterval(timer);
    };
  }, [isFinished]);

  const handleAnswer = (answer) => {
    const currentQuestion = quizData.questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;
    setUserAnswers([...userAnswers, answer]);
    setFeedback(
      isCorrect ? "Correct!" : `Incorrect. ${currentQuestion.explanation || ""}`
    );
    if (isCorrect) {
      setScore(score + 1);
    }
    setTimeout(() => {
      if (currentQuestionIndex < quizData.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setFeedback("");
        setShowHint(false);
      } else {
        setIsFinished(true);
      }
    }, 2000);
  };

  const renderQuestion = (question) => {
    switch (question.type) {
      case "multiple-choice":
        return (
          <MultipleChoiceQuestion question={question} onAnswer={handleAnswer} />
        );
      case "true-false":
        return (
          <TrueFalseQuestion question={question} onAnswer={handleAnswer} />
        );
      case "fill-in-the-blank":
        return (
          <FillInTheBlankQuestion question={question} onAnswer={handleAnswer} />
        );
      case "rearrange":
        return (
          <RearrangeQuestion question={question} onAnswer={handleAnswer} />
        );
      default:
        return null;
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswers([]);
    setFeedback("");
    setIsFinished(false);
    setTimeLeft(quizData.timeLimit);
    setShowHint(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{quizData.quizTitle}</h1>
      <p className="text-lg">Time Left: {timeLeft} seconds</p>
      <p className="text-lg">Score: {score}</p>
      {isFinished ? (
        <div>
          <Feedback userAnswers={userAnswers} questions={quizData.questions} />
          <button
            onClick={handleReset}
            className="mt-4 p-2 bg-gray-300 rounded">
            Reset Quiz
          </button>
        </div>
      ) : (
        <div>
          {renderQuestion(quizData.questions[currentQuestionIndex])}
          {feedback && <p className="mt-4 text-green-600">{feedback}</p>}
          {showHint && (
            <p className="mt-2 text-gray-600">
              {quizData.questions[currentQuestionIndex].hint}
            </p>
          )}
          <button
            onClick={() => setShowHint((prev) => !prev)}
            className="mt-2 p-2 bg-gray-300 rounded">
            {showHint ? "Hide Hint" : "Show Hint"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
