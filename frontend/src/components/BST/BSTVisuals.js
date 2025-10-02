import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ZoomControls from "../ZoomControls";

const BSTVisuals = ({ root, currentOperation, traversalOrder = [] }) => {
  const containerRef = useRef(null);
  const [positions, setPositions] = useState({});
  const [currentTraversalNode, setCurrentTraversalNode] = useState(null);

  // Capture positions for lines
  useEffect(() => {
    if (!containerRef.current) return;

    const newPositions = {};
    const nodes = containerRef.current.querySelectorAll("[data-bst-id]");
    nodes.forEach((node) => {
      const rect = node.getBoundingClientRect();
      const parentRect = containerRef.current.getBoundingClientRect();
      newPositions[node.dataset.bstId] = {
        x: rect.left + rect.width / 2 - parentRect.left,
        y: rect.top + rect.height / 2 - parentRect.top,
      };
    });
    setPositions(newPositions);
  }, [root, currentOperation]);

  // Animate traversal
  useEffect(() => {
    if (!traversalOrder || traversalOrder.length === 0) return;

    let i = 0;
    const interval = setInterval(() => {
      setCurrentTraversalNode(traversalOrder[i]);
      i++;
      if (i >= traversalOrder.length) {
        clearInterval(interval);
        setTimeout(() => setCurrentTraversalNode(null), 500);
      }
    }, 800); // highlight each node for 0.8s
    return () => clearInterval(interval);
  }, [traversalOrder]);

  const renderNode = (node, id) => {
    if (!node) return null;
    const leftId = `${id}-L`;
    const rightId = `${id}-R`;

    const highlight = currentTraversalNode === node.value;

    return (
      <div className="flex flex-col items-center">
        <AnimatePresence mode="popLayout">
          <motion.div
            data-bst-id={id}
            key={`${node.value}-${id}`}
            layout
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`w-12 h-6 lg:w-24 lg:h-12 flex items-center justify-center rounded-full border-2 font-semibold shadow text-black
              ${
                highlight
                  ? "bg-yellow-300 border-yellow-500"
                  : currentOperation === "insert"
                  ? "bg-green-200 border-green-500"
                  : currentOperation === "search"
                  ? "bg-blue-200 border-blue-500"
                  : currentOperation === "delete"
                  ? "bg-red-200 border-red-500"
                  : "bg-white border-gray-400"
              }`}
          >
            {node.value}
          </motion.div>
        </AnimatePresence>

        {(node.left || node.right) && (
          <div className="flex justify-center gap-6 mt-2">
            {node.left && node.right ? (
              <>
                {renderNode(node.left, leftId)}
                {renderNode(node.right, rightId)}
              </>
            ) : node.left ? (
              <>
                {renderNode(node.left, leftId)}
                <div className="flex-1" />
              </>
            ) : node.right ? (
              <>
                <div className="flex-1" />
                {renderNode(node.right, rightId)}
              </>
            ) : null}
          </div>
        )}
      </div>
    );
  };

  return (
    <ZoomControls>
      <div
        ref={containerRef}
        className="relative p-4 rounded-lg h-[550px] min-w-[300px] my-20 flex justify-center items-start"
      >
        <div className="relative z-10 w-full flex justify-center">
          {!root ? (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-500">
              Tree is empty
            </motion.p>
          ) : (
            renderNode(root, "root")
          )}
        </div>

        {/* Lines */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {Object.keys(positions).map((id) => {
            const parent = positions[id];
            const left = positions[`${id}-L`];
            const right = positions[`${id}-R`];

            return (
              <React.Fragment key={id}>
                {parent && left && <line x1={parent.x} y1={parent.y} x2={left.x} y2={left.y} stroke="gray" strokeWidth="2" />}
                {parent && right && <line x1={parent.x} y1={parent.y} x2={right.x} y2={right.y} stroke="gray" strokeWidth="2" />}
              </React.Fragment>
            );
          })}
        </svg>
      </div>
    </ZoomControls>
  );
};

export default BSTVisuals;
