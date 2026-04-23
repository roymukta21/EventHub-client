"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Bot, Send, Sparkles, X } from "lucide-react";
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

// Local Fallback Response Logic
function getLocalResponse(input: string): { text: string; events?: Event[] } {
  const q = input.toLowerCase();
  if (q.includes("popular") || q.includes("top") || q.includes("best"))
    return {
      text: "Here are the top-rated events on EventHub! 🌟",
      events: [...events].sort((a, b) => b.rating - a.rating).slice(0, 3),
    };
  if (q.includes("free") || q.includes("cheap"))
    return {
      text: "I found some affordable events for you! 💰",
      events: events.filter((e) => e.price <= 20).slice(0, 3),
    };
  if (q.includes("music") || q.includes("concert"))
    return {
      text: "Check out these music festivals and concerts! 🎵",
      events: events.filter((e) => e.category === "Music").slice(0, 3),
    };
  if (q.includes("tech") || q.includes("programming"))
    return {
      text: "Here are the latest tech conferences! 💻",
      events: events.filter((e) => e.category === "Technology").slice(0, 3),
    };
  return { text: "I'm not sure about that, but try asking about music, tech, or popular events! 🎉" };
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "bot",
      text: "Hello! I'm EventAI 🤖 Ask me to find festivals, tech talks, or anything happening near you!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    // ১. ইউজারের মেসেজ UI-তে সেট করা
    const userMsg: Message = { id: Date.now(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // ২. ব্যাক-এন্ড API কল (আপনার Vercel হ্যান্ডলার অনুযায়ী)
      // আপনার হ্যান্ডলারে বডিতে 'prompt' পাঠাতে হবে
      const response = await api.post("/ai/chat", { prompt: text });

      if (response.data.success) {
        setMessages((prev) => [
          ...prev, 
          { 
            id: Date.now() + 1, 
            role: "bot", 
            text: response.data.data.reply // Gemini AI-এর রেসপন্স
          }
        ]);
      } else {
        throw new Error("API call failed");
      }
    } catch (error) {
      console.log("Falling back to local logic...");
      
      // ৩. যদি AI ফেইল করে তবে লোকাল ডেটা থেকে উত্তর দিবে
      const local = getLocalResponse(text);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "bot",
          text: local.text,
          events: local.events,
        },
      ]);
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
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 border-none outline-none"
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
                        ? "bg-primary text-white rounded-[20px] rounded-br-none"
                        : "bg-white text-slate-700 border border-slate-100 rounded-[20px] rounded-bl-none"
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    
                    {/* Event Recommendations Cards */}
                    {msg.events && msg.events.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {msg.events.map((ev) => (
                          <div key={ev.id} className="bg-slate-50 border border-slate-100 rounded-xl p-2 flex gap-3 hover:bg-white transition-all cursor-pointer group">
                            <img src={ev.imageUrl} alt={ev.title} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                              <p className="font-bold text-[11px] text-slate-900 truncate">{ev.title}</p>
                              <p className="text-[10px] text-primary font-bold mt-0.5">
                                {ev.price === 0 ? "Free" : `$${ev.price}`}
                              </p>
                              <Link href={`/events/${ev.id}`} className="text-[10px] text-slate-400 mt-1 flex items-center group-hover:text-primary transition-colors">
                                View Event →
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
                  <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none px-4 py-2 text-xs text-slate-400 italic flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                    Thinking...
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
                  placeholder="Ask about events..."
                  className="flex-1 bg-transparent border-none outline-none text-sm text-slate-700 py-2 placeholder:text-slate-400"
                  disabled={loading}
                />
                <button
                  onClick={send}
                  disabled={loading || !input.trim()}
                  className="bg-primary text-white p-2 rounded-full hover:opacity-90 disabled:opacity-50 transition-all flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-center text-slate-400 mt-2">
                EventHub Smart AI • Next.js 15
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}