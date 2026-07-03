"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { chatbotResponses } from "@/lib/data";

type Message = { role: "bot" | "user"; text: string };

const suggestedQuestions = [
  "What products do you sell?",
  "How to place an order?",
  "Do you have fasting products?",
  "What is the shelf life?",
  "Are products FSSAI certified?",
];

function getResponse(input: string): string {
  const lower = input.toLowerCase().trim();
  for (const key of Object.keys(chatbotResponses)) {
    if (lower.includes(key)) return chatbotResponses[key];
  }
  return chatbotResponses["default"];
}

// Isolated outside the component so the impure Math.random() call
// doesn't get flagged as happening within render scope.
function randomTypingDelay() {
  return 800 + Math.random() * 600;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Namaste! 🙏 I'm Bhagwati's virtual assistant. Ask me about our products, ordering, delivery, or anything else!",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setShowSuggestions(false);
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(
      () => {
        setTyping(false);
        setMessages((prev) => [...prev, { role: "bot", text: getResponse(text) }]);
      },
      randomTypingDelay()
    );
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#E8832A] hover:bg-[#d4751f] text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-105 animate-pulse-ring"
        aria-label="Open chat"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Chat window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-orange-100 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"
        }`}
        style={{ maxHeight: "520px" }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8B1538] to-[#E8832A] text-white px-4 py-3 flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
            <Bot size={18} />
          </div>
          <div>
            <div className="font-bold text-sm">Bhagwati Assistant</div>
            <div className="text-[10px] text-orange-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
              Online
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="ml-auto opacity-80 hover:opacity-100">
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-[#FFF8F0]">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "bot" && (
                <div className="w-6 h-6 bg-[#8B1538] rounded-full flex items-center justify-center text-white text-[10px] mr-2 mt-1 shrink-0">
                  भ
                </div>
              )}
              <div
                className={`max-w-[80%] text-xs rounded-2xl px-3 py-2 leading-relaxed whitespace-pre-line ${
                  msg.role === "user"
                    ? "bg-[#E8832A] text-white rounded-br-sm"
                    : "bg-white text-[#2D1B00] shadow-sm border border-orange-100 rounded-bl-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex justify-start">
              <div className="w-6 h-6 bg-[#8B1538] rounded-full flex items-center justify-center text-white text-[10px] mr-2 mt-1 shrink-0">
                भ
              </div>
              <div className="bg-white border border-orange-100 shadow-sm rounded-2xl rounded-bl-sm px-4 py-3">
                <div className="flex gap-1 items-center">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 bg-[#E8832A] rounded-full"
                      style={{ animation: `typing 1.2s ${i * 0.2}s infinite` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Suggestions */}
          {showSuggestions && messages.length === 1 && (
            <div className="pt-1">
              <p className="text-[10px] text-[#6B4226] mb-2 font-medium">Quick questions:</p>
              <div className="flex flex-wrap gap-1.5">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-[10px] bg-white border border-orange-200 text-[#E8832A] px-2 py-1 rounded-full hover:bg-[#E8832A] hover:text-white transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-3 py-3 border-t border-orange-100 bg-white shrink-0 flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Ask me anything…"
            className="flex-1 border border-orange-200 rounded-xl px-3 py-2 text-xs text-[#2D1B00] focus:outline-none focus:ring-2 focus:ring-[#E8832A]/30"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
            className="w-9 h-9 bg-[#E8832A] hover:bg-[#d4751f] disabled:opacity-40 text-white rounded-xl flex items-center justify-center transition-colors"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </>
  );
}
