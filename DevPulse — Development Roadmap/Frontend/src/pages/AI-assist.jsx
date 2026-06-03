import React, { useState, useRef } from "react";
import { FaPaperPlane, FaRobot, FaMicrophone, FaPlus } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
const AI_assist = () => {
  const { user } = useAuth();
  const userName = user?.name || "there";
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: `Hello ${userName} 👋 I am your AI assistant. How can I help you today?`,
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState("");
  const recognitionRef = useRef(null);
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in your browser");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };

    const userText = input;
    setInput("");
    setIsTyping(true);

    // add user message + empty AI message
    setMessages((prev) => [...prev, userMsg, { role: "ai", text: "" }]);

    try {
      const res = await fetch("http://localhost:5000/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userText,
        }),
      });

      const data = await res.json();
      const fullText = data?.reply || "No response from AI";

      let index = 0;
      let streamedText = "";

      const interval = setInterval(() => {
        streamedText += fullText[index] || "";
        index++;

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "ai",
            text: streamedText,
          };
          return updated;
        });

        if (index >= fullText.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 20);
    } catch (error) {
      setIsTyping(false);

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "ai",
          text: "❌ AI error: " + error.message,
        };
        return updated;
      });
    }
  };
  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      {/* LEFT SIDEBAR */}
      <div className="w-1/4 bg-white border-r p-4 hidden md:block h-full overflow-hidden">
        <h2 className="text-xl font-bold mb-4">AI Assist</h2>

        <button className="w-full flex items-center gap-2 bg-blue-600 text-white py-2 px-3 rounded-lg">
          <FaPlus /> New Chat
        </button>

        <div className="mt-4 space-y-2 text-sm text-gray-600 overflow-y-auto">
          <p className="p-2 hover:bg-gray-100 rounded cursor-pointer">
            🔥 React help chat
          </p>
          <p className="p-2 hover:bg-gray-100 rounded cursor-pointer">
            💻 Backend debugging
          </p>
          <p className="p-2 hover:bg-gray-100 rounded cursor-pointer">
            🚀 Project ideas
          </p>
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col h-full">
        {/* HEADER */}
        <div className="p-4 border-b bg-white flex items-center gap-2 shrink-0">
          <FaRobot className="text-blue-600 text-xl" />
          <h1 className="font-semibold text-lg">AI Assistant</h1>
        </div>

        {/* MESSAGES (ONLY SCROLL AREA) */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[70%] p-3 rounded-xl text-sm ${
                msg.role === "user"
                  ? "ml-auto bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              <span>AI is typing...</span>
            </div>
          )}
        </div>

        {/* INPUT (FIXED HEIGHT) */}
        <div className="p-4 border-t bg-white flex items-center gap-2 shrink-0">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything..."
            className="flex-1 border rounded-lg px-4 py-2 outline-none"
          />
          {isListening && (
            <div className="flex items-center justify-center gap-2 text-red-500 text-sm mb-2 animate-pulse">
              <FaMicrophone />
              <span>Listening...</span>
            </div>
          )}

          <button
            onClick={startListening}
            className={`relative p-3 rounded-full transition-all duration-300 ${
              isListening
                ? "bg-red-500 text-white scale-110"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <FaMicrophone />

            {isListening && (
              <>
                <span className="absolute inset-0 rounded-full border-4 border-red-400 animate-ping"></span>
                <span className="absolute inset-0 rounded-full border-2 border-red-300 animate-pulse"></span>
              </>
            )}
          </button>

          <button
            onClick={sendMessage}
            className="p-2 bg-blue-600 text-white rounded-lg"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AI_assist;
