import React from "react";
import Button from "./Button";

const DataStructureControls = ({
  input,
  setInput,
  onPrimaryClick,
  primaryLabel,
  onSecondaryClick,
  secondaryLabel,
  onClearClick,
  onPeekClick,
  isFixedSize,
  setIsFixedSize,
  size,
  onResize,
  extraButtons,
  showSizeControls = true,
}) => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center border border-grey shadow-md rounded-lg p-6 inline-block place-items-center gap-5 w-full ">
        <h1 className="font-bold mb-5">Controls</h1>
        

         <div className="flex justify-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder=" Enter value"
            className="border border-grey rounded w-30"
          />
          <div className="flex justify-end">
            <Button onClick={onPrimaryClick}>{primaryLabel}</Button>
          </div>
        </div>

        {onSecondaryClick && <Button onClick={onSecondaryClick}>{secondaryLabel}</Button>}
        {onClearClick && <Button onClick={onClearClick}>Clear</Button>}
        {onPeekClick && <Button onClick={onPeekClick}>Peek</Button>}



        {extraButtons?.map((btn, idx) => (
          <div key={idx}>
            {btn.element ? btn.element : (
              <Button onClick={btn.onClick}>{btn.label}</Button>
            )}
          </div>
        ))}

      </div>
    </div>
  );
};

export default DataStructureControls;
