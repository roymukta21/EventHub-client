"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Bot, Send, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { events } from "../data/events";
import type { Event } from "../data/events";
import { api } from "../utils/api";

interface Message {
  id: number;
  role: "user" | "bot";
  text: string;
  events?: Event[];
}

// Fallback local response when not authenticated or API unavailable
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
      text: "Hello! I'm EventAI 🤖 Ask me to recommend events, find music festivals, tech conferences, or anything else!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on message change
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
      let botText = "";
      if (token) {
        const res = await api.post<{
          success: boolean;
          data: { reply: string };
        }>("/ai/chat", { message: text });
        botText = res.data.reply;
      } else {
        const local = getLocalResponse(text);
        const botMsg: Message = {
          id: Date.now() + 1,
          role: "bot",
          text: local.text,
          events: local.events,
        };
        setMessages((prev) => [...prev, botMsg]);
        setLoading(false);
        return;
      }
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "bot", text: botText },
      ]);
    } catch {
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
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center animate-pulse-glow"
        data-ocid="ai_assistant.open_modal_button"
        aria-label="Open AI Assistant"
      >
        <Sparkles className="w-6 h-6" />
      </button>

      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-card border border-border rounded-2xl shadow-2xl flex flex-col"
          style={{ height: "500px" }}
        >
          <div className="flex items-center justify-between p-4 border-b border-border bg-primary/5 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <p className="font-display font-semibold text-sm">EventAI</p>
                <p className="text-xs text-muted-foreground">
                  Always here to help
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-ocid="ai_assistant.close_button"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-2xl rounded-br-sm" : "bg-muted text-foreground rounded-2xl rounded-bl-sm"} px-3 py-2 text-sm`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  {msg.events && msg.events.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {msg.events.map((ev) => (
                        <div
                          key={ev.id}
                          className="bg-background/80 rounded-lg p-2 flex gap-2 items-start"
                        >
                          <img
                            src={ev.imageUrl}
                            alt={ev.title}
                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-xs line-clamp-1">
                              {ev.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {ev.price === 0 ? "Free" : `$${ev.price}`}
                            </p>
                            <Link
                              href={`/events/${ev.id}`}
                              onClick={() => setOpen(false)}
                            >
                              <span className="text-xs text-primary hover:underline">
                                View Event →
                              </span>
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
                <div className="bg-muted rounded-2xl rounded-bl-sm px-3 py-2 text-sm text-muted-foreground">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-border flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about events..."
              className="text-sm"
              data-ocid="ai_assistant.input"
              disabled={loading}
            />
            <Button
              onClick={send}
              size="icon"
              className="bg-primary text-primary-foreground flex-shrink-0"
              data-ocid="ai_assistant.submit_button"
              disabled={loading}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
