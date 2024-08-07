import React from 'react';

function ToolOptions({ selectedTool, toolOptions, setToolOptions }) {
  const handleSizeChange = (e) => {
    setToolOptions({ ...toolOptions, size: e.target.value });
  };

  const handleColorChange = (e) => {
    setToolOptions({ ...toolOptions, color: e.target.value });
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-md">
      {selectedTool === 'pen' && (
        <div className="mb-4">
          <label className="block mb-2">Pen Size</label>
          <input
            type="range"
            min="1"
            max="10"
            value={toolOptions.size}
            onChange={handleSizeChange}
            className="w-full"
          />
        </div>
      )}
      <div className="mb-4">
        <label className="block mb-2">Color</label>
        <input
          type="color"
          value={toolOptions.color}
          onChange={handleColorChange}
          className="w-full"
        />
      </div>
    </div>
  );
}

export default ToolOptions;import React from 'react';

function ToolOptions({ selectedTool, toolOptions, setToolOptions }) {
  const handleSizeChange = (e) => {
    setToolOptions({ ...toolOptions, size: e.target.value });
  };

  const handleColorChange = (e) => {
    setToolOptions({ ...toolOptions, color: e.target.value });
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-md">
      {selectedTool === 'pen' && (
        <div className="mb-4">
          <label className="block mb-2">Pen Size</label>
          <input
            type="range"
            min="1"
            max="10"
            value={toolOptions.size}
            onChange={handleSizeChange}
            className="w-full"
          />
        </div>
      )}
      <div className="mb-4">
        <label className="block mb-2">Color</label>
        <input
          type="color"
          value={toolOptions.color}
          onChange={handleColorChange}
          className="w-full"
        />
      </div>
    </div>
  );
}

export default ToolOptions;