import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import "react-beautiful-dnd/dist/react-beautiful-dnd.css";

const RearrangeQuestion = ({ question, onAnswer }) => {
  const [order, setOrder] = useState(question.options);

  const handleDrop = (result) => {
    if (!result.destination) return;

    const newOrder = Array.from(order);
    const [removed] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, removed);

    setOrder(newOrder);
  };

  const handleSubmit = () => {
    const isCorrect =
      JSON.stringify(order) === JSON.stringify(question.correctOrder);
    onAnswer(isCorrect);
  };

  return (
    <>
      <p className="text-lg font-bold">{question.question}</p>

      <DragDropContext onDragEnd={handleDrop}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="p-4 border rounded mb-4">
              {order.map((option, index) => (
                <Draggable key={option} draggableId={option} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-2 border rounded mb-2 bg-white">
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
      <button
        onClick={handleSubmit}
        className="mt-2 p-2 bg-blue-500 text-white rounded">
        Submit
      </button>
    </>
  );
};

export default RearrangeQuestion;
