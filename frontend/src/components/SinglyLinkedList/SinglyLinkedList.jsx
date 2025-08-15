import React, { useState, useEffect } from "react";
import SinglyLLCodeSnippets from "./SinglyLLCodeSnippets"; 
import AIExplanation from "../AIExplanation";
import CodeDisplay from "../CodeDisplay";
import DataStructureControls from "../DataStructureControls";
import SinglyLLVisual from "./SinglyLLVisuals";
import Button from "../Button";


const SinglyLinkedList = () => {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");
  const [explanation, setExplanation] = useState("");
  const [listSize, setListSize] = useState(10);
  const [language, setLanguage] = useState("Python");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [currentOperation, setCurrentOperation] = useState(null);
  const [insertFrontValue, setInsertFrontValue] = useState("");
  const [insertIndex, setInsertIndex] = useState("");
  const [insertValue, setInsertValue] = useState("");
  const [removeEndValue, setRemoveEndValue] = useState("");
  const [removeIndex, setRemoveIndex] = useState("");
  const [removeFrontValue, setRemoveFrontValue] = useState("");
  const [showTail, setShowTail] = useState(false);




  const itemWidth = Math.min(80, Math.floor(1000 / listSize));

  {/*
  const handleResize = (newSize) => {
    setListSize(newSize);
    if (list.length > newSize) {
      setList((prevList) => prevList.slice(0, newSize));
    }
  };
*/}

  useEffect(() => {
    if (currentOperation) {
      setCodeSnippet(SinglyLLCodeSnippets[language][currentOperation] || "");
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

  const handleAddAtFront = async () => {
    if (insertFrontValue === "") return;
    const newList = [insertFrontValue, ...list];
    setList(newList);
    setInput("");
    setCurrentOperation("append");
    await explainStep("append", insertFrontValue, list);
  };
  
  const handleAddAtIndex = async () => {
    if (insertValue.trim() === "") {
      await explainStep("insert", null, list, {
        insertIndex,
        error: "No value provided",
        listLength: list.length,
      });
      return;
    }
  
    // Validate index
    if (isNaN(insertIndex) || insertIndex < 0 || insertIndex > list.length) {
      await explainStep("insert", insertValue, list, {
        insertIndex,
        error: "Invalid index",
        listLength: list.length,
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
  
    await explainStep("insert", insertValue, newList, {
      insertIndex,
      listLength: newList.length,
      maxSize: listSize,
    });
  };

  const handleRemoveEnd = async () => {
    const newList = list.slice(0, -1);
    setList(newList);
    setCurrentOperation("remove");
    await explainStep("remove", removeEndValue, list);
  }

  const handleRemoveFront = async () => {
    const newList = list.slice(1);
    setList(newList);
    setCurrentOperation("remove");
    await explainStep("remove", removeFrontValue, list);
  }

  const handleRemoveIndex = async () => {
    if (removeIndex == "" ){
        await explainStep("insert", null, list, {
            removeIndex,
            error: "No value provided",
            listLength: list.length,
            maxSize: listSize,
          });
          return;
    };
    if (isNaN(removeIndex) || removeIndex < 0 || removeIndex >= list.length){
        await explainStep("remove", list, {
          removeIndex,
          error: "Invalid index",
          listLength: list.length,
          maxSize: listSize,
        });
        return;
      }
    const value = list[removeIndex];
    const newList = [...list];
    newList.splice(removeIndex, 1);
    setList(newList);
    setCurrentOperation("remove");
    await explainStep("remove", value, list);
  }



  const explainStep = async (action, value, updatedList, extra = {}) => {
    const response = await fetch("http://localhost:3001/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        steps: [{ action, value, ...extra }],
        structure: "Singly Linked List",
        currentState: updatedList,
        listLength: updatedList.length,
        maxSize: listSize,
      }),
    });
  
    const data = await response.json();
    setExplanation(data.explanation);
  };


  return (
    <div className="text-center my-8 mx-12 min-w-[700px]">
      <h2 className="text-center text-5xl font-semibold mb-4">Singly Linked List</h2>
      <p className="text-lg">
      Dynamic, sequential structure – stores elements as nodes linked by pointers, 
      allowing efficient insertions and deletions without contiguous memory but with slower access by position.
      </p>
  
      <div className="mt-5">
        {/* Array Visual */}
        <SinglyLLVisual 
          list={list} 
          listSize={listSize} 
          itemWidth={itemWidth}
          showTail={showTail}
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
            /*onClearClick={handleClear}*/
            //onPeekClick={handleAccess}
            size={listSize}        
            /*onResize={handleResize}*/
            showSizeControls={false}
            extraButtons={[
              {
                element: (
                  <div className="flex flex-col gap-5 items-center mb-2">
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="Value"
                        value={insertFrontValue}
                        onChange={(e) => setInsertFrontValue(e.target.value)}
                        className="border border-grey rounded px-2 py-3"
                      />
                      <Button onClick={handleAddAtFront}>Insert at Front</Button>
                    </div>


                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="Value"
                        value={insertValue}
                        onChange={(e) => setInsertValue(e.target.value)}
                        className="border border-grey w-24 rounded px-2 py-3"
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
                      <Button onClick={handleRemoveEnd}>Remove End</Button>
                    </div>

                    <div className="flex gap-2 items-center">
                      <Button onClick={handleRemoveFront}>Remove Front</Button>
                    </div>

                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="Index"
                        value={removeIndex}
                        onChange={(e) => setRemoveIndex(e.target.value)}
                        className="border border-grey rounded px-2 py-3"
                      />
                      <Button onClick={handleRemoveIndex}>Remove Index</Button>
                    </div>

                    <div>
                      <span className="mr-2">Hide Tail</span>
                        <button
                          onClick={() => setShowTail(!showTail)}
                          className={`relative inline-flex h-6 w-12 items-center border border-gray-400 bg-[#fae0e4] rounded-full transition-colors duration-300 
                            ${!showTail ? "bg-gray-300" : "bg-[#fae0e4]"}`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-black transition-transform duration-300
                              ${showTail ? "translate-x-6" : "translate-x-1"}`}
                        />
                        </button>
                      <span className="ml-2">Show Tail</span>
                        
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

export default SinglyLinkedList;

