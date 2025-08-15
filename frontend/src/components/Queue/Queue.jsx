import React, { useState, useEffect } from "react";
import QueueCodeSnippets from "./QueueCodeSnippets";
import AIExplanation from "../AIExplanation";
import CodeDisplay from "../CodeDisplay";
import QueueVisual from "./QueueVisual";
import DataStructureControls from "../DataStructureControls"; 


const Queue = () => {
  const [queue, setQueue] = useState([]);
  const [input, setInput] = useState("");
  const [explanation, setExplanation] = useState("");
  const [isFixedSize, setIsFixedSize] = useState(true);
  const [queueSize, setQueueSize] = useState(10);
  const [language, setLanguage] = useState("Python");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [currentOperation, setCurrentOperation] = useState(null);

  const itemWidth = Math.min(80, Math.floor(1000 / queueSize));

  useEffect(() => {
    if (currentOperation) {
      setCodeSnippet(QueueCodeSnippets[language][currentOperation] || "");
    } else {
      setCodeSnippet("");
    }
  }, [language, currentOperation]);

  const handleEnqueue = async () => {
    if (input === "") return;
    if (isFixedSize && queue.length >= queueSize) {
      setExplanation(`Queue is full (max size: ${queueSize})`);
      return;
    }
    const newQueue = [...queue, input];
    setQueue(newQueue);
    setInput("");
    setCurrentOperation("enqueue");
    await explainStep("enqueue", input, queue);
  };

  const handleDequeue = async () => {
    if (queue.length === 0) {
      setExplanation("Queue is empty.");
      return;
    }
    const dequeued = queue[0];
    const newQueue = queue.slice(1);
    setQueue(newQueue);
    setCurrentOperation("dequeue");
    await explainStep("dequeue", dequeued, queue);
  };

  const handlePeek = async () => {
    if (queue.length === 0) {
      setExplanation("Queue is empty.");
      setCurrentOperation("peek");
      return;
    }
    const front = queue[0];
    setCurrentOperation("peek");
    await explainStep("peek", front, queue);
  };

  const handleClear = async () => {
    setQueue([]);
    setCurrentOperation("clear");
    await explainStep("clear", null, queue);
  };

  const handleResize = async (newSize) => {
    setQueueSize(newSize);
    setCurrentOperation("resize");
    await explainStep("resize", newSize, queue);
  };

  const explainStep = async (action, value, updatedQueue) => {
    const response = await fetch("http://localhost:3001/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        steps: [{ action, value }],
        structure: "queue",
        currentState: updatedQueue,
      }),
    });

    const data = await response.json();
    setExplanation(data.explanation);
  };

  return (
    <div className="text-center my-8 mx-12 min-w-[700px]">
      <h2 className="text-center text-5xl font-semibold mb-4">Queue - Array Implementation</h2>
      <p className="text-lg">
        FIFO (First In, First Out) principle - Elements are added to the rear and removed from the front, like a waiting line.
      </p>
  
      <div className="mt-5">
        {/* Queue Visual */}
        <QueueVisual 
          queue={queue} 
          queueSize={queueSize} 
          isFixedSize={isFixedSize} 
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
            onPrimaryClick={handleEnqueue}
            primaryLabel="Enqueue"
            onSecondaryClick={handleDequeue}
            secondaryLabel="Dequeue"
            onClearClick={handleClear}
            onPeekClick={handlePeek}
            isFixedSize={isFixedSize}
            setIsFixedSize={setIsFixedSize}
            size={queueSize}        
            onResize={handleResize}
          />    
        </div>
      </div>
    </div>
  );
};

export default Queue;
