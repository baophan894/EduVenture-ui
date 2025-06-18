import RouterManagement from "./router";
import { ChatbotProvider } from "./context/ChatbotContext";
import Chatbot from "./components/Chatbot/Chatbot";
import { useGA4 } from "./hook/useGA4";

function App() {
  // Initialize GA4 page view tracking
  useGA4();

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
