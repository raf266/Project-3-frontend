
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../services/api";
import "./Navbar.css";

function Navbar({ user, handleLogout }) {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // FETCH NOTIFICATIONS
  useEffect(() => {
    if (!user) {
      setNotifications([]);
      return;
    }

    async function fetchNotifications() {
      try {
        const response = await api.get("/api/notifications");
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    }

    fetchNotifications();

    const interval = setInterval(fetchNotifications, 10000);

    return () => clearInterval(interval);
  }, [user]);

  // COUNT UNREAD NOTIFICATIONS
  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  // OPEN NOTIFICATION
  async function handleNotificationClick(notification) {
    try {
      if (!notification.isRead) {
        await api.patch(
          `/api/notifications/${notification._id}/read`
        );

        setNotifications((previous) =>
          previous.map((item) =>
            item._id === notification._id
              ? { ...item, isRead: true }
              : item
          )
        );
      }

      setShowNotifications(false);

      if (notification.type === "new_message") {
        const senderId =
          typeof notification.senderId === "object"
            ? notification.senderId?._id
            : notification.senderId;

        if (senderId) {
          navigate(`/chat/${senderId}`);
        } else {
          navigate("/messages");
        }
      } else {
        navigate("/my-sessions");
      }
    } catch (error) {
      console.error("Error opening notification:", error);
    }
  }

  // MARK ALL AS READ
  async function handleMarkAllRead() {
    try {
      await api.patch("/api/notifications/read-all");

      setNotifications((previous) =>
        previous.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <span className="navbar-icon">⇄</span>
        <span className="navbar-name">
          SkillSwap<span className="navbar-dot">.</span>
        </span>
      </Link>

      {user ? (
        <div className="navbar-links">
          <Link to="/profile">My Profile</Link>
          <Link to="/skills">Explore Skills</Link>
          <Link to="/my-sessions">My Sessions</Link>
          <Link to="/messages" className="messages-nav-link">
            Messages
          </Link>

          {/* NOTIFICATION BELL */}
          <div className="notification-wrapper">
            <button
              className="notification-bell"
              onClick={() =>
                setShowNotifications(!showNotifications)
              }
              aria-label="Notifications"
            >
              🔔

              {unreadCount > 0 && (
                <span className="notification-count">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="notification-dropdown">
                <div className="notification-header">
                  <h3>Notifications</h3>

                  {unreadCount > 0 && (
                    <button
                      className="mark-all-read"
                      onClick={handleMarkAllRead}
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="notification-list">
                  {notifications.length === 0 ? (
                    <p className="no-notifications">
                      You're all caught up! 💜
                    </p>
                  ) : (
                    notifications.map((notification) => (
                      <button
                        key={notification._id}
                        className={`notification-item ${
                          !notification.isRead ? "unread" : ""
                        }`}
                        onClick={() =>
                          handleNotificationClick(notification)
                        }
                      >
                        <span className="notification-icon">
                          {notification.type === "new_message"
                            ? "💬"
                            : notification.type === "session_request"
                            ? "📩"
                            : notification.type === "session_accepted"
                            ? "✅"
                            : notification.type === "session_declined"
                            ? "❌"
                            : "📅"}
                        </span>

                        <span className="notification-content">
                          <span className="notification-message">
                            {notification.message}
                          </span>

                          <span className="notification-date">
                            {new Date(
                              notification.createdAt
                            ).toLocaleString()}
                          </span>
                        </span>

                        {!notification.isRead && (
                          <span className="notification-dot" />
                        )}
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <button className="signout-btn" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      ) : (
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>

          <Link to="/#how-it-works" className="nav-link">
            How It Works
          </Link>

          <Link to="/#about" className="nav-link">
            About
          </Link>

          <Link to="/sign-in" className="signin-btn">
            Sign In
          </Link>

          <Link to="/sign-up" className="signup-btn">
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
