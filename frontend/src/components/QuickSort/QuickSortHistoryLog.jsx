import React from "react";

const QuickSortHistoryLog = ({ history }) => {
  return (
    <div className="w-full text-left border border-black rounded-lg bg-black/25 shadow-md h-full p-3 overflow-y-auto">
      <h3 className="text-lg text-center font-semibold mb-2 text-gray-300">
        QuickSort History
      </h3>

      {history.length === 0 ? (
        <p className="text-gray-500 italic text-center">No operations yet.</p>
      ) : (
        <ul className="space-y-1 text-sm">
          {history
            .slice()
            .reverse()
            .map((item, idx) => {
              let description = "";

              /*
              if (item.action === "Swap" && item.indices.length === 2) {
                const [i1, i2] = item.indices;
                const v1 = item.arraySnapshot[i1];
                const v2 = item.arraySnapshot[i2];
                description = `Swapped ${v1} (index ${i1}) ↔ ${v2} (index ${i2})`;
              }*/

              if (item.action === "Pivot Placed" && item.indices.length === 2) {
                const [i1, i2] = item.indices;
                description = `Pivot ${i2} placed at index ${i1}`;
              }

              if (item.action === "Pivot Selected" && item.indices.length === 2) {
                const [index, value] = item.indices;
                description = `Selected pivot ${value} (index ${index})`;
              }

              if (item.action === "Sorting Complete") {
                description = `Sorted Array: [${item.arraySnapshot.join(", ")}]`;
              }

              return (
                <li key={idx} className="border-b pb-1 text-gray-300">
                  <span className="font-bold">{item.action}</span>
                  {description && (
                    <> → <span className="text-blue-400">{description}</span></>
                  )}
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default QuickSortHistoryLog;
