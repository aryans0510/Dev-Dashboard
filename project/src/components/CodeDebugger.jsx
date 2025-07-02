import React, { useState } from 'react';

export default function CodeDebugger() {
  const [selectedIssue, setSelectedIssue] = useState('syntax');
  const [codeInput, setCodeInput] = useState('');
  const [debugResult, setDebugResult] = useState('');
  const [showExamples, setShowExamples] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const commonIssues = {
    syntax: {
      name: 'Syntax Errors',
      icon: '🔍',
      description: 'Common syntax mistakes and how to fix them',
      examples: [
        {
          title: 'Missing Semicolon',
          badCode: 'const name = "John"\nconsole.log(name)',
          goodCode: 'const name = "John";\nconsole.log(name);',
          explanation: 'JavaScript statements should end with semicolons'
        },
        {
          title: 'Unclosed Brackets',
          badCode: 'function greet(name {\n  return "Hello " + name;\n}',
          goodCode: 'function greet(name) {\n  return "Hello " + name;\n}',
          explanation: 'Always check for matching parentheses, brackets, and braces'
        },
        {
          title: 'Undefined Variable',
          badCode: 'console.log(userName);\nconst userName = "John";',
          goodCode: 'const userName = "John";\nconsole.log(userName);',
          explanation: 'Variables must be declared before they are used'
        },
        {
          title: 'Missing Quotes',
          badCode: 'const message = Hello World;',
          goodCode: 'const message = "Hello World";',
          explanation: 'String values must be enclosed in quotes'
        },
        {
          title: 'Incorrect Function Call',
          badCode: 'function greet(name) {\n  return "Hello " + name;\n}\ngreet;',
          goodCode: 'function greet(name) {\n  return "Hello " + name;\n}\ngreet("John");',
          explanation: 'Functions must be called with parentheses'
        }
      ]
    },
    logic: {
      name: 'Logic Errors',
      icon: '🧠',
      description: 'Code runs but produces wrong results',
      examples: [
        {
          title: 'Incorrect Loop Condition',
          badCode: 'for (let i = 0; i <= 5; i++) {\n  console.log(i);\n}',
          goodCode: 'for (let i = 0; i < 5; i++) {\n  console.log(i);\n}',
          explanation: 'Use < instead of <= to avoid off-by-one errors'
        },
        {
          title: 'Wrong Comparison',
          badCode: 'if (age = 18) {\n  console.log("Adult");\n}',
          goodCode: 'if (age === 18) {\n  console.log("Adult");\n}',
          explanation: 'Use === for comparison, = is for assignment'
        },
        {
          title: 'Array Index Error',
          badCode: 'const arr = [1, 2, 3];\nconsole.log(arr[3]);',
          goodCode: 'const arr = [1, 2, 3];\nconsole.log(arr[arr.length - 1]);',
          explanation: 'Array indices start at 0, so last element is length-1'
        },
        {
          title: 'Boolean Logic Error',
          badCode: 'if (isLoggedIn == true) {\n  showDashboard();\n}',
          goodCode: 'if (isLoggedIn) {\n  showDashboard();\n}',
          explanation: 'Use direct boolean values instead of comparison'
        },
        {
          title: 'String Concatenation',
          badCode: 'const result = 5 + "10";\nconsole.log(result); // "510"',
          goodCode: 'const result = 5 + parseInt("10");\nconsole.log(result); // 15',
          explanation: 'Convert strings to numbers before arithmetic operations'
        }
      ]
    },
    async: {
      name: 'Async Issues',
      icon: '⏱️',
      description: 'Problems with asynchronous code',
      examples: [
        {
          title: 'Callback Hell',
          badCode: 'fetch(url1, (data1) => {\n  fetch(url2, (data2) => {\n    fetch(url3, (data3) => {\n      console.log(data3);\n    });\n  });\n});',
          goodCode: 'async function getData() {\n  const data1 = await fetch(url1);\n  const data2 = await fetch(url2);\n  const data3 = await fetch(url3);\n  console.log(data3);\n}',
          explanation: 'Use async/await for cleaner asynchronous code'
        },
        {
          title: 'Unhandled Promise',
          badCode: 'fetch("/api/data")\n  .then(response => response.json());',
          goodCode: 'fetch("/api/data")\n  .then(response => response.json())\n  .catch(error => console.error(error));',
          explanation: 'Always handle promise rejections with .catch()'
        },
        {
          title: 'Race Condition',
          badCode: 'let user = null;\nsetTimeout(() => user = "John", 1000);\nconsole.log(user);',
          goodCode: 'let user = null;\nsetTimeout(() => {\n  user = "John";\n  console.log(user);\n}, 1000);',
          explanation: 'Wait for async operations to complete before using results'
        },
        {
          title: 'Missing Await',
          badCode: 'async function getData() {\n  const response = fetch("/api/data");\n  return response.json();\n}',
          goodCode: 'async function getData() {\n  const response = await fetch("/api/data");\n  return response.json();\n}',
          explanation: 'Use await when calling async functions'
        },
        {
          title: 'Promise Chain Error',
          badCode: 'fetch("/api/data")\n  .then(response => response.json())\n  .then(data => console.log(data))\n  .catch(error => console.error(error));',
          goodCode: 'try {\n  const response = await fetch("/api/data");\n  const data = await response.json();\n  console.log(data);\n} catch (error) {\n  console.error(error);\n}',
          explanation: 'Use try-catch with async/await for better error handling'
        }
      ]
    },
    dom: {
      name: 'DOM Issues',
      icon: '🌐',
      description: 'Problems with DOM manipulation',
      examples: [
        {
          title: 'Element Not Found',
          badCode: 'const element = document.getElementById("myId");\nelement.style.color = "red";',
          goodCode: 'const element = document.getElementById("myId");\nif (element) {\n  element.style.color = "red";\n}',
          explanation: 'Always check if element exists before manipulating it'
        },
        {
          title: 'Event Listener Memory Leak',
          badCode: 'element.addEventListener("click", handleClick);\n// Element gets removed but listener remains',
          goodCode: 'element.addEventListener("click", handleClick);\nelement.removeEventListener("click", handleClick);',
          explanation: 'Remove event listeners when elements are destroyed'
        },
        {
          title: 'Wrong Event Target',
          badCode: 'document.querySelector("button").onclick = function() {\n  console.log(this.textContent);\n}',
          goodCode: 'document.querySelector("button").onclick = function(event) {\n  console.log(event.target.textContent);\n}',
          explanation: 'Use event.target to get the actual clicked element'
        },
        {
          title: 'Multiple Event Listeners',
          badCode: 'button.onclick = handleClick1;\nbutton.onclick = handleClick2; // Overwrites first',
          goodCode: 'button.addEventListener("click", handleClick1);\nbutton.addEventListener("click", handleClick2);',
          explanation: 'Use addEventListener to attach multiple handlers'
        },
        {
          title: 'DOM Ready Issue',
          badCode: 'const element = document.getElementById("myId");\nelement.style.display = "none";',
          goodCode: 'document.addEventListener("DOMContentLoaded", () => {\n  const element = document.getElementById("myId");\n  element.style.display = "none";\n});',
          explanation: 'Wait for DOM to be ready before manipulating elements'
        }
      ]
    }
  };

  const debugCode = () => {
    if (!codeInput.trim()) {
      setDebugResult('Please enter some code to debug.');
      return;
    }

    const issues = [];
    
    // Basic syntax checks
    if (codeInput.includes('console.log') && !codeInput.includes(';')) {
      issues.push('⚠️ Consider adding semicolons after statements');
    }
    
    if (codeInput.includes('if') && codeInput.includes('=') && !codeInput.includes('===')) {
      issues.push('⚠️ Check if you meant to use === instead of = for comparison');
    }
    
    if (codeInput.includes('for') && codeInput.includes('<=')) {
      issues.push('⚠️ Consider if you need <= or < in your loop condition');
    }
    
    if (codeInput.includes('fetch') && !codeInput.includes('.catch')) {
      issues.push('⚠️ Consider adding error handling with .catch()');
    }
    
    if (codeInput.includes('getElementById') && !codeInput.includes('if')) {
      issues.push('⚠️ Consider checking if element exists before using it');
    }

    if (issues.length === 0) {
      setDebugResult('✅ No obvious issues found! Your code looks good.');
    } else {
      setDebugResult(issues.join('\n\n'));
    }
  };

  const currentIssue = commonIssues[selectedIssue];

  return (
    <div className="widget-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center space-x-2">
          <span className="text-2xl">🐛</span>
          <span>Code Debugger</span>
        </h2>
        <button
          onClick={debugCode}
          className="btn-primary text-sm"
        >
          Debug Code
        </button>
      </div>

      {/* Issue Type Selection */}
      <div className="mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {Object.entries(commonIssues).map(([key, issue]) => (
            <button
              key={key}
              onClick={() => setSelectedIssue(key)}
              className={`p-3 rounded-lg border transition-colors text-left ${
                selectedIssue === key
                  ? 'bg-primary-600 border-primary-500 text-white'
                  : 'bg-gray-800/30 border-gray-700/50 text-gray-300 hover:bg-gray-800/50'
              }`}
            >
              <div className="text-lg mb-1">{issue.icon}</div>
              <div className="text-xs font-medium">{issue.name}</div>
              <div className="text-xs opacity-75">{issue.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Code Input Area */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Enter your code to debug:
        </label>
        <textarea
          value={codeInput}
          onChange={(e) => setCodeInput(e.target.value)}
          placeholder="Paste your code here..."
          className="w-full h-32 px-3 py-2 bg-black text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono text-sm resize-none"
        />
      </div>

      {/* Debug Result */}
      {debugResult && (
        <div className="mb-6 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
          <h4 className="font-semibold text-white mb-2">Debug Results:</h4>
          <pre className="text-sm text-gray-300 whitespace-pre-wrap">{debugResult}</pre>
        </div>
      )}

      {/* Common Examples Button */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-white">Common {currentIssue.name} Examples:</h4>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors text-sm"
          >
            View {currentIssue.examples.length} Examples
          </button>
        </div>
      </div>

      {/* Examples Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Transparent Background */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-gray-800 border border-gray-700 rounded-lg shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gray-900">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{currentIssue.icon}</span>
                <h3 className="text-xl font-bold text-white">{currentIssue.name} Examples</h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-6">
                {currentIssue.examples.map((example, index) => (
                  <div key={index} className="p-6 bg-gray-700/30 rounded-lg border border-gray-600/50">
                    <h4 className="text-lg font-semibold text-white mb-4">{example.title}</h4>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-red-400 text-lg">❌</span>
                          <span className="text-red-400 font-medium">Problematic Code:</span>
                        </div>
                        <pre className="text-sm text-gray-300 bg-red-500/10 p-4 rounded-lg border border-red-500/20 overflow-x-auto font-mono">
                          {example.badCode}
                        </pre>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-green-400 text-lg">✅</span>
                          <span className="text-green-400 font-medium">Fixed Code:</span>
                        </div>
                        <pre className="text-sm text-gray-300 bg-green-500/10 p-4 rounded-lg border border-green-500/20 overflow-x-auto font-mono">
                          {example.goodCode}
                        </pre>
                      </div>
                    </div>
                    
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                      <div className="flex items-start space-x-2">
                        <span className="text-blue-400 text-lg">💡</span>
                        <div>
                          <div className="text-blue-400 font-medium mb-1">Explanation:</div>
                          <div className="text-gray-300">{example.explanation}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-700 bg-gray-900">
              <div className="text-sm text-gray-400">
                {currentIssue.examples.length} examples available
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Debugging Tips */}
      <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
        <h4 className="font-semibold text-yellow-300 mb-2">🔧 Debugging Tips</h4>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>• Use console.log() to check variable values</li>
          <li>• Set breakpoints in browser dev tools</li>
          <li>• Read error messages carefully - they often point to the issue</li>
          <li>• Check the browser console for errors</li>
          <li>• Use try-catch blocks for error handling</li>
          <li>• Test your code step by step</li>
        </ul>
      </div>
    </div>
  );
} 