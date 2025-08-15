import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const HeapVisuals = ({ heap, currentOperation, swappingIndices, insertedIndex }) => {
  const renderNode = (index) => {
    if (index >= heap.length) return null;
    const left = 2 * index + 1;
    const right = 2 * index + 2;

    const isInsertedNode = currentOperation === "insert" && index === insertedIndex && !swappingIndices.length;

    return (
      <div className="flex flex-col items-center">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={heap[index]} // safe even for duplicates
            layout
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`w-12 h-12 flex items-center justify-center rounded-full border-2 font-semibold shadow ${
              swappingIndices[0] === index
              ? "bg-green-300 border-green-500" // node being moved up
              : swappingIndices[1] === index
              ? "bg-yellow-300 border-yellow-500" // node being swapped with
              : insertedIndex === index
              ? "bg-green-300 border-green-500" // initial insert before any swap
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
    <motion.div
      layout
      className="p-4 border rounded-lg min-h-[300px] flex justify-center items-start"
    >
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
    </motion.div>
  );
};

export default HeapVisuals;
