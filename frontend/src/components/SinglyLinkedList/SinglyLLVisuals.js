import React from "react";
import ZoomControls from "../ZoomControls";

const SinglyLLVisual = ({ list = [], listSize, itemWidth = 80, showTail }) => {
  return (
    <ZoomControls>
    <div className="flex justify-center my-[10%]">
      <div className="flex flex-row items-center justify-center relative ">
        {list.map((item, idx) => (
          <React.Fragment key={idx}>
            <div className="relative flex flex-col items-center mr-1">
              {idx === 0 && (
                <div className="flex flex-row items-center mb-1">
                  <div className="bg-green-200 text-green-800 px-2 rounded-md font-semibold text-xs">
                    Head
                  </div>
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-4-4l4 4-4 4" />
                </svg>
                </div>
              )}
            </div>

          </React.Fragment>
        ))}


        {list.map((item, idx) => (
          <React.Fragment key={idx}>
            <div className="relative flex flex-col items-center mr-1">
              <div className="flex flex-row">
                <div className="w-20 h-10 p-2 border-2 border-gray-700 bg-green-100 flex items-center justify-center relative">
                  <span className="absolute top-0 left-1 text-xs text-gray-500 px-1">#{idx}</span>
                  <span className="text-black font-bold">{item}</span>
                </div>
                <div className="w-8 h-10 p-2 border-2 border-l-0 border-gray-700 bg-green-100 flex items-center justify-center relative text-black">
                  {idx == list.length - 1 && (
                    <div className="text-xs justify-center">null</div>
                  )}
                </div>
              </div>
            </div>

            {/* Add connector arrow except for last item */}
            {idx !== list.length - 1 && (
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-4-4l4 4-4 4" />
                </svg>
              </div>
            )}

          </React.Fragment>
          ))}

          {showTail && list.length >0 && (
            <div className="flex flex-row items-center mb-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m4 4l-4-4 4-4" />
            </svg>

            <div className="bg-green-200 text-green-800 px-2 rounded-md font-semibold text-xs ">
              Tail
            </div>

          </div>
            
          )}

      </div>
      
    </div>
    </ZoomControls>
  );
};

export default SinglyLLVisual;
