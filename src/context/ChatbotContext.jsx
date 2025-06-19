import { createContext, useContext, useState } from "react";

const ChatbotContext = createContext();

export const ChatbotProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <ChatbotContext.Provider value={{ isOpen, toggleChat }}>
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error("useChatbot must be used within a ChatbotProvider");
  }
  return context;
};
