"use client";

import React, { useState } from "react";
import "tailwindcss/tailwind.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo("");
  };

  const handleEditTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setEditingId(id);
    setEditingText(todoToEdit.text);
  };

  const handleSaveTodo = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === editingId ? { ...todo, text: editingText } : todo
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const totalTodos = todos.length;
  const totalCompleted = todos.filter((todo) => todo.completed).length;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="border p-2 rounded w-full mb-2"
          placeholder="Add new todo"
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white py-2 px-4 rounded">
          Add Todo
        </button>
      </div>
      <ul className="mb-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between mb-2 p-2 border rounded">
            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="border p-2 rounded w-full mr-2"
                />
                <button
                  onClick={handleSaveTodo}
                  className="bg-green-500 text-white py-2 px-4 rounded">
                  Save
                </button>
              </>
            ) : (
              <>
                <span
                  className={`flex-1 ${
                    todo.completed ? "line-through text-gray-400" : ""
                  }`}
                  onClick={() => handleToggleComplete(todo.id)}>
                  {todo.text}
                </span>
                <button
                  onClick={() => handleEditTodo(todo.id)}
                  className="bg-yellow-500 text-white py-2 px-4 rounded mr-2">
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded">
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div className="text-sm text-gray-500">
        <p>Total Todos: {totalTodos}</p>
        <p>Total Completed: {totalCompleted}</p>
      </div>
    </div>
  );
};

export default TodoList;
