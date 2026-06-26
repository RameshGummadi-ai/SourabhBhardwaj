"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Eye, Edit2, Heading1, Heading2, Bold, Italic, List, Quote, Code } from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

  const insertText = (before: string, after: string = "") => {
    const textarea = document.getElementById("blog-textarea") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    const replacement = before + (selected || "text") + after;

    onChange(text.substring(0, start) + replacement + text.substring(end));
    
    // Reset focus
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + (selected || "text").length);
    }, 50);
  };

  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm flex flex-col">
      {/* Editor Toolbar */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-4 py-2 bg-slate-50 dark:bg-slate-950">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          <button
            onClick={() => setActiveTab("write")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === "write"
                ? "bg-primary-600 text-white"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
            }`}
          >
            <Edit2 className="h-3 w-3" />
            Write
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === "preview"
                ? "bg-primary-600 text-white"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
            }`}
          >
            <Eye className="h-3 w-3" />
            Preview
          </button>

          {activeTab === "write" && (
            <>
              <div className="h-4 w-[1px] bg-slate-300 dark:bg-slate-850 mx-1.5" />
              <button
                type="button"
                onClick={() => insertText("# ", "")}
                className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                title="Heading 1"
              >
                <Heading1 className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => insertText("## ", "")}
                className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                title="Heading 2"
              >
                <Heading2 className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => insertText("**", "**")}
                className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                title="Bold"
              >
                <Bold className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => insertText("_", "_")}
                className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                title="Italic"
              >
                <Italic className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => insertText("- ", "")}
                className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                title="Bullet List"
              >
                <List className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => insertText("> ", "")}
                className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                title="Blockquote"
              >
                <Quote className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => insertText("`", "`")}
                className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                title="Inline Code"
              >
                <Code className="h-3.5 w-3.5" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Editor Body */}
      <div className="flex-grow min-h-[300px] flex">
        {activeTab === "write" ? (
          <textarea
            id="blog-textarea"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write your blog post in Markdown format... Use markdown shortcuts above."
            className="w-full p-4 bg-transparent outline-none resize-y min-h-[300px] text-sm font-mono leading-relaxed text-slate-800 dark:text-slate-200"
          />
        ) : (
          <div className="w-full p-6 prose prose-slate dark:prose-invert max-w-none min-h-[300px] overflow-y-auto bg-slate-50/50 dark:bg-slate-950/20 text-slate-800 dark:text-slate-200">
            {value ? (
              <ReactMarkdown className="markdown-body space-y-4">
                {value}
              </ReactMarkdown>
            ) : (
              <span className="text-slate-400 text-sm italic">Nothing to preview yet. Write some markdown content first.</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
