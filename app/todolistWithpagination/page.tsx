"use client";

import React, { useState } from "react";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 5;

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo.trim()]);
      setNewTodo("");
    }
  };

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate pagination
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
      pageNumbers.push(
        <li key={i}>
          <button
            className={`py-1 px-3 rounded ${
              currentPage === i ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handlePageChange(i)}>
            {i}
          </button>
        </li>
      );
    }
    return <ul className="flex space-x-2">{pageNumbers}</ul>;
  };

  return (
    <div className="bg-blue-50 w-full min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Todo App</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={handleInputChange}
            placeholder="Add a new todo"
            className="border py-2 px-3 rounded-l-lg flex-grow"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTodo();
              }
            }}
          />
          <button
            onClick={handleAddTodo}
            className="bg-blue-500 text-white py-2 px-4 rounded-r-lg">
            Add
          </button>
        </div>
        <ul className="list-disc pl-5 mb-4">
          {currentTodos.map((todo, index) => (
            <li key={index} className="mb-2">
              {todo}
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center">
          <div className="text-gray-600">
            {`Showing ${indexOfFirstTodo + 1}-${Math.min(
              indexOfLastTodo,
              todos.length
            )} of ${todos.length}`}
          </div>
          {renderPageNumbers()}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
