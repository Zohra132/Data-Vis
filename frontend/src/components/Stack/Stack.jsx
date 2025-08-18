import React, { useState, useEffect } from "react";
import StackCodeSnippets from "./StackCodeSnippets"; 
import AIExplanation from "../AIExplanation";
import CodeDisplay from "../CodeDisplay";
import DataStructureControls from "../DataStructureControls";
import StackVisuals from "./StackVisuals";
import HistoryLog from "../HistoryLog";


const Stack = () => {
  const [implementation, setImplementation] = useState("array");
  const [stack, setStack] = useState([]);
  const [input, setInput] = useState("");
  const [explanation, setExplanation] = useState("");
  const [isFixedSize, setIsFixedSize] = useState(true);
  const [stackSize, setStackSize] = useState(10);
  const [language, setLanguage] = useState("Python");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [currentOperation, setCurrentOperation] = useState(null);
  const [history, setHistory] = useState([]);

  const addHistory = (action, value = null, index = null) => {
    setHistory((prev) => [
      ...prev,
      { action, value, index },
    ]);
  };

  const handleResize = (newSize) => {
    setStackSize(newSize);
    if (stack.length > newSize) {
      setStack((prevStack) => prevStack.slice(0, newSize));
    }
  };

  useEffect(() => {
    if (currentOperation) {
      setCodeSnippet(StackCodeSnippets[language][currentOperation] || "");
    } else {
      setCodeSnippet("");
    }
  }, [language, currentOperation]);


  const handlePush = async () => {
    if (input === "") return;
    if (isFixedSize && stack.length >= stackSize) {
      setExplanation(`Stack is full (max size: ${stackSize})`);
      return;
    }
    const newStack = [...stack, input];
    setStack(newStack);
    addHistory("Push", input);
    setInput("");
    setCurrentOperation("push");
    await explainStep("push", input, stack);
  };
  
  const handlePop = async () => {
    if (stack.length === 0) return;
    const popped = stack[stack.length - 1];
    const newStack = stack.slice(0, -1);
    setStack(newStack);
    addHistory("Pop", popped);
    setCurrentOperation("pop");
    await explainStep("pop", popped, stack);
  };

  const handleClear = async () => {
    setStack([]);
    addHistory("Clear");
    setCurrentOperation("clear");
    await explainStep("clear", null, stack);
  };

  const handleTop = async () => {
    if (stack.length === 0) {
      await explainStep("top", null, stack);
      setCodeSnippet("");
      setCurrentOperation("top");
    } else {
      const topValue = stack[stack.length - 1];
      addHistory("Peek", topValue);
      setCurrentOperation("top"); 
      await explainStep("top", topValue, stack);
    }
  };

  const explainStep = async (action, value, updatedStack) => {
    const response = await fetch("http://localhost:3001/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        steps: [{ action, value }],
        structure: "stack",
        currentState: updatedStack,
      }),
    });

    const data = await response.json();
    setExplanation(data.explanation);
  };

  return (
    <div className="text-center my-8 mx-12 min-w-[700px]">
      <h2 className="text-center text-5xl font-semibold mb-4">Stack</h2>
      <p className="text-lg"> LIFO (Last In, First Out) principle - insertions and removals from the same end. </p>

      <div className="grid grid-cols-2 gap-6 my-8"> 

        {/* Column 1: Stack Visual*/}
        <StackVisuals 
          stack={stack} 
          stackSize={stackSize} 
          isFixedSize={isFixedSize}
          currentOperation={currentOperation}
        />

        {/*Column 2: Exaplanation, code displa, controls and operation history */}
        <div>
          <div className="grid grid-cols-2 gap-3 mb-3 min-h-[200px]">
            <AIExplanation 
              explanation={explanation}
            />
            <CodeDisplay 
              language={language}
              setLanguage={setLanguage}
              codeSnippet={codeSnippet}
            />
          </div>
          <div>
            <DataStructureControls
              input={input}
              setInput={setInput}
              onPrimaryClick={handlePush}
              primaryLabel="Push"
              onSecondaryClick={handlePop}
              secondaryLabel="Pop"
              onClearClick={handleClear}
              onPeekClick={handleTop}
              isFixedSize={isFixedSize}
              setIsFixedSize={setIsFixedSize}
              size={stackSize}
              onResize={handleResize}
            />  
          </div>
          <div className="my-3">
            <HistoryLog history={history} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stack;
