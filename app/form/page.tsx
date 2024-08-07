"use client";

import React from "react";
import FormBuilder from "./FormBuilder";

const App = () => {
  const formConfig = {
    title: "User Registration",
    fields: [
      { type: "text", name: "username", label: "Username", required: true },
      { type: "email", name: "email", label: "Email", required: true },
      { type: "password", name: "password", label: "Password", required: true },
      {
        type: "checkbox",
        name: "terms",
        label: "Accept Terms",
        required: true
      },
      {
        type: "select",
        name: "gender",
        label: "Gender",
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" }
        ]
      }
    ]
  };

  const handleFormSubmit = async (data) => {
    console.log("Form Data:", data);
    // You can make an API call here using axios
    // await axios.post('/api/submit', data);
  };

  return (
    <div className="p-4">
      <FormBuilder
        formConfig={formConfig}
        onSubmit={handleFormSubmit}
        customStyles="max-w-md mx-auto"
      />
    </div>
  );
};

export default App;
