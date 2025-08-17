import React, { useState, useEffect } from "react";
import StackCodeSnippets from "../Stack/StackCodeSnippets"; 
import AIExplanation from "../AIExplanation";
import CodeDisplay from "../CodeDisplay";
import DataStructureControls from "../DataStructureControls";
import LLStackVisuals from "./LLStackVisuals";

const LLStack = () => {
  const [stack, setStack] = useState([]); // Representing linked list stack as array of nodes for simplicity
  const [input, setInput] = useState("");
  const [explanation, setExplanation] = useState("");
  const [isFixedSize, setIsFixedSize] = useState(true);
  const [stackSize, setStackSize] = useState(10);
  const [language, setLanguage] = useState("Python");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [currentOperation, setCurrentOperation] = useState(null);

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
    setInput("");
    setCurrentOperation("push");
    await explainStep("push", input, newStack);
  };

  const handlePop = async () => {
    if (stack.length === 0) return;
    const popped = stack[0].value;
    const newStack = stack.slice(1);
    setStack(newStack);
    setCurrentOperation("pop");
    await explainStep("pop", popped, newStack);
  };

  const handleClear = async () => {
    setStack([]);
    setCurrentOperation("clear");
    await explainStep("clear", null, []);
  };

  const handleTop = async () => {
    const topNode = stack[0];
    setCurrentOperation("top");
    await explainStep("top", topNode?.value ?? null, stack);
  };

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
  };

  return (
    <div className="text-center my-8 mx-12 min-w-[700px]">
      <h2 className="text-center text-5xl font-semibold mb-4">Stack - Linked List Implementation</h2>
      <p className="text-lg">LIFO (Last In, First Out) principle - insertions and removals from the same end.</p>

      <div className="grid grid-cols-2 mt-5">
        {/* Column 1: Stack Visual */}
        <LLStackVisuals stack={stack} />

        {/* Column 2: Explanation, code, controls */}
        <div>
          <div className="grid grid-cols-2 gap-3 my-8 min-h-[200px]">
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
    </div>
  );
};

export default LLStack;
