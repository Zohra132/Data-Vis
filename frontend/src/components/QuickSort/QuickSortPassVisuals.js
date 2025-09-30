import React from "react";
import { motion } from "framer-motion";

const QuickSortPassVisuals = ({ array, pivotIndices = [], finalized, depth}) => {
  return (
    <div className="flex justify-center gap-2 mt-6">
      <p> {depth} </p>
      {array.map((value, index) => {
        const isPivot = pivotIndices.includes(index);
        const isSorted = finalized.includes(index);

        return (
          <motion.div
            key={index}
            animate={{
              scale: isPivot ? 1.15 : 1,
            }}
            whileHover={{
              backgroundColor: isPivot ? "#358bed" : undefined,
            }}
            transition={{ duration: 0.05 }}
            className={`w-12 h-12 flex items-center justify-center rounded-md border-2  ${
              isPivot
                ? "bg-[#71b0f8] border-blue-600 "
                : isSorted
                ? "bg-[#4ADE80] border-green-600"
                : "bg-[#FFFFFF] border-gray-400"
            } shadow font-semibold text-black`}
          >
            {value}

            {/* Hover text */}
            {isPivot && (
              <span className="absolute opacity-0 hover:opacity-100 text-white text-xs transition-opacity duration-300">
                Pivot
              </span>
            )}
            
          </motion.div>
        );
      })}
    </div>
  );
};

export default QuickSortPassVisuals;
