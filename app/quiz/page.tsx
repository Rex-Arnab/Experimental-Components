"use client";

import React from "react";
import Quiz from "./Quiz";
import { UserProvider } from "./UserContext";
import QuizCreator from "./QuizCreator";
import { ThemeProvider } from "./ThemeContext";
import { Provider } from "react-redux";
import store from "./store";

const mernQuizData = {
  quizTitle: "Mern Quiz",
  timeLimit: 60,
  questions: [
    {
      type: "multiple-choice",
      question: "What is My Name",
      options: ["Arnab", "Lucky", "Killer", "Test", "ASda"],
      correctAnswer: "",
      hint: "",
      explanation: ""
    },
    {
      type: "true-false",
      question: "Is Earth Flat",
      options: [],
      correctAnswer: "",
      hint: "",
      explanation: ""
    },
    {
      type: "fill-in-the-blank",
      question: "asdasdsa",
      options: [],
      correctAnswer: "",
      hint: "",
      explanation: ""
    }
  ]
};
const App = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <Provider store={store}>
          <div className="App">
            <Quiz quizData={mernQuizData} />
            <QuizCreator />
          </div>
        </Provider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
