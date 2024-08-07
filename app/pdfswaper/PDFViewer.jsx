import React, { useState, useEffect } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaExpand,
  FaCompress,
  FaSpinner,
  FaPrint
} from "react-icons/fa";

import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PDFViewer = ({ pdfFile }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const onLoadError = (error) => {
    setError(error.message);
    setLoading(false);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        setPageNumber((prev) => Math.max(prev - 1, 1));
      } else if (event.key === "ArrowRight") {
        setPageNumber((prev) => Math.min(prev + 1, numPages));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [numPages]);

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center bg-white`}>
      {loading && (
        <div className="flex items-center justify-center w-full h-full bg-gray-200 bg-opacity-75">
          <FaSpinner className="animate-spin text-2xl" />
        </div>
      )}
      {error && (
        <div className="flex items-center justify-center w-full h-full bg-red-200">
          <span className="text-red-500">{error}</span>
        </div>
      )}
      <section className="flex-1 w-full overflow-auto p-4">
        <Document
          file={pdfFile}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onLoadError}
          className="w-full flex justify-center">
          <Page pageNumber={pageNumber} scale={scale} />
        </Document>
      </section>
      <div className="w-full flex items-center justify-between p-4 bg-gray-800 text-white">
        <div className="flex items-center">
          <button
            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
            disabled={pageNumber <= 1}
            className="p-2 disabled:opacity-50"
            aria-label="Previous Page">
            <FaArrowLeft />
          </button>
          <span className="mx-2">{`Page ${pageNumber} of ${numPages || 1}`}</span>
          <button
            onClick={() =>
              setPageNumber((prev) => Math.min(prev + 1, numPages))
            }
            disabled={pageNumber >= numPages}
            className="p-2 disabled:opacity-50"
            aria-label="Next Page">
            <FaArrowRight />
          </button>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => setScale((prev) => Math.min(prev + 0.1, 2.0))}
            className="p-2"
            aria-label="Zoom In">
            Zoom In
          </button>
          <button
            onClick={() => setScale((prev) => Math.max(prev - 0.1, 0.5))}
            className="p-2"
            aria-label="Zoom Out">
            Zoom Out
          </button>
        </div>
        <div className="flex items-center">
          <button
            onClick={toggleFullscreen}
            className="p-2"
            aria-label="Toggle Fullscreen">
            {isFullscreen ? <FaCompress /> : <FaExpand />}
          </button>
          <button
            onClick={() => window.print()}
            className="p-2"
            aria-label="Print PDF">
            <FaPrint />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
