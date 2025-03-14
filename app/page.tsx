"use client";

import { useState } from "react";
import { SignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import { Send } from "lucide-react";

export default function Home() {
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    {
      role: "assistant",
      content: "Hi! I'm Dottie, your executive assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    // TODO: Implement AI response logic here
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "I'm working on implementing my AI capabilities. For now, I can acknowledge your messages!",
      },
    ]);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">Dottie</h1>
        <SignedOut>
          <div className="flex justify-center">
            <SignIn />
          </div>
        </SignedOut>
        <SignedIn>
          <div className="bg-card rounded-lg shadow-lg p-6 min-h-[600px] flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "assistant" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.role === "assistant"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-md border bg-background px-4 py-2"
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground rounded-md px-4 py-2 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send
              </button>
            </form>
          </div>
        </SignedIn>
      </div>
    </main>
  );
}