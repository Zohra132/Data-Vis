"use client";
import { motion } from "framer-motion";

export default function SlidingTabs({ tabs, activeTab, onChange }) {
  return (
    <div>
      <div className="relative flex bg-black/25 rounded-xl w-full h-16 mx-auto border border-black overflow-hidden">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`relative z-10 flex-1 flex items-center justify-center py-2 rounded-xl transition-colors duration-200 ${
              activeTab === tab.key ? "text-white font-semibold" : "text-gray-600"
            }`}
          >
            {tab.label}
          </button>
        ))}

        {/* Sliding Pill */}
        <motion.div
          layoutId="active-pill"
          className="absolute top-1 bottom-1 rounded-lg bg-blue-500 shadow"
          initial={false}
          animate={{
            x: `${tabs.findIndex((t) => t.key === activeTab) * 100}%`,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
          style={{
            width: `calc(${100 / tabs.length}% - 0.5rem)`, // smaller than track
            marginLeft: "0.25rem",
            marginRight: "0.25rem",
          }}
        />
      </div>
    </div>
  );
}
