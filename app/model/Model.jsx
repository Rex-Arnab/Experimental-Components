import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const Modal = ({ isOpen, onClose, settings }) => {
  const [loading, setLoading] = useState(false);

  const handleAction = async (action) => {
    setLoading(true);
    try {
      if (action.apiUrl) {
        await axios.post(action.apiUrl, action.payload);
      }
      action.onSuccess && action.onSuccess();
      onClose();
    } catch (error) {
      console.error("Error performing action:", error);
      action.onError && action.onError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity duration-300">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 transform transition-transform duration-300 scale-100">
        <h2 id="modal-title" className="text-xl font-semibold mb-4">
          {settings.title}
        </h2>
        <div className="mb-4">{settings.content}</div>
        <div className="flex justify-end">
          {settings.actions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleAction(action)}
              className={`mr-2 px-4 py-2 rounded ${
                action.type === "primary"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
              disabled={loading}>
              {loading && action.loadingText
                ? action.loadingText
                : action.label}
            </button>
          ))}
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-red-500 text-white">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.node.isRequired,
    actions: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        type: PropTypes.oneOf(["primary", "secondary"]),
        apiUrl: PropTypes.string,
        payload: PropTypes.object,
        onSuccess: PropTypes.func,
        onError: PropTypes.func,
        loadingText: PropTypes.string
      })
    ).isRequired
  }).isRequired
};

export default Modal;
