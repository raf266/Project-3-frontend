
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../services/api";
import "./Chat.css";

function Chat() {
  const { userId } = useParams();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const currentUser = JSON.parse(
    atob(localStorage.getItem("token").split(".")[1])
  );

  async function getMessages() {
    try {
      const response = await api.get(`/api/messages/${userId}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error loading messages:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSendMessage(e) {
    e.preventDefault();

    if (!newMessage.trim() || sending) return;

    try {
      setSending(true);

      const response = await api.post(`/api/messages/${userId}`, {
        content: newMessage,
      });

      setMessages((previousMessages) => [
        ...previousMessages,
        response.data,
      ]);

      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert(error.response?.data?.message || "Failed to send message.");
    } finally {
      setSending(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    setMessages([]);

    getMessages();

    const interval = setInterval(() => {
      api.get(`/api/messages/${userId}`)
        .then((response) => setMessages(response.data))
        .catch((error) => console.error("Error refreshing messages:", error));
    }, 3000);

    return () => clearInterval(interval);
  }, [userId]);

  return (
    <div className="chat-page">
      <div className="chat-container">

        
<div className="chat-header">
  <button
    className="chat-back-btn"
    onClick={() => window.history.back()}
  >
    ← Back
  </button>

  <h1>SkillSwap Chat</h1>
  <p>Connect, communicate and share skills.</p>
</div>


        <div className="chat-messages">
          {loading ? (
            <p className="chat-placeholder">Loading messages...</p>
          ) : messages.length === 0 ? (
            <p className="chat-placeholder">
              No messages yet. Say hello and start the conversation!
            </p>
          ) : (
            messages.map((message) => {
              const isMine = message.senderId === currentUser._id;

              return (
                <div
                  key={message._id}
                  className={`message-row ${isMine ? "my-message" : "their-message"}`}
                >
                  <div className="message-bubble">
                    <p>{message.content}</p>
                    <span>
                      {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <form className="chat-input-form" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Write your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            maxLength={2000}
          />

          <button type="submit" disabled={!newMessage.trim() || sending}>
            {sending ? "Sending..." : "Send"}
          </button>
        </form>

      </div>
    </div>
  );
}

export default Chat;
