import React from "react";

function Header({ handleSave, handleClear }) {
  return (
    <header className="p-4 bg-gray-200 flex justify-between items-center">
      <h1 className="text-xl font-bold">Drawing Application</h1>
      <div>
        <button
          onClick={handleClear}
          className="mr-4 p-2 bg-red-500 text-white rounded">
          Clear
        </button>
        <button
          onClick={handleSave}
          className="p-2 bg-green-500 text-white rounded">
          Save
        </button>
      </div>
    </header>
  );
}

export default Header;
