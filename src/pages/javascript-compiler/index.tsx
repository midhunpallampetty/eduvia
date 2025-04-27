import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import CodeMirrorEditor from "../components/CodeMirrorEditor";

export default function CodeEditor() {
  const [code, setCode] = useState(`
    // Online JavaScript Editor | Free Online JavaScript Compiler
    // Write, edit, and run your code online using our IDE
    
    console.log("Hello, world!");
    `);
    
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const router = useRouter();
  const { code: queryCode } = router.query;

  const executeCode = useCallback(() => {
    setIsRunning(true);
    const log: string[] = [];
    const customConsole = {
      log: (...args: any[]) => log.push(args.join(" ")),
      error: (...args: any[]) => log.push("Error: " + args.join(" ")),
    };

    try {
      const wrappedCode = new Function("console", code);
      wrappedCode(customConsole);
    } catch (err: any) {
      log.push("Error: " + err.message);
    } finally {
      setIsRunning(false);
    }

    setOutput(log.join("\n"));
  }, [code]);

  useEffect(() => {
    if (queryCode && typeof queryCode === "string") {
      const decodedCode = decodeURIComponent(queryCode);
      setCode(decodedCode);
      executeCode();
    }
  }, [queryCode, executeCode]);

  const copyShareableLink = async () => {
    const encodedCode = encodeURIComponent(code);
    const url = `${window.location.origin}${router.pathname}?code=${encodedCode}`;
    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Free Online JavaScript Compiler & Code Runner | Run JS Code Instantly | JS Compiler</title>
        <meta name="description" content="Use our free online JavaScript compiler to compile, run, and debug JS code instantly. Best JS compiler online — no downloads, no setup needed." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="online javascript compiler, online js compiler, javascript online compiler, javascript compiler online, js online compiler, run js code online,js editr online ,javascript runner, online javascript runner,javascript ide online,javascript code runner,free javascript editor" />
        <link rel="canonical" href="https://eduvia.space/javascript-compiler" />
        <meta property="og:title" content="Free JavaScript Compiler & Code Editor | Run JS Instantly" />
        <meta property="og:description" content="Compile, run, and debug JavaScript code instantly with our free online compiler. No downloads required." />
        <meta property="og:image" content="/social-image.png" />
        <meta property="og:site_name" content="JS Compiler" />
        <meta property="og:url" content="https://eduvia.space/javascript-compiler" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "JS Compiler",
            "url": "https://eduvia.space",
            "description": "Free online JavaScript compiler and code runner.",
            "softwareVersion": "1.0",
            "operatingSystem": "Browser-based",
            "applicationCategory": "CodeEditor"
          })}
        </script>
      </Head>

      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3 animate-fade-in-right">
          <img src="/logo.png" alt="JS Compiler Logo" className="w-26 h-16 transition-transform hover:scale-105" />
          <h1 className="text-xl font-bold">Online JavaSript Compiler</h1>
          </div>
        <div className="flex gap-3">
          <button
            onClick={copyShareableLink}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-semibold transition-all hover:scale-105 active:scale-95"
          >
            Share
          </button>
          <button
            onClick={executeCode}
            disabled={isRunning}
            className={`bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded font-semibold transition-all 
              ${isRunning ? "opacity-75 cursor-not-allowed" : "hover:scale-105 active:scale-95"}`}
          >
            {isRunning ? (
              <div className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Running...
              </div>
            ) : (
              "Run Code"
            )}
          </button>
        </div>
      </nav>

      {/* Main Editor & Output */}
      <main className="flex flex-col md:flex-row flex-1">
        <section className="w-full md:w-1/2 p-4 bg-white dark:bg-gray-900 animate-fade-in-left">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">JavaScript Code</h2>
          <div className="h-full transition-all duration-300">
            <CodeMirrorEditor code={code} onChange={setCode} />
          </div>
        </section>
        <section className="w-full md:w-1/2 p-4 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white border-l dark:border-l-gray-700 flex flex-col animate-fade-in-right">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Output</h2>
            <button
              onClick={() => setOutput("")}
              className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Clear
            </button>
          </div>
          <pre
            key={output}
            className={`flex-1 bg-gray-100 dark:bg-gray-900 p-2 rounded whitespace-pre-wrap overflow-auto transition-all duration-300 
              ${output.startsWith("Error:") ? "text-red-400 animate-shake" : "text-green-400 animate-fade-in"}`}
          >
            {output || "// Output will appear here"}
          </pre>
        </section>
      </main>

      {/* Sticky Footer */}
      <footer className="bg-gray-50 dark:bg-gray-800 hidden text-gray-800 dark:text-white border-t dark:border-t-gray-700 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center animate-fade-in-up">
            <h3 className="text-2xl font-semibold">What is JS Compiler?</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              JS Compiler is a free online JavaScript compiler and code runner. Write, compile, and execute JavaScript code instantly without any downloads or setup. 
              Perfect for testing code snippets, learning JavaScript, or debugging on the fly.
            </p>
          </div>

          <div className="animate-fade-in-up">
            <h3 className="text-2xl font-semibold text-center mb-4">Features</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-4xl mx-auto">
              {[
                "Real-time code execution",
                "Code highlighting & formatting",
                "Error highlighting",
                "Shareable code links",
                "Dark mode support",
                "Mobile responsive design",
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500 text-lg">✓</span> {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400 animate-fade-in-up">
            &copy; {new Date().getFullYear()} JS Compiler. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
