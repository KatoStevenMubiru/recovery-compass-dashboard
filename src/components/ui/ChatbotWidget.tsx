import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can I help you today?" },
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { from: "user", text: input }]);
    setInput("");
    setLoading(true);
    setError("");
    let botMsgIndex = null;
    try {
      const response = await fetch(`${API_URL}/api/chatbot/ask/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      if (!response.ok || !response.body)
        throw new Error("Failed to get reply");
      // Add a placeholder for the bot's message
      setMessages((msgs) => {
        botMsgIndex = msgs.length;
        return [...msgs, { from: "bot", text: "" }];
      });
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let botText = "";
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          botText += decoder.decode(value, { stream: !done });
          setMessages((msgs) => {
            // Update the last bot message with the new text
            const updated = [...msgs];
            updated[botMsgIndex] = { from: "bot", text: botText };
            return updated;
          });
        }
      }
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: "Sorry, there was an error. Please try again." },
      ]);
      setError("Failed to get reply from chatbot.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Floating Button */}
      <div
        className="fixed z-50 bottom-6 right-6 md:bottom-8 md:right-8"
        style={{ pointerEvents: open ? "none" : "auto" }}
      >
        <Button
          size="icon"
          className="rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-transform duration-300"
          style={{ transform: open ? "scale(0.8)" : "scale(1)" }}
          onClick={() => setOpen(true)}
          aria-label="Open chat"
        >
          <MessageCircle className="h-7 w-7" />
        </Button>
      </div>

      {/* Chat Window Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-end md:items-center md:justify-end pointer-events-none">
          {/* Backdrop for mobile */}
          <div
            className="absolute inset-0 bg-black/30 transition-opacity duration-300 md:hidden"
            onClick={() => setOpen(false)}
            style={{ pointerEvents: "auto" }}
          />
          <div
            className="relative w-full max-w-full md:max-w-sm m-0 md:m-8 pointer-events-auto"
            style={{
              transition: "transform 0.3s cubic-bezier(.4,2,.6,1)",
              transform: open ? "translateY(0)" : "translateY(100%)",
            }}
          >
            <div className="bg-white dark:bg-zinc-900 rounded-t-2xl md:rounded-2xl shadow-2xl flex flex-col h-[70vh] max-h-[500px] md:h-[500px] w-full md:w-96 animate-fadeInUp">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-muted bg-primary/90 rounded-t-2xl md:rounded-t-2xl">
                <span className="font-semibold text-primary-foreground">
                  Chat with us
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-primary-foreground hover:bg-primary/20"
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 bg-muted/40">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      msg.from === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[80%] text-sm shadow-sm ${
                        msg.from === "user"
                          ? "bg-primary text-primary-foreground rounded-br-none"
                          : "bg-white dark:bg-zinc-800 text-foreground rounded-bl-none border border-muted"
                      }`}
                    >
                      {msg.from === "bot"
                        ? (() => {
                            let text = msg.text;
                            try {
                              const parsed = JSON.parse(msg.text);
                              if (
                                parsed &&
                                typeof parsed === "object" &&
                                parsed.reply
                              ) {
                                text = parsed.reply;
                              }
                            } catch (e) {
                              // Ignore JSON parse errors, fallback to plain text
                            }
                            return <ReactMarkdown>{text}</ReactMarkdown>;
                          })()
                        : msg.text}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="rounded-lg px-4 py-2 max-w-[80%] text-sm shadow-sm bg-white dark:bg-zinc-800 text-foreground rounded-bl-none border border-muted opacity-70">
                      ...
                    </div>
                  </div>
                )}
                {error && (
                  <div className="text-xs text-red-500 px-2 pt-1">{error}</div>
                )}
                <div ref={chatEndRef} />
              </div>
              {/* Input */}
              <form
                className="flex items-center gap-2 px-4 py-3 border-t border-muted bg-background"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
              >
                <input
                  className="flex-1 rounded-full border border-muted px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  autoFocus
                />
                <Button
                  type="submit"
                  size="icon"
                  className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={!input.trim()}
                  aria-label="Send message"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.3s cubic-bezier(.4,2,.6,1);
        }
      `}</style>
    </div>
  );
};

export default ChatbotWidget;
