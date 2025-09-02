import React, { useState, useEffect } from "react";
import ListCodeSnippets from "./ListCodeSnippets"; 
import AIExplanation from "../AIExplanation";
import CodeDisplay from "../CodeDisplay";
import DataStructureControls from "../DataStructureControls";
import ListVisual from "./ListVisuals";
import Button from "../Button";
import { explain } from "../../utils/api";


const List = () => {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");
  const [explanation, setExplanation] = useState("");
  const [listSize, setListSize] = useState(10);
  const [language, setLanguage] = useState("Python");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [currentOperation, setCurrentOperation] = useState(null);
  const [insertIndex, setInsertIndex] = useState("");
  const [insertValue, setInsertValue] = useState("");
  const [removeIndex, setRemoveIndex] = useState("");
  const [accessIndex, setAccessIndex] = useState("");




  const itemWidth = Math.min(80, Math.floor(1000 / listSize));

  const handleResize = (newSize) => {
    setListSize(newSize);
    if (list.length > newSize) {
      setList((prevList) => prevList.slice(0, newSize));
    }
  };

  useEffect(() => {
    if (currentOperation) {
      setCodeSnippet(ListCodeSnippets[language][currentOperation] || "");
    } else {
      setCodeSnippet("");
    }
  }, [language, currentOperation]);


  const handleAddToEnd = async () => {
    if (input === "") return;
    const newList = [...list, input];
    setList(newList);
    setInput("");
    setCurrentOperation("append");
    await explainStep("append", input, list);
  };

  const handleAddAtIndex = async () => {
  
    // Check for empty input
    if (insertValue.trim() === "") {
      await explainStep("insert", null, list, {
        insertIndex,
        error: "No value provided",
        listLength: list.length,
        maxSize: listSize,
      });
      return;
    }
  
    // Validate index
    if (isNaN(insertIndex) || insertIndex < 0 || insertIndex > list.length) {
      await explainStep("insert", insertValue, list, {
        insertIndex,
        error: "Invalid index",
        listLength: list.length,
        maxSize: listSize,
      });
      return;
    }
  
  
    // Proceed with insertion
    const newList = [...list];
    newList.splice(insertIndex, 0, insertValue);
    setList(newList);
    setInput("");
    setInsertIndex("");
    setCurrentOperation("insert");
  
    await explainStep("insert", insertValue, list, {
      insertIndex,
      listLength: newList.length,
    });
  };
  
  

  const handleRemoveAtIndex = async () => {
    if (removeIndex.trim() === "") {
      await explainStep("remove", null, list, {
        removeIndex,
        error: "No value provided",
        listLength: list.length,
      });
      return;
    }

    if (isNaN(removeIndex) || removeIndex < 0 || removeIndex >= list.length){
      await explainStep("remove", list, {
        removeIndex,
        error: "Invalid index",
        listyLength: list.length,
      });
      return;
    }
    const value = list[removeIndex];
    const newList = [...list];
    newList.splice(removeIndex, 1);
    setList(newList);
    setCurrentOperation("remove");
    await explainStep("remove", value, list,
    {
      removeIndex,
      listLength: list.length,
      maxSize: listSize,
    });
    return;
  };

  const handleAccess = async () => {
    if (isNaN(accessIndex) || accessIndex < 0 || accessIndex >= list.length){
      await explainStep("access", list, {
        accessIndex,
        error: "Invalid index",
        listLength: list.length,
        maxSize: listSize,
      });
      return;
    }
    const value = list[accessIndex];
    setCurrentOperation("access");
    await explainStep("access", accessIndex, list);
    return;
  };

  const handleClear = async () => {
    setList([]);
    setCurrentOperation("clear");
    await explainStep("clear", null, list
    );
  };

/*
  const explainStep = async (action, value, updatedList, extra = {}) => {
    const response = await fetch("http://localhost:3001/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        steps: [{ action, value, ...extra }],
        structure: "list",
        currentState: updatedList,
        listLength: updatedList.length,
        maxSize: listSize,
      }),
    });
  
    const data = await response.json();
    setExplanation(data.explanation);
  };
  */


  const explainStep = async (action, value, updatedList, extra = {}) => {
    try {
      const data = await explain(
        [
          {
            action,
            value,
            updatedList,
            ...extra,
          },
        ], // steps
        "list",      // structure
        updatedList,  // currentState
      );
      setExplanation(data.explanation);
    } catch (error) {
      console.error("Failed to get AI explanation:", error);
      setExplanation("Failed to fetch explanation.");
    }
  };

  return (
    <div className="text-center my-8 mx-12 min-w-[700px]">
      <h2 className="text-center text-5xl font-semibold mb-4">List</h2>
      <p className="text-lg">
      Fixed-size, indexed structure – stores elements in contiguous memory for fast access by position.
      </p>
  
      <div className="mt-5">
        {/* List Visual */}
        <ListVisual 
          list={list} 
          listSize={listSize} 
          itemWidth={itemWidth}
        />

        {/*  Exaplanation, code display and controls*/}
        <div>
          <div className="grid grid-cols-2 gap-3 my-8 min-h-[200px]">
            <AIExplanation 
                explanation={explanation}
            />
            <CodeDisplay 
                language={language}
                setLanguage={setLanguage}
                codeSnippet={codeSnippet}
            />
          </div>
          <DataStructureControls
            input={input}
            setInput={setInput}
            onPrimaryClick={handleAddToEnd}
            primaryLabel="Insert at End"
            //onSecondaryClick={handleRemoveAtIndex}
            //secondaryLabel="Remove At Index"
            onClearClick={handleClear}
            //onPeekClick={handleAccess}
            size={listSize}        
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
  );
};

export default List;

