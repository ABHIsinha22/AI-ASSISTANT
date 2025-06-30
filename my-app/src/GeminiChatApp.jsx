
import "./styles.css";
import ReactMarkdown from "react-markdown";
import { useState, useEffect, useRef } from "react";

function AiAssistant() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // 🔁 Auto-scroll when chatLog updates
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatLog]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setChatLog((prev) => [...prev, userMessage]);
    setLoading(true);
    setInput("");

    try {
      const res = await fetch("http://localhost:5001/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Backend error: ${res.status} - ${errorData.error || 'Unknown error'}`);
      }

      const data = await res.json();
      const botMessage = { role: "bot", text: data.response };
      setChatLog((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        role: "bot",
        text: `Error: ${error.message || 'Could not get a response.'}`
      };
      setChatLog((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="chat-window">
        <div className="header">
          <h1 className="title gradient-text">AI ASSISTANT</h1>
          <p className="subtitle">Ask me anything — Get help, ideas, code, and more.</p>
        </div>

        <div className="chat-messages">
          {chatLog.map((msg, i) => (
            <div key={i} className={`chat-bubble ${msg.role === "user" ? "user" : "bot"}`}>
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          ))}

          {loading && (
            <div className="chat-bubble bot typing">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        <div className="chat-input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="chat-input"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage} className="send-btn go-btn">
            GO
          </button>
        </div>
      </div>
    </div>
  );
}

export default AiAssistant;
