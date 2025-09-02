import React from "react";
import { motion } from "framer-motion";

const BubbleSortVisuals = ({ array, currentIndices, sortedBoundary }) => {
  return (
    <div className="flex justify-center gap-2 mt-6">
      {array.map((value, index) => {
        const isComparing = currentIndices.includes(index);
        const isSorted = index >= sortedBoundary;

        return (
          <motion.div
            key={index}
            animate={{
              backgroundColor: isComparing
                ? "#FACC15" // yellow
                : isSorted
                ? "#4ADE80" // green
                : "#FFFFFF",
              scale: isComparing ? 1.2 : 1,
            }}
            transition={{ duration: 0.3 }}
            className="w-12 h-12 flex items-center justify-center rounded-md border-2 border-gray-400 shadow font-semibold text-black"
          >
            {value}
          </motion.div>
        );
      })}
    </div>
  );
};

export default BubbleSortVisuals;
