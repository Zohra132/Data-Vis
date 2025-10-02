import React, { useState } from "react";
import { quickSortStep } from "./QuickSortStep";
import QuickSortPassVisuals from "./QuickSortPassVisuals";
import QuickSortHistoryLog from "./QuickSortHistoryLog";

const QuickSort = () => {
  const [input, setInput] = useState("");
  const [rowsByDepth, setRowsByDepth] = useState({});
  const [history, setHistory] = useState([]);

  const addHistory = (action, indices = [], snapshot = []) => {
    console.log("📜 History event:", action, indices);   
    setHistory((prev) => [
      ...prev,
      { action, indices, arraySnapshot: [...snapshot] },
    ]);
  };

  const parseInputArray = (rawInput = "") => {
    return rawInput
      .split(",")
      .map((n) => n.trim())
      .filter((n) => n !== "")
      .map(Number)
      .filter((n) => !isNaN(n));
  };

  const startSort = async () => {
    const parsedArray = parseInputArray(input);
    if (parsedArray.length === 0) return;
    setHistory([]);
    
    setRowsByDepth([]);

    await quickSortStep(
      [...parsedArray],
      
      (snapshot) => {
        setRowsByDepth((prev) => {
          const updated = { ...prev };
          
          if (!updated[snapshot.depth]) {
            updated[snapshot.depth] = [];
          }
          updated[snapshot.depth].push(snapshot);
          return updated;
        });
      },
      (finalArr) => {
        console.log("Sort complete", finalArr);
      },
      addHistory
    );
  };


  return (
    <div className="text-center my-8 mx-12 min-w-[800px]">
      <h2 className="text-center text-4xl font-semibold mb-4">
        Quick Sort (Row View)
      </h2>
      <p className="text-md">
        A  Divde-and-Conquer sorting algorithm, that recursively sorts by selecting a pivot and partitioning the array into two subarrays, 
        around the pivot by placing the pivot into its correct position of the sorted array. 
         Pivot in <span className="text-blue-600 font-semibold">blue</span>, finalized in <span className="text-green-600 font-semibold">green</span>.
      </p>

      <div className="mt-6">
        <input
          type="text"
          placeholder="Insert values separated with commas"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border w-1/2 border-grey rounded px-2 py-3 text-black"
        />

        <button
          onClick={startSort}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow"
        >
          Start Sorting
        </button>
      </div>

      <div className="grid grid-cols-2 mt-6">
        {/* Column 1 */}
        <div className="mt-10 space-y-6">
          {Object.entries(rowsByDepth)
            .sort((a, b) => a[0] - b[0])
            .map(([depth, steps], rowIndex) => (
              <div key={rowIndex} className="flex flex-col justify-center gap-4">
                {steps.map((step, idx) => (
                  <QuickSortPassVisuals
                    key={idx}
                    array={step.array}
                    pivotIndices={step.pivotIndices || []}
                    finalized={step.finalized}
                    depth={depth}
                  />
                ))}
              </div>
            ))}
        </div>
        {/* Column 2 */}
        <div className="h-[600px] w-full overflow-y-auto mr-[40px]">
          <QuickSortHistoryLog history={history}/>
        </div>
      </div>         
    </div>
  );
};

export default QuickSort;
