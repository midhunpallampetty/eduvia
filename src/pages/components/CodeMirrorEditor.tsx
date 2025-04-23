import { useState } from "react";
import dynamic from "next/dynamic";
import { javascript } from "@codemirror/lang-javascript";
import { autocompletion, completeFromList } from "@codemirror/autocomplete";
const globalCompletions = completeFromList([
  // Console
  { label: "console", type: "variable" },
  { label: "log", type: "function", info: "console.log(...)" },
  { label: "warn", type: "function", info: "console.warn(...)" },
  { label: "error", type: "function", info: "console.error(...)" },
  { label: "debug", type: "function", info: "console.debug(...)" },

  // Timers
  { label: "setTimeout", type: "function", info: "setTimeout(callback, delay)" },
  { label: "setInterval", type: "function", info: "setInterval(callback, delay)" },
  { label: "clearTimeout", type: "function", info: "clearTimeout(id)" },
  { label: "clearInterval", type: "function", info: "clearInterval(id)" },

  // Math
  { label: "Math", type: "variable" },
  { label: "random", type: "function", info: "Math.random()" },
  { label: "floor", type: "function", info: "Math.floor(x)" },
  { label: "ceil", type: "function", info: "Math.ceil(x)" },
  { label: "round", type: "function", info: "Math.round(x)" },

  // Global objects
  { label: "window", type: "variable" },
  { label: "document", type: "variable" },
  { label: "navigator", type: "variable" },
  { label: "location", type: "variable" },

  // DOM methods
  { label: "querySelector", type: "function", info: "document.querySelector(selector)" },
  { label: "getElementById", type: "function", info: "document.getElementById(id)" },
  { label: "createElement", type: "function", info: "document.createElement(tag)" },
  { label: "appendChild", type: "function", info: "node.appendChild(child)" },

  // Events
  { label: "addEventListener", type: "function", info: "target.addEventListener(event, handler)" },
  { label: "removeEventListener", type: "function" },

  // Storage
  { label: "localStorage", type: "variable" },
  { label: "sessionStorage", type: "variable" },
  { label: "JSON", type: "variable" },
  { label: "parse", type: "function", info: "JSON.parse(str)" },
  { label: "stringify", type: "function", info: "JSON.stringify(obj)" },

  // Dates
  { label: "Date", type: "class" },
  { label: "now", type: "function", info: "Date.now()" },

  // Keywords
  { label: "let", type: "keyword" },
  { label: "const", type: "keyword" },
  { label: "var", type: "keyword" },
  { label: "function", type: "keyword" },
  { label: "return", type: "keyword" },
  { label: "if", type: "keyword" },
  { label: "else", type: "keyword" },
  { label: "for", type: "keyword" },
  { label: "while", type: "keyword" },
  { label: "switch", type: "keyword" },
  { label: "case", type: "keyword" },
  { label: "break", type: "keyword" },
  { label: "continue", type: "keyword" },
  { label: "try", type: "keyword" },
  { label: "catch", type: "keyword" },
  { label: "finally", type: "keyword" },
  { label: "throw", type: "keyword" },

  // Utility
  { label: "typeof", type: "keyword" },
  { label: "instanceof", type: "keyword" },
  { label: "Array", type: "class" },
  { label: "Object", type: "class" },
  { label: "String", type: "class" },
  { label: "Number", type: "class" },
  { label: "Boolean", type: "class" },
  { label: "Promise", type: "class" },
]);
// Dynamically import the ESM-based CodeMirror
const CodeMirror = dynamic(() => import("@uiw/react-codemirror").then((mod) => mod.default), {
  ssr: false,
});
interface Props {
  code: string;
  onChange: (val: string) => void;
}

export default function CodeMirrorEditor({ code, onChange }: Props) {
  const [fontSize, setFontSize] = useState(18); // default font size

  
  return (
    <div className="h-full flex flex-col gap-2">
      {/* Font Size Selector */}
      <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 mb-1">
        <label htmlFor="fontSize">Font Size:</label>
        <select
          id="fontSize"
          className="border rounded px-2 py-1 dark:bg-gray-800 dark:border-gray-700"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
        >
          {[12, 14, 16, 18, 20, 24].map((size) => (
            <option key={size} value={size}>
              {size}px
            </option>
          ))}
        </select>
      </div>

      {/* CodeMirror Editor */}
      <div className="flex-1 border rounded overflow-hidden">
        <CodeMirror
          value={code}
          height="100%"
          theme="dark"
          extensions={[
            javascript(),
            autocompletion({ override: [globalCompletions] }),
          ]}
          editable={true}
          onChange={(value) => onChange(value)}
          style={{ fontSize: `${fontSize}px` }}
        />
      </div>
    </div>
  );
}
