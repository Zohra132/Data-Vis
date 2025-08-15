import React, { useState } from "react";

const Tree = () => {
  const [stack, setStack] = useState([]);
  const [input, setInput] = useState("");
  const [explanation, setExplanation] = useState("");

  const handlePush = async () => {
    if (input === "") return;
    const newStack = [...stack, input];
    setStack(newStack);
    setInput("");
    await explainStep("push", input, newStack);
  };

  const handlePop = async () => {
    if (stack.length === 0) return;
    const popped = stack[stack.length - 1];
    const newStack = stack.slice(0, -1);
    setStack(newStack);
    await explainStep("pop", popped, newStack);
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
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Stack</h2>
      <div className="border border-black border-4 rounded-lg p-6 inline-block">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter value"
      />
      <button onClick={handlePush}>Push</button>
      
      <button onClick={handlePop}>Pop</button>
      </div>

      
      <div style={{ marginTop: "2rem" }}>
        {stack
          .slice()
          .reverse()
          .map((item, i) => (
            <div
              key={i}
              style={{
                width: "100px",
                margin: "auto",
                padding: "10px",
                border: "2px solid #444",
                marginBottom: "5px",
                background: "#dff3ff",
              }}
            >
              {item}
            </div>
          ))}
        <div style={{ fontSize: "0.8rem", marginTop: "10px" }}>← Top</div>
      </div>

      <div style={{ marginTop: "2rem", padding: "1rem", borderTop: "1px solid #ccc" }}>
        <h4>🧠 GPT-4 Explanation</h4>
        <p>{explanation}</p>
      </div>
    </div>
  );
};

export default Tree;
