import React, { useState, useEffect } from "react";
import StackCodeSnippets from "../Stack/StackCodeSnippets"; 
import AIExplanation from "../AIExplanation";
import CodeDisplay from "../CodeDisplay";
import DataStructureControls from "../DataStructureControls";
import LLStackVisuals from "./LLStackVisuals";
import HistoryLog from "../HistoryLog";
import { explain } from "../../utils/api";
import SlidingTabs from "../SlidingTab";

const LLStack = () => {
  const [stack, setStack] = useState([]); // Representing linked list stack as array of nodes for simplicity
  const [input, setInput] = useState("");
  const [explanation, setExplanation] = useState("");
  const [isFixedSize, setIsFixedSize] = useState(true);
  const [stackSize, setStackSize] = useState(10);
  const [language, setLanguage] = useState("Python");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [currentOperation, setCurrentOperation] = useState(null);
  const [history, setHistory] = useState([]);
  const [activeView, setActiveView] = useState("explanation");

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
    const newNode = { value: input, next: stack[0] || null };
    const newStack = [...stack, newNode];
    setStack(newStack);
    addHistory("Push", input);
    setInput("");
    setCurrentOperation("push");
    await explainStep("push", input, newStack);
  };

  const handlePop = async () => {
    if (stack.length === 0) return;
    const popped = stack[0].value;
    const newStack = stack.slice(1);
    setStack(newStack);
    addHistory("Pop", popped);
    setCurrentOperation("pop");
    await explainStep("pop", popped, newStack);
  };

  const handleClear = async () => {
    setStack([]);
    addHistory("Clear");
    setCurrentOperation("clear");
    await explainStep("clear", null, []);
  };

  const handleTop = async () => {
    const topNode = stack[0];
    addHistory("Peek", topNode);
    setCurrentOperation("top");
    await explainStep("top", topNode?.value ?? null, stack);
  };

  /*
  const explainStep = async (action, value, updatedStack) => {
    const response = await fetch("http://localhost:3001/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        steps: [{ action, value }],
        structure: "stack",
        currentState: updatedStack.map((node) => node.value),
      }),
    });

    const data = await response.json();
    setExplanation(data.explanation);
  };*/

  const explainStep = async (action, value, updatedStack, extra = {}) => {
    try {
      const data = await explain(
        [
          {
            action,
            value,
            updatedStack,
            ...extra,
          },
        ], // steps
        "stack",      // structure
        updatedStack  // currentState
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
      <h2 className="text-center text-4xl font-semibold mb-4">Stack - Linked List Implementation</h2>
      <p className="text-md">LIFO (Last In, First Out) principle - insertions and removals from the same end.</p>

      <div className="grid grid-cols-[1fr_1fr_1fr] gap-6 my-8">
        {/* Column 1 */}
        <div className="w-full">
          <SlidingTabs
            tabs={tabs}
            activeTab={activeView}
            onChange={setActiveView}
          />

          <div className="h-[630px] border border-black rounded-lg p-4 bg-black/25 shadow mt-4">
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

        {/* Column 2*/}
        <div>
          <LLStackVisuals 
            stack={stack} 
            stackSize={stackSize} 
            isFixedSize={isFixedSize}
            currentOperation={currentOperation}
          />
        </div>

        {/* Column 3*/}
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
              showSizeControls={false}
            />
          </div>
      </div>
    </div>
  );
};

export default LLStack;
