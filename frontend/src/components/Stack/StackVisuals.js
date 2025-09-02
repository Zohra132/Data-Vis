import React from "react";
import ZoomControls from "../ZoomControls";

const StackVisuals = ({ stack, stackSize, isFixedSize, currentOperation }) => {
  return (
    <ZoomControls>
    <div className="mt-20 flex flex-col items-center">
      {isFixedSize ? (
        <div className="grid grid-cols-2 justify-start ">
          <div className="relative border-2 border-dashed border-gray-300 w-34 flex flex-col-reverse justify-start p-1 rounded-md text-black">
            {[...Array(stackSize)].map((_, idx) => {
              const item = stack[idx];
              const isTop = idx === stack.length - 1;
              return (
                <div
                  key={idx}
                  className={`relative w-32 h-10 mb-1 border-2 rounded-sm flex items-center justify-center
                      ${item ? "bg-blue-100 border-gray-700" : "bg-white border-gray-200"}
                      `}
                >
                  <span className="absolute left-1 text-xs text-gray-500 px-1">#{idx}</span>
                  <span className="text-base font-bold">{item || ""}</span>
                  {currentOperation === "top" && isTop && (
                    <div className="absolute right-[-60px] text-sm text-black font-semibold">
                      ← Peek
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="flex justify-start mt-3">← Top</div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          {stack
            .slice()
            .reverse()
            .map((item, i) => {
              const originalIndex = stack.length - i - 1;
              const isTop = i === 0;
              return (
                <div className="grid grid-cols-2" key={i}>
                  <div className="flex justify-center relative w-32 h-10 p-2 mb-1 border-2 border-gray-700 bg-blue-100 flex items-center justify-center">
                    <span className="absolute left-1 text-xs text-gray-500 px-1">#{originalIndex}</span>
                    <span className="text-base font-bold">{item || ""}</span>
                    {currentOperation === "top" && isTop && (
                      <div className="absolute right-[-60px] text-sm text-black font-semibold">
                        ← Peek
                      </div>
                    )}
                  </div>
                  {/* <div>{i === 0 && <div className="mt-2 flex justify-start ml-3">← Top</div>}</div> */}
                </div>
              );
            })}
        </div>
      )}
    </div>
    </ZoomControls>
  );
};

export default StackVisuals;
