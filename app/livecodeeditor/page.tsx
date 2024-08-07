"use client";

import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

const LiveCodeEditor = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <div className="container">
      <div className="pane top-pane">
        <div className="pane output">
          <iframe
            srcDoc={srcDoc}
            title="Output"
            sandbox="allow-scripts"
            frameBorder="0"
            width="100%"
            height="100%"
          />
        </div>
        <div className="grid grid-cols-3 code">
          <div className="editor">
            <h3>HTML</h3>
            <AceEditor
              mode="html"
              theme="monokai"
              onChange={(value) => setHtml(value)}
              name="html-editor"
              editorProps={{ $blockScrolling: true }}
              width="100%"
              height="200px"
              value={html}
            />
          </div>
          <div className="editor">
            <h3>CSS</h3>
            <AceEditor
              mode="css"
              theme="monokai"
              onChange={(value) => setCss(value)}
              name="css-editor"
              editorProps={{ $blockScrolling: true }}
              width="100%"
              height="200px"
              value={css}
            />
          </div>
          <div className="editor">
            <h3>JavaScript</h3>
            <AceEditor
              mode="javascript"
              theme="monokai"
              onChange={(value) => setJs(value)}
              name="js-editor"
              editorProps={{ $blockScrolling: true }}
              width="100%"
              height="200px"
              value={js}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveCodeEditor;
