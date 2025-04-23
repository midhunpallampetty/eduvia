import { useState, useRef,useEffect } from "react";
import { useRouter } from "next/router";
export default function CodeEditor() {
  const [code, setCode] = useState(`console.log("Hello, world!")`);
  const [output, setOutput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
    const lineNumbersRef = useRef<HTMLDivElement>(null);
    const router=useRouter()
  const { code: queryCode } = router.query;
  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const executeCode = () => {
    const log = [];
    const customConsole = {
      log: (...args:any) => log.push(args.join(" ")),
      error: (...args:any) => log.push("Error: " + args.join(" ")),
    };

    try {
      const wrappedCode = new Function("console", code);
      wrappedCode(customConsole);
    } catch (err:any) {
      log.push("Error: " + err.message);
    }

    setOutput(log.join("\n"));
  };

  const lineCount = code.split("\n").length;

  useEffect(() => {
    if (queryCode && typeof queryCode === 'string') {
      setCode(decodeURIComponent(queryCode));
      executeCode()
    } else {
      setCode(`console.log("Hello, world!")`);
    }
  }, [queryCode]);

  return (
    <>
      <div className="h-screen flex flex-col transition-colors">
        {/* Navbar */}
        <nav className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-4 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="w-26 h-16" />
            <h1 className="text-xl font-bold">JS Compiler</h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={executeCode}
              className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              Run Code
            </button>
            
          </div>
        </nav>

        {/* Main Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Side - Code Editor */}
          <div className="w-1/2 p-4 dark:bg-gray-900 bg-white flex flex-col">
            <h2 className="text-lg mb-2 font-semibold text-gray-800 dark:text-white">JavaScript Code</h2>
            <div className="flex flex-1 overflow-hidden relative">
              <div
                ref={lineNumbersRef}
                className="h-full overflow-y-hidden text-gray-500 dark:text-gray-400 text-right pr-2 select-none font-mono bg-transparent"
                style={{ width: "40px", lineHeight: "24px" }}
              >
                {Array.from({ length: lineCount }, (_, i) => (
                  <div key={i + 1}>{i + 1}</div>
                ))}
              </div>
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onScroll={handleScroll}
                className="flex-1 p-2 dark:bg-gray-800 bg-white text-gray-900 dark:text-green-300 font-mono resize-none rounded outline-none"
                style={{ lineHeight: "24px" }}
              />
            </div>
          </div>

          {/* Right Side - Output */}
          <div className="w-1/2 p-4 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white border-l dark:border-l-gray-700 flex flex-col">
            <h2 className="text-lg mb-2 font-semibold text-gray-800 dark:text-white">Output</h2>
            <pre className="w-full flex-1 overflow-auto bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-green-400 p-2 rounded whitespace-pre-wrap animate-fadeIn">
              {output || "// Output will appear here"}
            </pre>
          </div>
        </div>

        <style jsx global>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
        `}</style>
      </div>
    </>
  );
}