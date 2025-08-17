import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ZoomControls = ({ children }) => {
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);

  const zoomIn = () => setScale((s) => Math.min(s + 0.2, 2));   
  const zoomOut = () => setScale((s) => Math.max(s - 0.2, 0.5)); 
  const resetZoom = () => setScale(1);

    {/*Zoom in and out with keyboard*/}
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "+" || e.key === "=") {
        zoomIn();
      } else if (e.key === "-") {
        zoomOut();
      } else if (e.key === "0") {
        resetZoom();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);


  return (
    <div className="relative w-full border rounded-lg overflow-hidden">
      <div className="absolute top-2 right-2 flex gap-2 z-10">
        <button onClick={zoomIn} className="px-2 py-1 bg-gray-200 rounded shadow">
          +
        </button>
        <button onClick={zoomOut} className="px-2 py-1 bg-gray-200 rounded shadow">
          -
        </button>
        <button onClick={resetZoom} className="px-2 py-1 bg-gray-200 rounded shadow">
          Reset
        </button>
      </div>

      {/* Zoomable + pannable diagram */}
      <motion.div
        className="w-full h-full flex justify-center items-start"
        drag
        dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }}
        dragElastic={0.2}
        animate={{ scale }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ZoomControls;