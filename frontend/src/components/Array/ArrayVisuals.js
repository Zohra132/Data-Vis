import React from "react";
import ZoomControls from "../ZoomControls";

const ArrayVisual = ({ array, arraySize, itemWidth = 80 }) => {
  return (
    <ZoomControls>
    <div className="flex justify-center my-[10%]">
        <div className="flex flex-row items-center justify-center w-full">
          <div className="relative border-2 border-dashed border-gray-300 flex flex-row p-2 rounded-md">
            {[...Array(arraySize)].map((_, idx) => {
              const item = array[idx];
              return (
                <div
                  key={idx}
                  style={{ width: `${itemWidth}px` }}
                  className={`relative h-10 mr-1 border-2 rounded-sm flex items-center justify-center
                    ${item ? "bg-green-100 border-gray-700" : "bg-white border-gray-200"}
                  `}
                >
                  <span className="absolute top-0 left-1 text-xs text-gray-500 px-1">#{idx}</span>
                  <span className="text-base font-bold">{item || ""}</span>
                </div>
              );
            })}
          </div>
        </div>
    </div>
    </ZoomControls>
  );
};

export default ArrayVisual;
