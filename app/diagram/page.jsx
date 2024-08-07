"use client";
import React, { useState, useRef, useEffect } from "react";

const InfiniteCanvas = () => {
  const [texts, setTexts] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedTextIndex, setDraggedTextIndex] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [editingIndex, setEditingIndex] = useState(null);
  const [newText, setNewText] = useState("");
  const [canvasPosition, setCanvasPosition] = useState({ x: 0, y: 0 });
  const [speed, setSpeed] = useState(1); // Initialize speed state
  const canvasRef = useRef(null);

  const handleDoubleClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left + canvasPosition.x;
    const y = e.clientY - rect.top + canvasPosition.y;

    // if double-clicked on a text, don't create a new text
    for (const text of texts) {
      if (
        x >= text.x &&
        x <= text.x + 200 &&
        y >= text.y &&
        y <= text.y + 100
      ) {
        return;
      }
    }

    const newTextObj = {
      id: Date.now(),
      x,
      y,
      content: "Double-click to edit"
    };
    setTexts([...texts, newTextObj]);
  };

  const handleMouseDown = (index, e) => {
    e.stopPropagation();
    if (index !== undefined) {
      setIsDragging(true);
      setDraggedTextIndex(index);
      const rect = canvasRef.current.getBoundingClientRect();
      setOffset({
        x: e.clientX - rect.left - texts[index].x,
        y: e.clientY - rect.top - texts[index].y
      });
    } else {
      setIsDragging(true);
      const rect = canvasRef.current.getBoundingClientRect();
      setOffset({
        x: e.clientX - rect.left - canvasPosition.x,
        y: e.clientY - rect.top - canvasPosition.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const rect = canvasRef.current.getBoundingClientRect();
      const deltaX = e.clientX - rect.left - offset.x;
      const deltaY = e.clientY - rect.top - offset.y;

      if (draggedTextIndex !== null) {
        const updatedTexts = [...texts];
        updatedTexts[draggedTextIndex] = {
          ...updatedTexts[draggedTextIndex],
          x: deltaX,
          y: deltaY
        };
        setTexts(updatedTexts);
      } else {
        setCanvasPosition({
          x: canvasPosition.x + deltaX * speed,
          y: canvasPosition.y + deltaY * speed
        });
        setOffset({
          x: offset.x + deltaX * (speed - 1),
          y: offset.y + deltaY * (speed - 1)
        });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedTextIndex(null);
  };

  const handleWheel = (e) => {
    setCanvasPosition({
      x: canvasPosition.x - e.deltaX * speed,
      y: canvasPosition.y - e.deltaY * speed
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.addEventListener("wheel", handleWheel);

    return () => {
      canvas.removeEventListener("wheel", handleWheel);
    };
  }, [canvasPosition, speed]);

  const handleEditText = (index) => {
    setEditingIndex(index);
    setNewText(texts[index].content);
  };

  const handleSaveText = (index) => {
    const updatedTexts = [...texts];
    updatedTexts[index].content = newText;
    setTexts(updatedTexts);
    setEditingIndex(null);
    setNewText("");
  };

  const handleClearCanvas = () => {
    setTexts([]);
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-gray-100"
      onDoubleClick={handleDoubleClick}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseDown={(e) => handleMouseDown(undefined, e)}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.5) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          transform: `translate(${canvasPosition.x}px, ${canvasPosition.y}px)`
        }}
      />
      {texts.map((text, index) => (
        <div
          key={text.id}
          className="absolute bg-blue-200 border border-blue-400 p-2 rounded shadow-lg"
          style={{
            left: text.x + canvasPosition.x,
            top: text.y + canvasPosition.y
          }}
          onMouseDown={(e) => handleMouseDown(index, e)}
          onDoubleClick={() => handleEditText(index)}>
          {editingIndex === index ? (
            <input
              type="text"
              value={newText}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => setNewText(e.target.value)}
              onBlur={() => handleSaveText(index)}
              className="border-none outline-none"
              autoFocus
            />
          ) : (
            text.content
          )}
        </div>
      ))}
      <button
        onClick={handleClearCanvas}
        className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded shadow">
        Clear Canvas
      </button>

      {/* add Heading on top of the page */}
      <h1 className="text-2xl font-bold text-center p-4 bg-white shadow">
        Infinite Canvas
      </h1>
    </div>
  );
};

export default InfiniteCanvas;
