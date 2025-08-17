import React, { useState, useEffect} from "react";
import HeapVisuals from "./HeapVisuals";
import HeapCodeSnippets from "./HeapCodeSnippets";
import AIExplanation from "../AIExplanation";
import CodeDisplay from "../CodeDisplay";
import DataStructureControls from "../DataStructureControls";

const Heap = () => {
  const [heapType, setHeapType] = useState("min");
  const [heap, setHeap] = useState([]);
  const [input, setInput] = useState("");
  const [explanation, setExplanation] = useState("");
  const [language, setLanguage] = useState("Python");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [currentOperation, setCurrentOperation] = useState(null);
  const [swappingIndices, setSwappingIndices] = useState([]);
  const [insertedIndex, setInsertedIndex] = useState(null);


  useEffect(() => {
    if (currentOperation) {
      setCodeSnippet(HeapCodeSnippets[language]?.[currentOperation] || "");
    } else {
      setCodeSnippet("");
    }
  }, [language, currentOperation]);

  const compare = (a, b) => {
    return heapType === "min" ? a < b : a > b;
  };


  const heapifyUp = async (arr, setHeap, delay=1000 ) => {
    let index = arr.length - 1;
    setHeap([...arr]);
    setInsertedIndex(index);
    await new Promise((r) => setTimeout(r, delay));
    setInsertedIndex(null);
    
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (compare(arr[index], arr[parentIndex])) {
        setSwappingIndices([parentIndex, index, ]);
        [arr[index], arr[parentIndex]] = [arr[parentIndex], arr[index]];
        setHeap([...arr]); // update visual
        await new Promise((r) => setTimeout(r, delay));
        index = parentIndex;
      } else break;
    }
    setSwappingIndices([]); 
    setInsertedIndex(null);
    return arr;
  };

  const heapifyDown = async (arr, setHeap, delay=1000 ) => {
    let index = 0;

    setHeap([...arr]);
    await new Promise((r) => setTimeout(r, delay));

    const length = arr.length;
    while (true) {
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      let swapIndex = index;

      if (left < length && compare(arr[left], arr[swapIndex])) {
        swapIndex = left;
      }
      if (right < length && compare(arr[right], arr[swapIndex])) {
        swapIndex = right;
      }
      if (swapIndex !== index) {
        setSwappingIndices([index, swapIndex]);
        [arr[index], arr[swapIndex]] = [arr[swapIndex], arr[index]];
        setHeap([...arr]); // update visual
        await new Promise((r) => setTimeout(r, delay));  
        index = swapIndex;
        setInsertedIndex(null);
      } else break;
    }
    setSwappingIndices([]); 
    return arr;
  };


  const handleInsert = async () => {
    if (input === "") return;
    if (isNaN(input)){
      await explainStep("insert", input, heap, {
        error: `Cannot insert "${input}" — only numeric values are allowed in the heap.`
      });
      return;
    }
    const newHeap = [...heap, Number(input)];
    setHeap(newHeap);
    setCurrentOperation("insert");
    await heapifyUp(newHeap, setHeap, 1000); // 1-second pause
    setInput("");
    await explainStep("insert", input, heap);
  };


  const handleExtract = async () => {
    if (heap.length === 0) return;
    const root = heap[0];
    const newHeap = [...heap];
    const end = newHeap.pop();
    if (newHeap.length > 0) {
      newHeap[0] = end;
      setHeap([...newHeap]);
      setCurrentOperation("extract");
      await heapifyDown(newHeap, setHeap, 1000); // 1-second pause
    } else {
      setHeap([]);
    }
    await explainStep("extract", root, heap);
  };

  const handleClear = async () => {
    setHeap([]);
    setCurrentOperation("clear");
    await explainStep("clear", null, heap);
  };

  const explainStep = async (action, value, updatedHeap) => {
    const response = await fetch("http://localhost:3001/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        steps: [{ action, value }],
        structure: `${heapType} heap`,
        currentState: updatedHeap,
      }),
    });

    const data = await response.json();
    setExplanation(data.explanation);
  };

  return (
    <div className="text-center my-8 mx-12 min-w-[700px]">
      <h2 className="text-center text-5xl font-semibold mb-4">
        {heapType === "min" ? "Min Heap" : "Max Heap"}
      </h2>
      <p className="text-lg">
        {heapType === "min"
          ? "The smallest element is always at the root."
          : "The largest element is always at the root."}
      </p>

      <button
        onClick={() => setHeapType(heapType === "min" ? "max" : "min")}
        className="px-4 py-2 bg-blue-500 text-white rounded mt-3"
      >
        Toggle to {heapType === "min" ? "Max Heap" : "Min Heap"}
      </button>

      <div className="grid grid-cols-2 mt-5 gap-6">
        <HeapVisuals
          heap={heap}
          currentOperation={currentOperation}
          swappingIndices={swappingIndices}
          insertedIndex={insertedIndex}
        />
        <div>
          <div className="grid grid-cols-2 gap-3 mb-8 min-h-[200px]">
            <AIExplanation explanation={explanation} />
            <CodeDisplay
              language={language}
              setLanguage={setLanguage}
              codeSnippet={codeSnippet}
            />
          </div>
          <div className="flex justify-center">
            <DataStructureControls
              input={input}
              setInput={setInput}
              onPrimaryClick={handleInsert}
              primaryLabel="Insert"
              onSecondaryClick={handleExtract}
              secondaryLabel="Extract Root"
              onClearClick={handleClear}
              hideSizeControl={true}
              hideFixedToggle={true}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Heap;
