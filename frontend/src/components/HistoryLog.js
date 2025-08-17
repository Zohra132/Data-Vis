import React from "react";

const HistoryLog = ({ history }) => {
  return (
    <div className="border rounded-lg bg-white shadow-md p-3 text-left max-h-60 overflow-y-auto">
      <h3 className="text-lg font-semibold mb-2">Operation History</h3>
      {history.length === 0 ? (
        <p className="text-gray-500 italic">No operations yet.</p>
      ) : (
        <ul className="space-y-1 text-sm">
          {history.map((item, idx) => (
            <li key={idx} className="border-b pb-1">
              <span className="font-bold">{item.action}</span>
              {item.value !== undefined && item.value !== null && (
                <> → <span className="text-blue-600">value {item.value}</span></>
              )}
              {item.index !== undefined && item.index !== null && item.index !== "" && (
                <> at index <span className="text-purple-600">{item.index}</span></>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistoryLog;
