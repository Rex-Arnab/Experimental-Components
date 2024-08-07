"use client";

import React, { useState, useMemo } from "react";

const QuizJsonGenerator = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const [questions, setQuestions] = useState([]);
  const [isPretty, setIsPretty] = useState(true);
  const [error, setError] = useState("");

  const addQuestion = (type) => {
    if (type) {
      setQuestions([
        ...questions,
        {
          type,
          question: "",
          options: [],
          correctAnswer: "",
          hint: "",
          explanation: ""
        }
      ]);
    }
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = questions.map((q, i) =>
      i === index ? { ...q, [field]: value } : q
    );
    setQuestions(updatedQuestions);
  };

  const addOption = (index) => {
    const updatedQuestions = questions.map((q, i) => {
      if (i === index) {
        return { ...q, options: [...q.options, ""] }; // Add an empty option
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = questions.map((q, i) => {
      if (i === questionIndex) {
        const updatedOptions = q.options.map((opt, j) =>
          j === optionIndex ? value : opt
        );
        return { ...q, options: updatedOptions };
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  const validateInputs = () => {
    if (!quizTitle || !timeLimit || questions.length === 0) {
      setError("Please fill out all required fields.");
      return false;
    }
    setError("");
    return true;
  };

  const generateJson = useMemo(() => {
    if (!validateInputs()) return;
    const quizData = {
      quizTitle,
      timeLimit: parseInt(timeLimit, 10),
      questions
    };
    return isPretty
      ? JSON.stringify(quizData, null, 2)
      : JSON.stringify(quizData);
  }, [quizTitle, timeLimit, questions, isPretty]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Quiz JSON Generator</h1>
      <div className="mb-4">
        <label className="block">Quiz Title:</label>
        <input
          type="text"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
          className="border p-2 w-full"
          aria-required="true"
        />
      </div>
      <div className="mb-4">
        <label className="block">Time Limit (seconds):</label>
        <input
          type="number"
          value={timeLimit}
          onChange={(e) => setTimeLimit(e.target.value)}
          className="border p-2 w-full"
          aria-required="true"
        />
      </div>
      <div className="mb-4">
        <label className="block">Select Question Type:</label>
        <select
          onChange={(e) => addQuestion(e.target.value)}
          className="border p-2 w-full">
          <option value="">Select Question Type</option>
          <option value="multiple-choice">Multiple Choice</option>
          <option value="true-false">True/False</option>
          <option value="fill-in-the-blank">Fill in the Blank</option>
          <option value="rearrange">Rearrange</option>
        </select>
      </div>
      {questions.map((question, index) => (
        <div key={index} className="mb-4 border p-4">
          <h3 className="font-semibold">Question {index + 1}</h3>
          <label className="block">Question:</label>
          <input
            type="text"
            value={question.question}
            onChange={(e) =>
              handleQuestionChange(index, "question", e.target.value)
            }
            className="border p-2 w-full"
            aria-required="true"
          />
          {question.type === "multiple-choice" && (
            <div>
              <h4 className="font-semibold">Options:</h4>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(index, optionIndex, e.target.value)
                    }
                    className="border p-2 w-full"
                    placeholder={`Option ${optionIndex + 1}`}
                  />
                </div>
              ))}
              <button
                onClick={() => addOption(index)}
                className="bg-blue-500 text-white p-2 rounded">
                Add Option
              </button>
            </div>
          )}
        </div>
      ))}
      {error && <span className="text-red-500">{error}</span>}
      <div className="mb-4">
        <label className="block">JSON Formatting:</label>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={isPretty}
            onChange={() => setIsPretty(!isPretty)}
            className="form-checkbox"
          />
          <span className="ml-2">Pretty Print</span>
        </label>
      </div>
      <div>
        <h2 className="text-xl font-bold">Generated JSON</h2>
        <pre className="bg-gray-100 p-4 border">{generateJson}</pre>
        <button
          onClick={() => navigator.clipboard.writeText(generateJson)}
          className="bg-green-500 text-white p-2 rounded mr-2">
          Copy to Clipboard
        </button>
        <button
          onClick={() => {
            const blob = new Blob([generateJson], {
              type: "application/json"
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "quiz.json";
            a.click();
          }}
          className="bg-blue-500 text-white p-2 rounded">
          Download JSON
        </button>
      </div>
    </div>
  );
};

export default QuizJsonGenerator;
