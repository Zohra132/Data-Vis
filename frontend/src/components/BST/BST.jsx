import React, { useState, useEffect } from "react";
import BSTVisuals from "./BSTVisuals";
import BSTCodeSnippets from "./BSTCodeSnippets";
import AIExplanation from "../AIExplanation";
import CodeDisplay from "../CodeDisplay";
import DataStructureControls from "../DataStructureControls";
import Button from "../Button";
import HistoryLog from "../HistoryLog";
import { explain } from "../../utils/api";
import SlidingTabs from "../SlidingTab";
import {
  preorderTraversal,
  inorderTraversal,
  postorderTraversal,
} from "./BSTTraversals";

// BST Node structure
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const BST = () => {
  const [root, setRoot] = useState(null);
  const [input, setInput] = useState("");
  const [explanation, setExplanation] = useState("");
  const [language, setLanguage] = useState("Python");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [currentOperation, setCurrentOperation] = useState(null);
  const [history, setHistory] = useState([]);
  const [traversalResult, setTraversalResult] = useState([]);
  const [traversalType, setTraversalType] = useState(null);
  const [traversalOrder, setTraversalOrder] = useState(null);
  const [activeView, setActiveView] = useState("explanation");

  const addHistory = (action, value = null) => {
    setHistory((prev) => [...prev, { action, value }]);
  };

  useEffect(() => {
    if (currentOperation) {
      setCodeSnippet(BSTCodeSnippets[language]?.[currentOperation] || "");
    } else {
      setCodeSnippet("");
    }
  }, [language, currentOperation]);

  const runTraversal = (type) => {
    if (!root) return;
    let result = [];
    switch (type) {
      case "preorder":
        setTraversalType("Preorder");
        result = preorderTraversal(root);
        break;
      case "inorder":
        setTraversalType("Inorder");
        result = inorderTraversal(root);
        break;
      case "postorder":
        setTraversalType("Postorder");
        result = postorderTraversal(root);
        break;
      default:
        return;
    }
    setTraversalResult(result);
    setCurrentOperation(type); // lets CodeDisplay switch if you add snippets
    setTraversalOrder(result);
    addHistory(
      `${type[0].toUpperCase() + type.slice(1)} Traversal`,
      result.join(", ")
    );
  };
  // Insert into BST
  const insertNode = (node, value) => {
    if (!node) return new Node(value);
    if (value < node.value) {
      node.left = insertNode(node.left, value);
    } else if (value > node.value) {
      node.right = insertNode(node.right, value);
    }
    return node;
  };

  const handleInsert = async () => {
    if (input === "") return;
    if (isNaN(input)) {
      await explainStep("insert", input, root, {
        error: `Cannot insert "${input}" — only numeric values allowed in BST.`
      });
      return;
    }
    const value = Number(input);
    const newRoot = insertNode(root, value);
    setRoot({ ...newRoot });
    setCurrentOperation("insert");
    addHistory("Insert", value);
    setInput("");
    await explainStep("insert", value, newRoot);
  };

  // Search
  const searchNode = (node, value) => {
    if (!node) return false;
    if (value === node.value) return true;
    return value < node.value
      ? searchNode(node.left, value)
      : searchNode(node.right, value);
  };

  const handleSearch = async () => {
    if (input === "") return;
    const value = Number(input);
    const found = searchNode(root, value);
    addHistory("Search", `${value} → ${found ? "Found" : "Not Found"}`);
    setCurrentOperation("search");
    setInput("");
    await explainStep("search", value, root);
  };

  // Delete
  const deleteNode = (node, value) => {
    if (!node) return null;
    if (value < node.value) {
      node.left = deleteNode(node.left, value);
    } else if (value > node.value) {
      node.right = deleteNode(node.right, value);
    } else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      let successor = node.right;
      while (successor.left) successor = successor.left;
      node.value = successor.value;
      node.right = deleteNode(node.right, successor.value);
    }
    return node;
  };

  const handleDelete = async () => {
    if (input === "") return;
    const value = Number(input);
    const newRoot = deleteNode(root, value);
    setRoot(newRoot ? { ...newRoot } : null);
    setCurrentOperation("delete");
    addHistory("Delete", value);
    setInput("");
    await explainStep("delete", value, newRoot);
  };

  // Clear
  const handleClear = async () => {
    setRoot(null);
    setCurrentOperation("clear");
    addHistory("Clear");
    await explainStep("clear", null, {});
  };

  const explainStep = async (action, value, updatedRoot, extra = {}) => {
    try {
      const data = await explain(
        [
          {
            action,
            value,
            updatedRoot,
            ...extra,
          },
        ], 
        "binary search tree",      // structure
        updatedRoot  // currentState
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
    <div className="text-center my-8 mx-12 min-w-[700px]">
      <h2 className="text-center text-5xl font-semibold mb-4">
        Binary Search Tree
      </h2>
      <p className="text-lg">
        Left subtree &lt; node &lt; right subtree. Try insert/search/delete and run traversals.
      </p>

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

        {/* Column 2 */}
        <div>
          <BSTVisuals 
            root={root} 
            currentOperation={currentOperation} 
            traversalOrder={traversalOrder}
          />
        </div>

        <div>
          <DataStructureControls
            input={input}
            setInput={setInput}
            onPrimaryClick={handleInsert}
            primaryLabel="Insert"
            onSecondaryClick={handleSearch}
            secondaryLabel="Search"
            onClearClick={handleClear}
            extraButtons={[{ label: "Delete", onClick: handleDelete }]}
            hideSizeControl={true}
            hideFixedToggle={true}
            extraButtons={[
              {
                element: (
                  <div className="flex flex-col gap-4 items-center mb-2 ">
                    <p className="font-bold text-white">Traversals: </p>
                    <Button onClick={() => runTraversal("preorder")}>Preorder</Button>
                    <Button onClick={() => runTraversal("inorder")}>Inorder</Button>
                    <Button onClick={() => runTraversal("postorder")}>Postorder</Button>
                  </div>
                )}
              ]}
          />
        </div>
      </div>
    </div>
  );
};

export default BST;
