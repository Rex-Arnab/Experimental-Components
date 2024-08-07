"use client";
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Quiz = ({ config }) => {
  const { quiz_name, finish_handler_function, initial_state, questions } =
    config;
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState(initial_state);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);

  // Validate configuration
  if (!Array.isArray(questions) || questions.length === 0) {
    return <p>Error: No questions available.</p>;
  }

  useEffect(() => {
    if (currentQuestionIndex >= questions.length) {
      finish_handler_function(score);
    }
  }, [currentQuestionIndex, questions.length, finish_handler_function, score]);

  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correct_answer;

    setUserAnswers({
      ...userAnswers,
      [currentQuestionIndex]: answer
    });

    if (isCorrect) {
      setScore(score + currentQuestion.points);
    }

    setLoading(true);
    setTimeout(() => {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setLoading(false);
    }, currentQuestion.time_duration_per_question * 1000);
  };

  const handleFillInTheBlank = (input) => {
    const currentQuestion = questions[currentQuestionIndex];
    handleAnswer(
      input.trim().toLowerCase() ===
        currentQuestion.correct_answer.toLowerCase()
        ? input
        : null
    );
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const currentQuestion = questions[currentQuestionIndex];
    const reorderedOptions = Array.from(currentQuestion.options);
    const [removed] = reorderedOptions.splice(result.source.index, 1);
    reorderedOptions.splice(result.destination.index, 0, removed);

    // Validate the new order against the correct answer
    if (!Array.isArray(currentQuestion.correct_answer)) {
      console.error(
        "Error: correct_answer must be an array for rearrange_in_correct_order questions."
      );
      return;
    }

    const isCorrectOrder =
      JSON.stringify(reorderedOptions) ===
      JSON.stringify(currentQuestion.correct_answer);
    if (isCorrectOrder) {
      handleAnswer(reorderedOptions);
    }
  };

  const renderQuestion = () => {
    const question = questions[currentQuestionIndex];
    switch (question.question_type) {
      case "multiple_choice":
        return (
          <div>
            <h2>{question.question_text}</h2>
            <div className="space-x-5">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="hover:bg-gray-200 p-2 m-1">
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
      case "true_false":
        return (
          <div>
            <h2>{question.question_text}</h2>
            <div className="flex items-center gap-5">
              <button
                onClick={() => handleAnswer("True")}
                className="hover:bg-gray-200 p-2 m-1">
                True
              </button>
              <button
                onClick={() => handleAnswer("False")}
                className="hover:bg-gray-200 p-2 m-1">
                False
              </button>
            </div>
          </div>
        );
      case "fill_in_the_blank":
        return (
          <div>
            <h2>{question.question_text}</h2>
            <input
              type="text"
              onBlur={(e) => handleFillInTheBlank(e.target.value)}
              placeholder="Type your answer"
              className="border p-2"
            />
          </div>
        );
      case "pick_any":
        return (
          <div>
            <h2>{question.question_text}</h2>
            <div className="flex items-center gap-5">
              {question.options.map((option, index) => (
                <label key={index} className="block">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const answer = e.target.checked ? option : null;
                      handleAnswer(answer);
                    }}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        );
      case "rearrange_in_correct_order":
        return (
          <div>
            <h2>{question.question_text}</h2>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="droppable">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {question.options.map((option, index) => (
                      <Draggable
                        key={option}
                        draggableId={option}
                        index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="border p-2 my-1 hover:bg-gray-100 transition duration-200">
                            {option}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        );
      default:
        return <p>Unknown question type</p>;
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{quiz_name}</h1>
      {loading ? (
        <p>Loading next question...</p>
      ) : currentQuestionIndex < questions.length ? (
        renderQuestion()
      ) : (
        <div>
          <h2>Your score: {score}</h2>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const config = {
    quiz_name: "MERN Stack and AWS Quiz",
    finish_handler_function: (score) =>
      console.log(`Quiz finished! Your score is: ${score}`),
    initial_state: 0,
    questions: [
      {
        question_text: "What does MERN stand for?",
        question_type: "multiple_choice",
        options: [
          "MongoDB, Express.js, React, Node.js",
          "MongoDB, Express.js, Redux, Node.js",
          "MySQL, Express.js, React, Node.js"
        ],
        correct_answer: "MongoDB, Express.js, React, Node.js",
        points: 10,
        time_duration_per_question: 5
      },
      {
        question_text: "Is React a library or a framework?",
        question_type: "pick_any",
        options: ["Library", "Framework"],
        correct_answer: "Library",
        points: 5,
        time_duration_per_question: 5
      },
      {
        question_text: "Which command is used to start a Node.js server?",
        question_type: "fill_in_the_blank",
        correct_answer: "node server.js",
        points: 10,
        time_duration_per_question: 5
      }
    ]
  };

  return (
    <div className="App">
      <Quiz config={config} />
    </div>
  );
};

export default App;
