import React, { useState, useEffect } from "react";
import ArrayCodeSnippets from "./ArrayCodeSnippets"; 
import AIExplanation from "../AIExplanation";
import CodeDisplay from "../CodeDisplay";
import DataStructureControls from "../DataStructureControls";
import ArrayVisual from "./ArrayVisuals";
import Button from "../Button";
import HistoryLog from "../HistoryLog";
import { explain } from "../../utils/api";
import SlidingTabs from "../SlidingTab";


const Array = () => {
  const [array, setArray] = useState([]);
  const [input, setInput] = useState("");
  const [explanation, setExplanation] = useState("");
  const [arraySize, setArraySize] = useState(10);
  const [language, setLanguage] = useState("Python");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [currentOperation, setCurrentOperation] = useState(null);
  const [insertIndex, setInsertIndex] = useState("");
  const [insertValue, setInsertValue] = useState("");
  const [removeIndex, setRemoveIndex] = useState("");
  const [accessIndex, setAccessIndex] = useState("");
  const [history, setHistory] = useState([]);
  const [activeView, setActiveView] = useState("explanation");

  const addHistory = (action, value = null, index = null) => {
    setHistory((prev) => [
      ...prev,
      { action, value, index },
    ]);
  };
  
  const itemWidth = Math.min(80, Math.floor(1000 / arraySize));

  const handleResize = (newSize) => {
    setArraySize(newSize);
    if (array.length > newSize) {
      setArray((prevArray) => prevArray.slice(0, newSize));
    }
  };

  useEffect(() => {
    if (currentOperation) {
      setCodeSnippet(ArrayCodeSnippets[language][currentOperation] || "");
    } else {
      setCodeSnippet("");
    }
  }, [language, currentOperation]);


  const handleAddToEnd = async () => {
    if (input === "") return;
    if (array.length >= arraySize) {
      setExplanation(`Array is full (max size: ${arraySize})`);
      return;
    }
    const newArray = [...array, input];
    setArray(newArray);
    setInput("");
    setCurrentOperation("append");
    addHistory("Insert at end", input);
    await explainStep("append", input, array);
  };

  const handleAddAtIndex = async () => {
  
    // Check for empty input
    if (insertValue.trim() === "") {
      await explainStep("insert", null, array, {
        insertIndex,
        error: "No value provided",
        arrayLength: array.length,
        maxSize: arraySize,
      });
      return;
    }
  
    // Validate index
    if (isNaN(insertIndex) || insertIndex < 0 || insertIndex > array.length) {
      await explainStep("insert", insertValue, array, {
        insertIndex,
        error: "Invalid index",
        arrayLength: array.length,
        maxSize: arraySize,
      });
      return;
    }
  
    if (array.length >= arraySize) {
      await explainStep("insert", insertValue, array, {
        insertIndex,
        error: "Array is full",
        arrayLength: array.length,
        maxSize: arraySize,
      });
      return;
    }
  
    // Proceed with insertion
    const newArray = [...array];
    newArray.splice(insertIndex, 0, insertValue);
    setArray(newArray);
    setInput("");
    setInsertIndex("");
    setCurrentOperation("insert");
    addHistory("Insert at index", insertValue, insertIndex);
    await explainStep("insert", insertValue, newArray, {
      insertIndex,
      arrayLength: newArray.length,
      maxSize: arraySize,
    });
  };
  
  const handleRemoveAtIndex = async () => {
    if (removeIndex.trim() === "") {
      await explainStep("remove", null, array, {
        removeIndex,
        error: "No value provided",
        arrayLength: array.length,
        maxSize: arraySize,
      });
      return;
    }

    if (isNaN(removeIndex) || removeIndex < 0 || removeIndex >= array.length){
      await explainStep("remove", array, {
        removeIndex,
        error: "Invalid index",
        arrayLength: array.length,
        maxSize: arraySize,
      });
      return;
    }
    const value = array[removeIndex];
    const newArray = [...array];
    newArray.splice(removeIndex, 1);
    setArray(newArray);
    setCurrentOperation("remove");
    addHistory("Remove at index", value, removeIndex);
    await explainStep("remove", value, array,
    {
      removeIndex,
      arrayLength: array.length,
      maxSize: arraySize,
    });
    return;
  };

  const handleAccess = async () => {
    if (isNaN(accessIndex) || accessIndex < 0 || accessIndex >= array.length){
      await explainStep("access", array, {
        accessIndex,
        error: "Invalid index",
        arrayLength: array.length,
        maxSize: arraySize,
      });
      return;
    }
    const value = array[accessIndex];
    setCurrentOperation("access");
    addHistory("Access at index", value, accessIndex);
    await explainStep("access", accessIndex, array);
    return;
  };

  const handleClear = async () => {
    setArray([]);
    setCurrentOperation("clear");
    addHistory("Clear array");
    await explainStep("clear", null, array
    );
  };


  //not used
  const handleTop = async () => {
    if (array.length === 0) {
      await explainStep("top", null, array);
      setCodeSnippet("");
      setCurrentOperation("top");
    } else {
      const topValue = array[array.length - 1];
      setCurrentOperation("top"); 
      await explainStep("top", topValue, array);
    }
  };

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

  const explainStep = async (action, value, updatedArray, extra = {}) => {
    try {
      const data = await explain(
        [
          {
            action,
            value,
            updatedArray,
            ...extra,
          },
        ], // steps
        "array",      // structure
        updatedArray  // currentState
      );
      setExplanation(data.explanation);
    } catch (error) {
      console.error("Failed to get AI explanation:", error);
      setExplanation("Failed to fetch explanation.");
    }
  };

  const tabs = [
    { key: "explanation", label: "AI Explanation" },
    { key: "code", label: "Code" },
    { key: "history", label: "History Log" },
    ];
  

  return (
    <div className="text-center my-8 mx-12 min-w-[800px]">
      <h2 className="text-center text-4xl font-semibold mb-4">Array</h2>
      <p className="text-md">
      Fixed-size, indexed structure – stores elements in contiguous memory for fast access by position.
      </p>
      <div className="flex gap-2 justify-center items-center px-2 py-3">
        <label htmlFor="arraySize">Set Array Size:</label>
        <input
          id="arraySize"
          type="number"
          min="1"
          max="50"
          value={arraySize}
          onChange={(e) => handleResize(Number(e.target.value))}
          className="border border-gray-300 rounded w-20 px-2 py-2 bg-[#fae0e4] text-black"
        />
      </div>
  
      <div className="mt-5">
        {/* Array Visual */}
        <ArrayVisual 
          array={array} 
          arraySize={arraySize} 
          itemWidth={itemWidth}
        />

        <div className="grid grid-cols-2 gap-6 my-8">
          {/*
          <div className="grid grid-cols-2 gap-3 my-8 min-h-[200px]">
            <AIExplanation 
                explanation={explanation}
            />
            <CodeDisplay 
                language={language}
                setLanguage={setLanguage}
                codeSnippet={codeSnippet}
            />
          </div>*/}


          {/* col 1 */}
            <div>
              <SlidingTabs
                tabs={tabs}
                activeTab={activeView}
                onChange={setActiveView}
              />
            

              <div className="h-full border border-black rounded-lg p-4 bg-black/25 shadow mt-4">
                {activeView === "explanation" && <AIExplanation explanation={explanation} />}
                {activeView === "code" && (
                <CodeDisplay
                  language={language}
                  setLanguage={setLanguage}
                  codeSnippet={codeSnippet}
                />
                )}
                {activeView === "history" && <HistoryLog history={history} />}
              </div>
            </div>

            {/* col 2 */}
            <div> 
              <DataStructureControls
                input={input}
                setInput={setInput}
                onPrimaryClick={handleAddToEnd}
                primaryLabel="Add to End"
                //onSecondaryClick={handleRemoveAtIndex}
                //secondaryLabel="Remove At Index"
                onClearClick={handleClear}
                size={arraySize}        
                onResize={handleResize}
                extraButtons={[
                  {
                    element: (
                      <div className="flex flex-col gap-4 items-center mb-2 ">
                        
                        <div className="flex gap-2 items-center">
                          <input
                            type="text"
                            placeholder="Value"
                            value={insertValue}
                            onChange={(e) => setInsertValue(e.target.value)}
                            className="border border-grey rounded w-24 px-2 py-3"
                          />
                          <input
                            type="number"
                            placeholder="Index"
                            value={insertIndex}
                            onChange={(e) => setInsertIndex(e.target.value)}
                            className="border border-grey rounded w-24 px-2 py-3"
                          />
                          <Button onClick={handleAddAtIndex}>Insert at Index</Button>
                        </div>

                        <div className="flex gap-2 items-center">
                          <input
                            type="number"
                            placeholder="Index"
                            value={removeIndex}
                            onChange={(e) => setRemoveIndex(e.target.value)}
                            className="border border-grey rounded w-24 px-2 py-3"
                          />
                          <Button onClick={handleRemoveAtIndex}>Remove at Index</Button>
                        </div>

                        <div className="flex gap-2 items-center">
                          <input
                            type="number"
                            placeholder="Index"
                            value={accessIndex}
                            onChange={(e) => setAccessIndex(e.target.value)}
                            className="border border-grey rounded w-24 px-2 py-3"
                          />
                          <Button onClick={handleAccess}>Access at Index</Button>
                        </div>

                      </div>
                    ),
                  }
                ]}
              /> 
            </div>   
        </div>
      </div>
    </div>
  );
};

export default Array;

