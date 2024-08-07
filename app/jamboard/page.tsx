"use client";

import React, { useRef, useState } from "react";
import Header from "./Components/Header";
import Toolbar from "./Components/Toolbar";
import Canvas from "./Components/Canvas";

function App() {
  const [selectedTool, setSelectedTool] = useState("pen");
  const [toolOptions, setToolOptions] = useState({
    size: 5,
    color: "#000000",
    imageSrc: ""
  });
  const canvasRef = useRef(null);

  const handleSave = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSetImage = (imageSrc) => {
    setToolOptions((prevOptions) => ({ ...prevOptions, imageSrc }));
  };

  const handleSetFillColor = (color) => {
    setToolOptions((prevOptions) => ({ ...prevOptions, color }));
  };

  return (
    <div className="flex flex-col h-screen">
      <Header handleSave={handleSave} handleClear={handleClear} />
      <div className="flex flex-1">
        <Toolbar
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
        />
        <Canvas
          selectedTool={selectedTool}
          toolOptions={toolOptions}
          ref={canvasRef}
        />
      </div>
    </div>
  );
}

export default App;
