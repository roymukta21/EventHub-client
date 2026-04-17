"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Bot, Send, Sparkles, X, MessageSquare } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; 
import { events } from "../data/events";
import type { Event } from "../data/events";
import { api } from "../utils/api";

interface Message {
  id: number;
  role: "user" | "bot";
  text: string;
  events?: Event[];
}

function getLocalResponse(input: string): { text: string; events?: Event[] } {
  const q = input.toLowerCase();
  if (q.includes("popular") || q.includes("top") || q.includes("best"))
    return {
      text: "Here are the top-rated events! 🌟",
      events: [...events].sort((a, b) => b.rating - a.rating).slice(0, 3),
    };
  if (q.includes("free") || q.includes("cheap"))
    return {
      text: "Here are some affordable events! 💰",
      events: events.filter((e) => e.price <= 20).slice(0, 3),
    };
  if (q.includes("music"))
    return {
      text: "Check out these music events! 🎵",
      events: events.filter((e) => e.category === "Music").slice(0, 3),
    };
  if (q.includes("tech") || q.includes("technology"))
    return {
      text: "Top tech events for you! 💻",
      events: events.filter((e) => e.category === "Technology").slice(0, 3),
    };
  if (q.includes("food"))
    return {
      text: "Delicious food events! 🍔",
      events: events.filter((e) => e.category === "Food").slice(0, 3),
    };
  return { text: "Try asking about music, tech, food, or popular events! 🎉" };
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "bot",
      text: "Hello! I'm EventAI 🤖 How can I help you find your next event today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg: Message = { id: Date.now(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const token = localStorage.getItem("eventhub_token");
      if (token) {
        const res = await api.post<{ success: boolean; data: { reply: string } }>("/ai/chat", { message: text });
        setMessages((prev) => [...prev, { id: Date.now() + 1, role: "bot", text: res.data.reply }]);
      } else {
        throw new Error("Local fallback");
      }
    } catch {
      const local = getLocalResponse(text);
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: "bot", text: local.text, events: local.events }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-2xl flex items-center justify-center transition-all duration-300"
      >
        {open ? <X className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] sm:w-[400px] bg-white border border-slate-200 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col"
            style={{ height: "550px" }}
          >
            {/* Header */}
            <div className="bg-white border-b p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-none">EventAI Assistant</h3>
                  <span className="text-[11px] text-green-500 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Online
                  </span>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 scrollbar-thin">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] px-4 py-2.5 shadow-sm text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-blue-600 rounded-[20px] rounded-br-none"
                        : "bg-white text-slate-700 border border-slate-100 rounded-[20px] rounded-bl-none"
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                    
                    {/* Event Cards within Chat */}
                    {msg.events && msg.events.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {msg.events.map((ev) => (
                          <div key={ev.id} className="bg-slate-50 border border-slate-100 rounded-xl p-2 flex gap-3 hover:bg-white transition-colors cursor-pointer group">
                            <img src={ev.imageUrl} alt={ev.title} className="w-14 h-14 rounded-lg object-cover" />
                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                              <p className="font-bold text-xs text-slate-900 truncate">{ev.title}</p>
                              <p className="text-xs text-primary font-semibold mt-0.5">
                                {ev.price === 0 ? "Free" : `$${ev.price}`}
                              </p>
                              <Link href={`/events/${ev.id}`} className="text-[10px] text-slate-400 mt-1 flex items-center group-hover:text-primary transition-colors">
                                Details <Send className="w-2 h-2 ml-1" />
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none px-4 py-2 text-xs text-slate-400 italic">
                    EventAI is thinking...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100">
              <div className="relative flex items-center gap-2 bg-slate-100 rounded-full px-4 py-1.5 focus-within:ring-2 ring-primary/20 transition-all">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Type your question..."
                  className="flex-1 bg-transparent border-none outline-none text-sm text-slate-700 py-2 placeholder:text-slate-400"
                  disabled={loading}
                />
                <button
                  onClick={send}
                  disabled={loading || !input.trim()}
                  className="bg-primary text-blue-800 p-2 rounded-full hover:opacity-90 disabled:opacity-50 transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-center text-slate-500 mt-2">
                Powered by EventHub Smart AI
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}