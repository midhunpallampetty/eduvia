import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl p-6 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] text-white"
      >
        <h2 className="text-2xl font-extrabold mb-4 text-center text-white drop-shadow">💻 JavaScript Online Compiler</h2>

        <Editor
          value={code}
          onValueChange={setCode}
          highlight={code =>
            Prism.highlight(code, Prism.languages.javascript, 'javascript')
          }
          padding={16}
          style={{
            fontFamily: '"Fira Code", monospace',
            fontSize: 14,
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            minHeight: '220px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            color: 'white',
            boxShadow: 'inset 0 1px 4px rgba(255,255,255,0.1)',
            transition: 'all 0.3s ease-in-out'
          }}
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={runCode}
          className="mt-6 block mx-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
        >
          ▶ Run Code
        </motion.button>

        <AnimatePresence>
          {output && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
              className="mt-6 p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-inner text-sm"
            >
              <h3 className="font-semibold text-white mb-2">🖥 Output:</h3>
              <pre className="whitespace-pre-wrap text-white">{output}</pre>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default JSCompiler;
