import React from "react";

const tools = [
  { id: "pen", name: "Pen", icon: "✒️" },
  { id: "eraser", name: "Eraser", icon: "🩹" },
  { id: "rectangle", name: "Rectangle", icon: "⬛" },
  { id: "circle", name: "Circle", icon: "⚫" },
  { id: "arrow", name: "Arrow", icon: "➡️" },
  { id: "image", name: "Insert Image", icon: "🖼️" },
  { id: "fill", name: "Fill Color", icon: "🎨" },
  { id: "hand", name: "Hand", icon: "✋" }
];

function Toolbar({ selectedTool, setSelectedTool }) {
  return (
    <div className="flex flex-col p-4 bg-gray-100 w-24 border-r">
      {tools.map((tool) => (
        <button
          key={tool.id}
          onClick={() => setSelectedTool(tool.id)}
          className={`mb-4 p-2 bg-white rounded focus:outline-none ${selectedTool === tool.id ? "border-2 border-blue-500" : ""}`}>
          <span>{tool.icon}</span>
          <p className="text-xs">{tool.name}</p>
        </button>
      ))}
    </div>
  );
}

export default Toolbar;
