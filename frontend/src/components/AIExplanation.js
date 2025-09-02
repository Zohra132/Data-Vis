import React from "react";

const AIExplanation = ({ explanation }) => {
  return (
    <div className="pt-4 border border-black bg-black/25 shadow-md rounded-xl">
      <h4 className="font-semibold text-white">AI Explanation</h4>
      <p className="p-2 text-sm lg:text-base lg:p-6">{explanation}</p>
    </div>
  );
};

export default AIExplanation;
