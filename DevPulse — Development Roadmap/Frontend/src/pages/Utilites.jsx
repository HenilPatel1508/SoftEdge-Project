import React, { useState } from "react";
import {
  FaCode,
  FaFileCode,
  FaKey,
  FaCopy,
} from "react-icons/fa";

const Utilites = () => {
  const [jsonInput, setJsonInput] = useState(`{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com"
}`);

  const [formatted, setFormatted] = useState(
    "Click Format to see output"
  );

  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setFormatted(JSON.stringify(parsed, null, 2));
    } catch {
      setFormatted("Invalid JSON");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Utilities
        </h1>
        <p className="text-gray-500 mt-1">
          Developer tools and helpers
        </p>
      </div>

      {/* JSON FORMATTER */}
      <div className="bg-white border rounded-2xl p-6 shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-5">
          <FaCode className="text-blue-500" />
          <h2 className="font-bold text-lg">
            JSON Formatter
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* INPUT */}
          <div>
            <label className="text-sm text-gray-600 mb-2 block">
              Input JSON
            </label>

            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="w-full h-64 border rounded-xl p-4 font-mono text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* OUTPUT */}
          <div>
            <label className="text-sm text-gray-600 mb-2 block">
              Formatted Output
            </label>

            <textarea
              readOnly
              value={formatted}
              className="w-full h-64 border rounded-xl p-4 font-mono text-sm bg-gray-50"
            />
          </div>
        </div>

        <button
          onClick={formatJson}
          className="mt-5 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Format JSON
        </button>
      </div>

      {/* SECOND ROW */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* CODE SNIPPETS */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <FaFileCode className="text-green-500" />
            <h2 className="font-bold text-lg">
              Code Snippets
            </h2>
          </div>

          <div className="space-y-4">
            {/* CARD */}
            <div className="border rounded-xl overflow-hidden">
              <div className="p-4 border-b">
                <h3 className="font-semibold">
                  React Component Template
                </h3>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
                  jsx
                </span>
              </div>

              <pre className="bg-gray-50 p-4 text-xs overflow-auto">
{`import React from 'react';

function Component() {
  return <div>Hello</div>;
}

export default Component;`}
              </pre>
            </div>

            {/* CARD */}
            <div className="border rounded-xl overflow-hidden">
              <div className="p-4 border-b">
                <h3 className="font-semibold">
                  Express Server
                </h3>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
                  js
                </span>
              </div>

              <pre className="bg-gray-50 p-4 text-xs overflow-auto">
{`const express = require('express');
const app = express();

app.listen(5000);`}
              </pre>
            </div>
          </div>
        </div>

        {/* ENV VARIABLES */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <FaKey className="text-purple-500" />
            <h2 className="font-bold text-lg">
              Environment Variables
            </h2>
          </div>

          <div className="space-y-4">
            {[
              "DATABASE_URL",
              "API_KEY",
              "JWT_SECRET",
            ].map((env) => (
              <div
                key={env}
                className="border rounded-xl p-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium">
                    {env}
                  </p>

                  <button className="text-gray-500 hover:text-black">
                    <FaCopy />
                  </button>
                </div>

                <input
                  type="password"
                  value="••••••••••••••••••••••••••••"
                  readOnly
                  className="w-full border rounded-lg px-3 py-2 bg-gray-50"
                />
              </div>
            ))}

            <button className="w-full border-2 border-dashed rounded-xl py-3 text-gray-500 hover:bg-gray-50 transition">
              + Add Variable
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Utilites;