"use client";

import React, { useState } from "react";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoText, setEditTodoText] = useState("");
  const [deletedTodosCount, setDeletedTodosCount] = useState(0);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    setDeletedTodosCount(deletedTodosCount + 1);
  };

  const handleCompleteTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleEditTodo = (id) => {
    setEditTodoId(id);
    setEditTodoText(todos.find((todo) => todo.id === id).text);
  };

  const handleSaveEditTodo = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === editTodoId ? { ...todo, text: editTodoText } : todo
      )
    );
    setEditTodoId(null);
    setEditTodoText("");
  };

  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;

  return (
    <section className="bg-slate-200 min-h-screen p-5 grid place-content-center">
      <div className="w-[700px] h-fit bg-white shadow-md rounded-lg">
        <header className="bg-blue-500 text-white text-center py-4 rounded-t-lg">
          <h1 className="text-2xl">ToDo List</h1>
        </header>
        <main className="p-4">
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Add a new task"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="flex-grow p-2 border rounded-l-lg"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddTodo();
                }
              }}
            />
            <button
              onClick={handleAddTodo}
              className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-700">
              Add
            </button>
          </div>
          <ul className="list-none p-0">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={`flex justify-between items-center p-2 border-b ${
                  todo.completed ? "bg-green-100" : "bg-white"
                } transition`}>
                {editTodoId === todo.id ? (
                  <div className="flex-grow flex items-center">
                    <input
                      type="text"
                      value={editTodoText}
                      onChange={(e) => setEditTodoText(e.target.value)}
                      className="flex-grow p-2 border rounded"
                    />
                    <button
                      onClick={handleSaveEditTodo}
                      className="ml-2 bg-green-500 text-white p-2 rounded hover:bg-green-700">
                      Save
                    </button>
                  </div>
                ) : (
                  <div
                    className="flex-grow flex items-center cursor-pointer"
                    onClick={() => handleCompleteTodo(todo.id)}>
                    <span
                      className={`flex-grow ${
                        todo.completed ? "line-through text-green-600" : ""
                      }`}>
                      {todo.text}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditTodo(todo.id);
                      }}
                      className="ml-2 bg-yellow-500 text-white p-2 rounded hover:bg-yellow-700">
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTodo(todo.id);
                      }}
                      className="ml-2 bg-red-500 text-white p-2 rounded hover:bg-red-700">
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </main>
        <footer className="bg-gray-100 text-center py-4">
          <div className="flex justify-around">
            <p>Total: {totalTodos}</p>
            <p>Completed: {completedTodos}</p>
            <p>Deleted: {deletedTodosCount}</p>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default TodoApp;
