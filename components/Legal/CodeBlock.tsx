"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language: string;
  id: string;
}

export default function CodeBlock({ code, language, id }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-gray-900 dark:bg-gray-950 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 dark:bg-gray-900 border-b border-gray-700">
        <span className="text-sm text-gray-300 font-medium">{language}</span>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-3 py-1 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-all duration-200"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}
