import React from "react";
import ZoomControls from "../ZoomControls";

const ListVisual = ({ list, listSize, itemWidth = 80 }) => {
  return (
    <ZoomControls>
    <div className="flex justify-center my-[10%]">
        <div className="flex flex-row items-center justify-center my">
          {list.map((item, idx) => (
            <div
              key={idx}
              className="relative w-20 h-10 mr-1 p-2 border-2 border-gray-700 bg-green-100 flex items-center justify-center"
            >
              <span className="absolute top-0 left-1 text-xs text-gray-500 px-1">#{idx}</span>
              <span className="text-base font-bold">{item}</span>
            </div>
          ))}
        </div>
    </div>
    </ZoomControls>
  );
};

export default ListVisual;
