import React, { useState } from "react";
import BubbleSortVisuals from "./BubbleSortVisuals";
import { bubbleSortStep } from "./BubbleSortLogic";
import BubbleSortHistoryLog from "./BubbleSortHistoryLog";

const BubbleSort = () => {
  const [input, setInput] = useState("");
  const [array, setArray] = useState([]);
  const [currentIndices, setCurrentIndices] = useState([]);
  const [sortedBoundary, setSortedBoundary] = useState(0);
  const [history, setHistory] = useState([]);
  const [sortedRows, setSortedRows] = useState([]);

  const addHistory = (action, indices = [], arraySnapshot = []) => {
    setHistory((prev) => [
      ...prev,
      { action, indices, arraySnapshot: [...arraySnapshot] },
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

    setArray(parsedArray);
    setSortedBoundary(parsedArray.length);
    setHistory([]);
    setSortedRows([[...parsedArray]]); //Initial row

    await bubbleSortStep(
      [...parsedArray],
      (arr, indices, boundary) => {
        setArray([...arr]);
        setCurrentIndices(indices);
        setSortedBoundary(boundary);

        setSortedRows((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = [...arr];
          return copy;
        });
      },
      (arr, passIndex) => {
        //Create new row after each pass
        setSortedRows((prev) => [...prev, [...arr]]);
      },
      (arr) => {
        setArray([...arr]);
        setCurrentIndices([]);
        setSortedBoundary(0);
      },
      addHistory //pass addHistory callback
    );
  };


  return (
    <div className="grid grid-cols-2 gap-6 mt-10">
      <div className="text-center">
        <h2 className="text-3xl font-semibold mb-4">Bubble Sort</h2>
        <input
          type="text"
          placeholder="Insert values separated with commas"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border w-1/2 border-grey rounded px-2 py-3 text-black"
        />
        <div className="space-y-4 mt-6">
          {sortedRows.map((row, i) => (
            <BubbleSortVisuals
              key={i}
              array={row}
              currentIndices={i === sortedRows.length - 1 ? currentIndices : []}
              sortedBoundary={i === sortedRows.length - 1 ? sortedBoundary : row.length - i}
            />
          ))}
        </div>
        <button
          onClick={startSort}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg shadow"
        >
          Start Sorting
        </button>
      </div>

      <div className="h-[600px] overflow-y-auto p-3 mr-[40px]">
        <BubbleSortHistoryLog history={history}/>
      </div>
    </div>
  );
};

export default BubbleSort;
