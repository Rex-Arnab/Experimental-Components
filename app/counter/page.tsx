"use client";
import React, { useState } from "react";

const Counter = () => {
  // State to manage the count value
  const [count, setCount] = useState(0);

  // Increment the count
  const increment = () => {
    setCount(count + 1);
  };

  // Decrement the count
  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4">{count}</h1>
        <div className="flex justify-between">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
            onClick={decrement}>
            -
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 focus:outline-none"
            onClick={increment}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
