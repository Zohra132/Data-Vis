import React from "react";


const LLStackVisuals = ({ stack }) => {
  return (

    <div className="mt-20 flex flex-col items-center">
      {stack.length === 0 ? (
        <div className="text-gray-500">Stack is empty</div>
      ) : (
        <div className="flex flex-col items-center">
          {stack
            .slice()
            .reverse()
            .map((node, idx) => {
              const originalIndex = stack.length - idx - 1;
              const isTop = idx === 0;
              return (
                <div className="flex flex-col items-center" key={idx}>
                  <div className="relative w-32 h-12 border-2 border-blue-600 bg-blue-100 rounded flex items-center justify-center">
                    <span className="absolute left-1 top-0 text-xs text-gray-600 px-1">#{originalIndex}</span>
                    <span className="text-base font-bold">{node.value}</span>
                  </div>
                  <div>
                    {idx < stack.length - 1 && (
                    <div className="w-0.5 h-6 bg-gray-500"></div>
                  )}
                  </div>
                </div>
              )
            }
          )}
          <div className="flex flex-col items-center mb-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m-7 7l7-7 7 7" />
            </svg>
              <div className="bg-green-200 text-green-800 px-2 rounded-md font-semibold text-xs ">
                Head
              </div>
          </div>
        </div>
      )}
    </div>

  );
};

export default LLStackVisuals;
