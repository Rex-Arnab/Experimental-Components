import React, { useEffect, useState, forwardRef } from "react";

const Canvas = forwardRef(({ selectedTool, toolOptions }, ref) => {
  const [drawing, setDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [canvasData, setCanvasData] = useState(null);

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext("2d");
    let currentColor = "#000";
    const offscreenCanvas = document.createElement("canvas");
    const offscreenContext = offscreenCanvas.getContext("2d");

    // Resize canvas while preserving content
    const resizeCanvas = () => {
      const box = canvas.getBoundingClientRect();
      const tempCanvas = document.createElement("canvas");
      const tempContext = tempCanvas.getContext("2d");

      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      tempContext.drawImage(canvas, 0, 0);

      canvas.width = box.width;
      canvas.height = box.height;

      context.drawImage(tempCanvas, 0, 0);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const saveCanvasData = () => {
      offscreenCanvas.width = canvas.width;
      offscreenCanvas.height = canvas.height;
      offscreenContext.drawImage(canvas, 0, 0);
    };

    const restoreCanvasData = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(offscreenCanvas, 0, 0);
    };

    // Drawing logic
    const startDrawing = (e) => {
      const { offsetX, offsetY } = e;
      setStartPos({ x: offsetX, y: offsetY });
      if (selectedTool === "pen" || selectedTool === "eraser") {
        context.beginPath();
        currentColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
        context.moveTo(offsetX, offsetY);
      } else {
        saveCanvasData();
      }
      setDrawing(true);
    };

    const draw = (e) => {
      if (!drawing) return;
      const { offsetX, offsetY } = e;

      if (selectedTool === "pen") {
        context.strokeStyle = currentColor;
        context.lineWidth = toolOptions.size;
        context.lineTo(offsetX, offsetY);
        context.stroke();
      } else if (selectedTool === "eraser") {
        context.strokeStyle = "#FFFFFF";
        context.lineWidth = toolOptions.size;
        context.lineTo(offsetX, offsetY);
        context.stroke();
      } else if (
        selectedTool === "rectangle" ||
        selectedTool === "circle" ||
        selectedTool === "arrow"
      ) {
        restoreCanvasData();
        drawShape(e);
      }
    };

    const drawShape = (e) => {
      const { offsetX, offsetY } = e;
      const width = offsetX - startPos.x;
      const height = offsetY - startPos.y;

      if (selectedTool === "rectangle") {
        context.strokeStyle = "#000";
        context.lineWidth = toolOptions.size;
        context.strokeRect(startPos.x, startPos.y, width, height);
      } else if (selectedTool === "circle") {
        context.beginPath();
        context.strokeStyle = "#000";
        context.lineWidth = toolOptions.size;
        context.arc(
          startPos.x,
          startPos.y,
          Math.sqrt(width * width + height * height),
          0,
          2 * Math.PI
        );
        context.stroke();
      } else if (selectedTool === "arrow") {
        context.beginPath();
        context.strokeStyle = "#000";
        context.lineWidth = 2;
        context.moveTo(startPos.x, startPos.y);
        context.lineTo(offsetX, offsetY);
        context.stroke();

        // Calculate the angle of the line
        let angle = Math.atan2(offsetY - startPos.y, offsetX - startPos.x);

        // Draw arrow head
        context.beginPath();
        context.moveTo(offsetX, offsetY);
        context.lineTo(
          offsetX - 10 * Math.cos(angle - Math.PI / 6),
          offsetY - 10 * Math.sin(angle - Math.PI / 6)
        );
        context.moveTo(offsetX, offsetY);
        context.lineTo(
          offsetX - 10 * Math.cos(angle + Math.PI / 6),
          offsetY - 10 * Math.sin(angle + Math.PI / 6)
        );
        context.stroke();
      }
    };

    const stopDrawing = (e) => {
      if (selectedTool === "pen" || selectedTool === "eraser") {
        if (drawing) context.closePath();
      } else if (
        selectedTool === "rectangle" ||
        selectedTool === "circle" ||
        selectedTool === "arrow"
      ) {
        restoreCanvasData();
        drawShape(e);
      }
      setDrawing(false);
      currentColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    };

    const outofCanvas = () => {
      if (drawing) context.closePath();
      setDrawing(false);
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", outofCanvas);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseout", outofCanvas);
    };
  }, [drawing, selectedTool, toolOptions, ref]);

  return <canvas ref={ref} className="flex-1" />;
});

Canvas.displayName = "Canvas";

export default Canvas;
