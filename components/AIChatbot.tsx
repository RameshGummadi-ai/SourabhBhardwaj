"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, User, Bot, CornerDownLeft } from "lucide-react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const suggestedPrompts = [
  "What publications do you have?",
  "What is your academic qualification?",
  "Explain Machine Learning in simple terms",
  "How can I contact you?"
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Hello! I am Dr. Sourabh's AI representative. Ask me about his publications, career timeline, GATE/NET qualifications, or academic topics." }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage: Message = { sender: "user", text };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();
      
      setMessages(prev => [...prev, { sender: "bot", text: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { sender: "bot", text: "I'm having trouble connecting right now. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 text-xs">
      
      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="h-12 w-12 rounded-full bg-gradient-to-tr from-primary-600 to-accent-600 text-white flex items-center justify-center shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all border border-white/10"
        aria-label="Open AI Assistant"
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
      </motion.button>

      {/* Chat window drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="absolute bottom-16 right-0 w-[350px] sm:w-[380px] h-[500px] glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-accent-600 p-4 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight">Ask Prof. Sourabh</h3>
                  <span className="text-[10px] text-primary-100 font-mono">Academic AI Assistant</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable messages area */}
            <div
              ref={scrollRef}
              className="flex-grow p-4 overflow-y-auto space-y-3 bg-slate-50/50 dark:bg-slate-950/20"
            >
              {messages.map((msg, i) => {
                const isUser = msg.sender === "user";
                return (
                  <div
                    key={i}
                    className={`flex items-start gap-2.5 max-w-[85%] ${isUser ? "ml-auto flex-row-reverse" : ""}`}
                  >
                    <div className={`h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0 border ${
                      isUser
                        ? "bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-350"
                        : "bg-primary-50 dark:bg-primary-950/50 border-primary-100 dark:border-primary-900 text-primary-600 dark:text-primary-400"
                    }`}>
                      {isUser ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                    </div>

                    <div className={`p-3 rounded-2xl text-left leading-relaxed ${
                      isUser
                        ? "bg-primary-600 text-white rounded-tr-none"
                        : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-850 rounded-tl-none shadow-sm"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="flex items-start gap-2.5 max-w-[80%]">
                  <div className="h-7 w-7 rounded-full bg-primary-50 dark:bg-primary-900 border border-primary-100 dark:border-primary-900 flex items-center justify-center text-primary-500">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl rounded-tl-none border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="flex gap-1 items-center py-1">
                      <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Hint / Suggestion chips */}
            {messages.length === 1 && (
              <div className="p-3 border-t border-slate-100 dark:border-slate-900/60 flex flex-wrap gap-1.5 bg-white dark:bg-slate-950 text-[10px] text-left">
                <span className="text-slate-400 block w-full mb-1">Click a question to ask:</span>
                {suggestedPrompts.map(prompt => (
                  <button
                    key={prompt}
                    onClick={() => handleSendMessage(prompt)}
                    className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-primary-500 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-450 transition-all text-left line-clamp-1"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input area */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 border-t border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="Ask me academic questions..."
                className="flex-grow bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 outline-none focus:border-primary-500 text-slate-800 dark:text-slate-200"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || loading}
                className="p-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-colors disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
