import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, MicOff, Search, ShoppingCart, Home, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { useStore } from "@/src/store/useStore";

// Speech Recognition API Types
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly length: number;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

export default function VoiceHandler() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const navigate = useNavigate();
  const { cart } = useStore();

  const processCommand = useCallback((command: string) => {
    const cmd = command.toLowerCase();
    
    if (cmd.includes("home")) {
      navigate("/");
      toast.info("Navigating to Home");
    } else if (cmd.includes("products") || cmd.includes("market")) {
      navigate("/products");
      toast.info("Opening Marketplace");
    } else if (cmd.includes("cart") || cmd.includes("bag")) {
      navigate("/cart");
      toast.info("Opening Shopping Bag");
    } else if (cmd.includes("search")) {
      const query = cmd.replace("search", "").trim();
      navigate(`/products?search=${query}`);
      toast.info(`Searching for: ${query}`);
    } else if (cmd.includes("hello") || cmd.includes("hi")) {
      const utterance = new SpeechSynthesisUtterance("Hello! Welcome to Next Gen Market. How can I assist you?");
      window.speechSynthesis.speak(utterance);
    } else {
      toast.error(`Unknown command: ${command}`);
    }
  }, [navigate]);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn("Speech recognition not supported in this browser");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      processCommand(result);
    };

    if (isListening) {
      recognition.start();
    }

    return () => {
      recognition.stop();
    };
  }, [isListening, processCommand]);

  return (
    <div className="fixed bottom-6 left-6 z-[100]">
      <div className="flex flex-col items-start space-y-4">
        <AnimatePresence>
          {isListening && (
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.8 }}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-full shadow-2xl flex items-center space-x-3 backdrop-blur-xl"
            >
              <div className="flex space-x-1">
                <div className="h-2 w-2 bg-white rounded-full animate-bounce" />
                <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest">Listening...</span>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          size="lg"
          variant={isListening ? "destructive" : "default"}
          className={`h-16 w-16 rounded-full shadow-2xl transition-all duration-300 ${isListening ? "animate-pulse" : ""}`}
          onClick={() => setIsListening(!isListening)}
        >
          {isListening ? <MicOff className="h-7 w-7" /> : <Mic className="h-7 w-7" />}
        </Button>
      </div>
    </div>
  );
}
