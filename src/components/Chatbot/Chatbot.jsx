import { useChatbot } from "../../context/ChatbotContext";
import useIsLogin from "../../hook/user/useIsLogin";
import { useState, useEffect, useRef } from "react";
import { getGeminiResponse } from "../../services/gemini";
import { trackChatbotMessage } from "../../services/analytics";

const Chatbot = () => {
  const { isOpen, toggleChat } = useChatbot();
  const isAuthenticated = useIsLogin();
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content:
        "Hello! I'm EduBot, your educational assistant. How can I help you with your learning journey today?",
    },
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Track user message
    trackChatbotMessage("user_message");

    // Add user message
    setMessages((prev) => [...prev, { type: "user", content: message }]);
    setMessage("");

    // Show typing indicator
    setIsTyping(true);

    try {
      // Get response from Gemini
      const response = await getGeminiResponse(message);

      // Track bot response
      trackChatbotMessage("bot_response");

      // Add bot response
      setMessages((prev) => [...prev, { type: "bot", content: response }]);
    } catch (error) {
      // Track error
      trackChatbotMessage("bot_error");

      // Handle error
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content:
            "I apologize, but I encountered an error. Please try again later.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat Window with Animation */}
      <div
        className={`fixed bottom-24 right-5 w-96 h-[500px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 transform transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        <div className="bg-[#469B74] text-white p-4 rounded-t-xl flex justify-between items-center">
          <h3 className="text-lg font-semibold">Chat with EduBot</h3>
          <button
            onClick={toggleChat}
            className="text-white hover:text-gray-200 text-2xl transition-transform hover:scale-110 duration-300"
          >
            ×
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.type === "user" ? "justify-end" : "justify-start"
              } animate-fadeIn`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 transform transition-all duration-300 ${
                  msg.type === "user"
                    ? "bg-[#469B74] text-white rounded-br-none hover:scale-105"
                    : "bg-gray-100 text-gray-800 rounded-bl-none hover:scale-105"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start animate-fadeIn">
              <div className="bg-gray-100 rounded-lg p-3 rounded-bl-none">
                <div className="flex space-x-2">
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-gray-100">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#469B74] focus:ring-1 focus:ring-[#469B74] transition-all duration-300"
            />
            <button
              onClick={handleSendMessage}
              disabled={isTyping}
              className={`px-4 py-2 bg-[#469B74] text-white rounded-lg hover:bg-[#3a8963] transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                isTyping ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Chat Button with Animation */}
      <button
        onClick={toggleChat}
        className="w-14 h-14 bg-[#469B74] text-white rounded-full shadow-lg hover:bg-[#3a8963] transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-300"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>
    </div>
  );
};

export default Chatbot;
