import React from "react";
import PropTypes from "prop-types";

const LessonBuilder = ({ content }) => {
  const renderContent = (item) => {
    switch (item.type) {
      case "paragraph":
        return <p className="mb-4 text-gray-700">{item.text}</p>;
      case "heading":
        return <h2 className="text-2xl font-bold mb-4">{item.text}</h2>;
      case "codeblock":
        return (
          <pre className="bg-gray-100 p-4 rounded mb-4">
            <code>{item.code}</code>
          </pre>
        );
      case "link":
        return (
          <a
            href={item.url}
            className="text-blue-500 underline mb-4"
            target="_blank"
            rel="noopener noreferrer">
            {item.text}
          </a>
        );
      case "image":
        return <img src={item.src} alt={item.alt} className="mb-4 rounded" />;
      case "video":
        return (
          <iframe
            src={item.src}
            title={item.title}
            className="w-full h-64 mb-4"
            frameBorder="0"
            allowFullScreen
          />
        );
      case "quiz":
        return (
          <div className="mb-4 p-4 border border-gray-300 rounded">
            <h3 className="font-semibold">{item.question}</h3>
            {item.options.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <input type="radio" name={item.question} value={option} />
                <label className="ml-2">{option}</label>
              </div>
            ))}
          </div>
        );
      case "divider":
        return <hr className="my-4 border-gray-300" />;
      default:
        return <p className="text-red-500">Error: Unsupported content type.</p>;
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      {content.map((item, index) => (
        <div key={index} className="content-item">
          {renderContent(item)}
        </div>
      ))}
    </div>
  );
};

LessonBuilder.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      text: PropTypes.string,
      code: PropTypes.string,
      url: PropTypes.string,
      src: PropTypes.string,
      alt: PropTypes.string,
      title: PropTypes.string,
      question: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired
};

export default LessonBuilder;
