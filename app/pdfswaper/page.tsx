"use client";

import React from "react";
import PDFViewer from "./PDFViewer";

const App = () => {
  return (
    <div className="App">
      <h1 className="text-center text-2xl font-bold my-4">PDF Swapper</h1>
      <PDFViewer pdfFile="https://media.licdn.com/dms/document/media/D561FAQGdjUAI81ogFw/feedshare-document-pdf-analyzed/0/1721398165557?e=1722470400&v=beta&t=aTzxNEJcq8joAdjUkEUAodNLG9-VuazHDvKUltM7gO4" />
    </div>
  );
};

export default App;
