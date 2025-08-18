import React from "react";

const CodeDisplay = ({ language, setLanguage, codeSnippet }) => {
  return (
    <div className="border border-grey shadow-md bg-gray-100 rounded-xl">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="flex w-full rounded-t-xl h-10 px-2 py-1 bg-[#fae0e4] shadow-md"
      >
        <option value="Python">Python</option>
        <option value="JavaScript">JavaScript</option>
        <option value="Java">Java</option>
        <option value="Cpp">C++</option>
      </select>
      <pre className="px-4 font-mono text-xs lg:text-sm rounded p-3 whitespace-pre-wrap text-left">
        {codeSnippet}
      </pre>
    </div>
  );
};

export default CodeDisplay;
