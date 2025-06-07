import RouterManagement from "./router";
import { ChatbotProvider } from "./context/ChatbotContext";
import Chatbot from "./components/Chatbot/Chatbot";

function App() {
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
