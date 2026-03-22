import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import { Bot, Send, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { events } from "../data/events";
import type { Event } from "../data/events";

interface Message {
  id: number;
  role: "user" | "bot";
  text: string;
  events?: Event[];
}

function getAIResponse(input: string): { text: string; events?: Event[] } {
  const q = input.toLowerCase();
  if (q.includes("help"))
    return {
      text: "Hi! I'm EventAI 🤖 I can help you find events. Try asking me:\n• 'Suggest popular events'\n• 'Find music events'\n• 'Show cheap events'\n• 'Tech events near me'",
    };
  if (q.includes("popular") || q.includes("top") || q.includes("best"))
    return {
      text: "Here are the top-rated events right now! 🌟",
      events: [...events].sort((a, b) => b.rating - a.rating).slice(0, 3),
    };
  if (q.includes("free") || q.includes("cheap") || q.includes("budget"))
    return {
      text: "Here are some affordable events you'll love! 💰",
      events: events.filter((e) => e.price <= 20).slice(0, 3),
    };
  if (q.includes("music"))
    return {
      text: "Check out these amazing music events! 🎵",
      events: events.filter((e) => e.category === "Music").slice(0, 3),
    };
  if (q.includes("tech") || q.includes("technology"))
    return {
      text: "Here are top tech events for you! 💻",
      events: events.filter((e) => e.category === "Technology").slice(0, 3),
    };
  if (q.includes("sport") || q.includes("fitness") || q.includes("run"))
    return {
      text: "Get active with these sports events! 🏃",
      events: events.filter((e) => e.category === "Sports").slice(0, 3),
    };
  if (q.includes("food") || q.includes("eat") || q.includes("cuisine"))
    return {
      text: "Foodies unite! Here are some delicious events! 🍔",
      events: events.filter((e) => e.category === "Food").slice(0, 3),
    };
  if (q.includes("art") || q.includes("culture"))
    return {
      text: "Explore these beautiful arts & culture events! 🎨",
      events: events.filter((e) => e.category === "Arts").slice(0, 3),
    };
  if (q.includes("business") || q.includes("network") || q.includes("startup"))
    return {
      text: "Level up your career with these business events! 📊",
      events: events.filter((e) => e.category === "Business").slice(0, 3),
    };
  if (q.includes("recommend") || q.includes("suggest") || q.includes("what"))
    return {
      text: "Based on what's trending, here are my top recommendations! ✨",
      events: events.filter((e) => e.isFeatured).slice(0, 3),
    };
  return {
    text: "I can help you find events! Try asking about music events, tech conferences, sports activities, food festivals, or just say 'recommend' for top picks. 🎉",
  };
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "bot",
      text: "Hello! I'm EventAI 🤖 Your personal event discovery assistant. Ask me to recommend events, find music festivals, tech conferences, or anything else!",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on message change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg: Message = { id: Date.now(), role: "user", text };
    const resp = getAIResponse(text);
    const botMsg: Message = {
      id: Date.now() + 1,
      role: "bot",
      text: resp.text,
      events: resp.events,
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
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
                              to="/events/$id"
                              params={{ id: String(ev.id) }}
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
            />
            <Button
              onClick={send}
              size="icon"
              className="bg-primary text-primary-foreground flex-shrink-0"
              data-ocid="ai_assistant.submit_button"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
