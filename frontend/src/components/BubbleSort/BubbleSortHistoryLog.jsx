import React from "react";

const BubbleSortHistoryLog = ({ history }) => {
  return (
    <div className="border rounded-lg bg-white shadow-md p-3 text-left h-full overflow-y-auto">
      <h3 className="text-lg text-center font-semibold mb-2 text-black">Bubble Sort History</h3>
      {history.length === 0 ? (
        <p className="text-gray-500 italic">No operations yet.</p>
      ) : (
        <ul className="space-y-1 text-sm">
          {history
            .slice()
            .reverse()
            .map((item, idx) => {
              let description = "";
              if (item.indices && item.indices.length === 2 && item.arraySnapshot) {
                const [i1, i2] = item.indices;
                const v1 = item.arraySnapshot[i1];
                const v2 = item.arraySnapshot[i2];

                if (item.action === "compare") {
                  description = `Compared value ${v1} at index ${i1} with value ${v2} at index ${i2}`;
                } else if (item.action === "swap") {
                  description = `Swapped value ${v1} at index ${i1} with value ${v2} at index ${i2}`;
                }
              }

              return (
                <li key={idx} className="border-b pb-1">
                  <span className="font-bold">{item.action}</span>
                  {description && (
                    <> → <span className="text-blue-600">{description}</span></>
                  )}
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default BubbleSortHistoryLog;
