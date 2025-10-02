import React from "react";
import ZoomControls from "../ZoomControls";

const QueueVisual = ({ queue, queueSize, isFixedSize, itemWidth = 80 }) => {
  return (
    <ZoomControls>
    <div className="flex justify-center my-16">
      {isFixedSize ? (
        <div className="flex flex-row items-center justify-center w-full">
          <div className="text-sm font-semibold mr-3 mt-4">Front</div>
          <div className="relative border-2 border-dashed border-gray-300 flex flex-row p-2 rounded-md text-black">
            {[...Array(queueSize)].map((_, idx) => {
              const item = queue[idx];
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
          <div className="text-sm font-semibold ml-3 mt-4">Rear</div>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-center my text-black">
          {queue.map((item, idx) => (
            <div
              key={idx}
              className="relative w-20 h-10 mr-1 p-2 border-2 border-gray-700 bg-green-100 flex items-center justify-center"
            >
              <span className="absolute top-0 left-1 text-xs text-gray-500 px-1">#{idx}</span>
              <span className="text-base font-bold">{item}</span>
              {idx === 0 && <div className="absolute -top-5 text-xs">Front</div>}
              {idx === queue.length - 1 && <div className="absolute -bottom-5 text-xs">Rear</div>}
            </div>
          ))}
        </div>
      )}
    </div>
    </ZoomControls>
  );
};

export default QueueVisual;
