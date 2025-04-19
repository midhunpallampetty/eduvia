// JSCompiler.jsx
import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';

const JSCompiler = () => {
  const [code, setCode] = useState('// Write your JS code here\n');
  const [output, setOutput] = useState('');

  const runCode = () => {
    try {
      const originalLog = console.log;
      let logResult = '';
      console.log = (...args) => {
        logResult += args.join(' ') + '\n';
      };

      // eslint-disable-next-line no-eval
      eval(code);

      console.log = originalLog;
      setOutput(logResult);
    } catch (err:any) {
      setOutput('Error: ' + err.message);
    }
  };

  return (
    <div className="p-4 bg-white  text-black rounded-xl shadow-xl max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-2">JavaScript Online Compiler</h2>
      <Editor
        value={code}
        onValueChange={setCode}
        highlight={code => Prism.highlight(code, Prism.languages.javascript, 'javascript')}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 14,
          border: '1px solid #ddd',
          borderRadius: '8px',
          minHeight: '200px',
          backgroundColor: '#f9f9f9'
        }}
      />
      <button
        onClick={runCode}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Run
      </button>
      <div className="mt-4 p-2 bg-gray-100 border border-gray-300 rounded min-h-[100px]">
        <strong>Output:</strong>
        <pre className="whitespace-pre-wrap">{output}</pre>
      </div>
    </div>
  );
};

export default JSCompiler;
