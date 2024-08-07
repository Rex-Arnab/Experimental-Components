"use client";

import React, { useState } from "react";
import Modal from "./Model";
const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const modalSettings = {
    title: "Confirm Action",
    content: <p>Are you sure you want to proceed?</p>,
    actions: [
      {
        label: "Confirm",
        type: "primary",
        apiUrl: "/api/confirm", // Example API endpoint
        payload: { data: "example" },
        onSuccess: () => alert("Action confirmed!"),
        onError: (error) => alert("Error: " + error.message),
        loadingText: "Confirming..."
      },
      {
        label: "Cancel",
        type: "secondary"
      }
    ]
  };

  return (
    <div className="p-4">
      <button
        onClick={() => setModalOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded">
        Open Modal
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        settings={modalSettings}
      />
    </div>
  );
};

export default App;
