import RouterManagement from "./router";
import { ChatbotProvider } from "./context/ChatbotContext";
import Chatbot from "./components/Chatbot/Chatbot";
import useAnalytics from "./hook/useAnalytics";
import useUserAnalytics from "./hook/useUserAnalytics";

function App() {
  // Initialize Google Analytics
  useAnalytics();

  // Initialize User Analytics (active users, new users, sessions)
  useUserAnalytics();

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
