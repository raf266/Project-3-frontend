
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../services/api";
import "./Messages.css";

function Messages() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function getConversations() {
      try {
        const response = await api.get("/api/messages/conversations");
        setConversations(response.data);
      } catch (err) {
        console.error("Error loading conversations:", err);
        setError("Unable to load your conversations.");
      } finally {
        setLoading(false);
      }
    }

    getConversations();
  }, []);

  return (
    <div className="messages-page">
      <div className="messages-container">

        <div className="messages-heading">
          <h1>My Messages</h1>
          <p>Stay connected and keep sharing skills.</p>
        </div>

        {loading ? (
          <p className="messages-status">Loading conversations...</p>
        ) : error ? (
          <p className="messages-status">{error}</p>
        ) : conversations.length === 0 ? (
          <div className="empty-messages">
            <h2>No conversations yet</h2>
            <p>When you message another student, your conversations will appear here.</p>
            <button onClick={() => navigate("/skills")}>
              Explore Skills
            </button>
          </div>
        ) : (
          <div className="conversation-list">
            {conversations.map((conversation) => (
              <button
                key={conversation.userId}
                className="conversation-card"
                onClick={() => navigate(`/chat/${conversation.userId}`)}
              >
                <div className="conversation-avatar">
                  {conversation.user?.profileImage ? (
                    <img
                      src={conversation.user.profileImage}
                      alt={conversation.user.name}
                    />
                  ) : (
                    conversation.user?.name?.charAt(0).toUpperCase() || "?"
                  )}
                </div>

                <div className="conversation-info">
                  <h3>{conversation.user?.name || conversation.user?.username}</h3>
                  <p>{conversation.latestMessage.content}</p>
                </div>

                <div className="conversation-meta">
                  <span>
                    {new Date(
                      conversation.latestMessage.createdAt
                    ).toLocaleDateString()}
                  </span>

                  {conversation.unreadCount > 0 && (
                    <span className="unread-badge">
                      {conversation.unreadCount}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Messages;
