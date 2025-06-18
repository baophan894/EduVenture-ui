import RouterManagement from "./router";
import { ChatbotProvider } from "./context/ChatbotContext";
import Chatbot from "./components/Chatbot/Chatbot";
import useAnalytics from "./hook/useAnalytics";

function App() {
  // Initialize Google Analytics
  useAnalytics();

  return (
    <ChatbotProvider>
      <div>
        <RouterManagement />
        <Chatbot />
      </div>
    </ChatbotProvider>
  );
}

export default App;
