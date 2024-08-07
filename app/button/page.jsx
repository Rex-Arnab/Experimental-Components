"use client";
import React from "react";
import Button from "./Button";
import { FaBeer } from "react-icons/fa";

const App = () => {
  const [loading, setLoading] = React.useState(false);
  const handleClick = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Button label="Default Button" onClick={handleClick} variant="default" />
      <Button
        label="Loading Button"
        onClick={handleClick}
        variant="outline"
        loading={loading}
        customStyles="mt-4"
      />
      <Button
        label="Icon Button"
        onClick={handleClick}
        variant="ghost"
        icon={FaBeer}
        customStyles="mt-4"
      />
      <Button
        label="Custom Style Button"
        onClick={handleClick}
        customStyles="mt-4 bg-green-500 text-white hover:bg-green-600"
        size="large"
      />
    </div>
  );
};

export default App;
