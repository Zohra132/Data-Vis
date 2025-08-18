import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ZoomControls from "../ZoomControls";

const HeapVisuals = ({ heap, currentOperation, swappingIndices, insertedIndex }) => {
  const containerRef = useRef(null);
  const [positions, setPositions] = useState({});

  // After render, capture node positions for line drawing
  useEffect(() => {
    if (!containerRef.current) return;

    const newPositions = {};
    const nodes = containerRef.current.querySelectorAll("[data-heap-index]");
    nodes.forEach((node) => {
      const rect = node.getBoundingClientRect();
      const parentRect = containerRef.current.getBoundingClientRect();
      newPositions[node.dataset.heapIndex] = {
        x: rect.left + rect.width / 2 - parentRect.left,
        y: rect.top + rect.height / 2 - parentRect.top,
      };
    });
    setPositions(newPositions);
  }, [heap, swappingIndices, insertedIndex]);

  const renderNode = (index) => {
    if (index >= heap.length) return null;
    const left = 2 * index + 1;
    const right = 2 * index + 2;

    return (
      <div className="flex flex-col items-center">
        <AnimatePresence mode="popLayout">
          <motion.div
            data-heap-index={index}
            key={`${heap[index]}-${index}`}
            layout
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`w-12 h-6 lg:w-24 lg:h-12 flex items-center justify-center rounded-full border-2 font-semibold shadow
              ${
                swappingIndices[0] === index
                  ? "bg-green-300 border-green-500"
                  : swappingIndices[1] === index
                  ? "bg-yellow-300 border-yellow-500"
                  : insertedIndex === index
                  ? "bg-green-300 border-green-500"
                  : "bg-white border-gray-400"
              }`}
          >
            {heap[index]}
          </motion.div>
        </AnimatePresence>

        {(left < heap.length || right < heap.length) && (
          <div className="flex justify-center gap-6 mt-2">
            {renderNode(left)}
            {renderNode(right)}
          </div>
        )}
      </div>
    );
  };

  return (
    <ZoomControls>
      <div 
        ref={containerRef} 
        className="relative p-4 rounded-lg min-h-[300px] flex justify-center items-start"
      >

      <div className="relative z-10 w-full flex justify-center">
        {heap.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-500"
          >
            Heap is empty
          </motion.p>
        ) : (
          renderNode(0)
        )}
      </div>

        {/* SVG overlay for lines */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {Object.keys(positions).map((i) => {
            const left = 2 * i + 1;
            const right = 2 * i + 2;
            return (
              <React.Fragment key={i}>
                {positions[i] && positions[left] && (
                  <line
                    x1={positions[i].x}
                    y1={positions[i].y}
                    x2={positions[left].x}
                    y2={positions[left].y}
                    stroke="gray"
                    strokeWidth="2"
                  />
                )}
                {positions[i] && positions[right] && (
                  <line
                    x1={positions[i].x}
                    y1={positions[i].y}
                    x2={positions[right].x}
                    y2={positions[right].y}
                    stroke="gray"
                    strokeWidth="2"
                  />
                )}
              </React.Fragment>
            );
          })}
        </svg>

      </div>
    </ZoomControls>
  );
};

export default HeapVisuals;
