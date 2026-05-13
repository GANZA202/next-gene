import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Sparkles, Bot, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "@/src/store/useStore";
import { GoogleGenAI } from "@google/genai";
import { toast } from "sonner";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "bot"; content: string }[]>([
    { role: "bot", content: "Hello! I'm your NextGen AI assistant. How can I help you find the future today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { user } = useStore();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: messageText }]);
    setInput("");
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: (process.env as any).GEMINI_API_KEY });
      const model = "gemini-3-flash-preview";
      
      const prompt = `
        You are the AI assistant for NextGen Market, a premium luxury and tech eCommerce platform.
        You are helpful, sophisticated, and can recommend products like iPhones, Ferraris, and MacBooks.
        Context: The user is ${user?.name || "a guest"}.
        User message: ${messageText}
      `;

      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          systemInstruction: "You are the NextGen Market AI. Keep responses concise and premium.",
        }
      });

      const botResponse = response.text || "I'm sorry, I'm having trouble connecting to the data core right now.";
      setMessages((prev) => [...prev, { role: "bot", content: botResponse }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages((prev) => [...prev, { role: "bot", content: "Apologies, my synaptic pathways are temporarily offline. Please try again soon." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4"
          >
            <Card className="w-[350px] md:w-[400px] h-[550px] shadow-2xl border-none outline-none rounded-[40px] overflow-hidden flex flex-col bg-background/80 backdrop-blur-xl">
              <CardHeader className="bg-primary p-6 text-primary-foreground flex flex-row items-center justify-between">
                <div className="flex items-center space-x-3">
                   <div className="bg-white/20 p-2 rounded-2xl backdrop-blur-md">
                     <Sparkles className="h-5 w-5" />
                   </div>
                   <div>
                     <CardTitle className="text-lg font-black uppercase tracking-tight">NextGen AI</CardTitle>
                     <p className="text-[8px] uppercase tracking-widest font-bold opacity-70">Quantum Assistant v4.0</p>
                   </div>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </CardHeader>
              
              <CardContent className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-none" ref={scrollRef}>
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] rounded-3xl p-4 text-sm ${
                      msg.role === "user" 
                      ? "bg-primary text-primary-foreground rounded-tr-none" 
                      : "bg-muted text-foreground rounded-tl-none font-medium leading-relaxed"
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-3xl p-4 rounded-tl-none">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 bg-primary/40 rounded-full animate-bounce" />
                        <div className="h-2 w-2 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="h-2 w-2 bg-primary/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>

              <div className="p-6 bg-muted/50">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  className="flex space-x-2"
                >
                  <input
                    type="text"
                    placeholder="Ask anything..."
                    className="flex-1 h-12 bg-background rounded-2xl px-4 text-sm focus:outline-none ring-offset-background border-none focus:ring-2 focus:ring-primary shadow-sm"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <Button type="submit" size="icon" className="h-12 w-12 rounded-2xl shadow-lg shadow-primary/20">
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        size="lg"
        className={`h-16 w-16 rounded-full shadow-2xl transition-all duration-300 ${isOpen ? "rotate-90 scale-0" : "scale-100"}`}
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare className="h-7 w-7" />
      </Button>
    </div>
  );
}
