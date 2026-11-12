
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { createSession, getMySessions, updateSessionStatus } from "../services/sessionService.js";
import "./MySessions.css";
function MySessions({ user }) {
  const [sessions, setSessions] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const skillId = searchParams.get("skillId");
  const userId = user?.id || user?._id || user?.userId;

  const loadSessions = async () => {
    try {
      const data = await getMySessions();
      setSessions(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  const getType = (session) => {
    const providerId = session.providerId?._id || session.providerId;
    return providerId?.toString() === userId?.toString() ? "incoming" : "outgoing";
  };

  const filteredSessions = sessions.filter((session) =>
    activeTab === "all" || getType(session) === activeTab
  );

  const handleRequest = async (e) => {
    e.preventDefault();
    setError("");
    const sessionDate = new Date(date);
    if (!skillId || !date || Number.isNaN(sessionDate.getTime()) || sessionDate <= new Date()) {
      setError("Please select a valid skill and future date.");
      return;
    }
    try {
      setBusy(true);
      await createSession({ skillId, date: sessionDate.toISOString(), message });
      await loadSessions();
      setDate("");
      setMessage("");
      setActiveTab("outgoing");
      navigate("/my-sessions");
    } catch (error) {
      setError(error.message);
    } finally {
      setBusy(false);
    }
  };

  const handleStatus = async (sessionId, action) => {
    try {
      setBusy(true);
      setError("");
      await updateSessionStatus(sessionId, action);
      await loadSessions();
    } catch (error) {
      setError(error.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="my-sessions-page">
      <h1 className="sessions-title">My Sessions</h1>
<p className="sessions-subtitle">Manage your learning and teaching sessions.</p>
      {skillId && (
        <div className="session-request-card">
          <h2>Request a Session</h2>
         <form onSubmit={handleRequest} className="session-request-form">
            <div>
              <label htmlFor="date">Preferred Date and Time:</label>
              <input id="date" type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="message">Message (Optional):</label>
              <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What would you like to learn?" />
            </div>
            <button type="submit" disabled={busy}>Send Request</button>
          </form>
          <hr />
        </div>
      )}
      <div className="sessions-overview">
      <h2>Session Overview</h2>
      <p>Total Sessions: {sessions.length}</p>
      <p>Pending Sessions: {sessions.filter(s => s.status === "Pending").length}</p>
      <p>Accepted Sessions: {sessions.filter(s => s.status === "Accepted").length}</p>
      <p>Completed Sessions: {sessions.filter(s => s.status === "Completed").length}</p>
      <div className="sessions-filters">
      <h2>Filter Sessions</h2>
      <button onClick={() => setActiveTab("all")}>All Sessions</button>
      <button onClick={() => setActiveTab("incoming")}>Incoming</button>
      <button onClick={() => setActiveTab("outgoing")}>Outgoing</button>
      {error && <p className="sessions-error" role="alert">{error}</p>}
      {loading ? (
        <p className="sessions-loading">Loading sessions...</p>
      ) : filteredSessions.length === 0 ? (
       <p className="sessions-empty">No sessions found.</p>
      ) : (
        filteredSessions.map((session) => {
          const type = getType(session);
          const otherUser = type === "incoming" ? session.requesterId : session.providerId;
           console.log({
    type,
    status: session.status,
    providerId: session.providerId?._id || session.providerId,
    requesterId: session.requesterId?._id || session.requesterId,
    userId
  });
          return (
           <div key={session._id} className="session-card">
              <h3>{session.skillId?.title || "Skill"}</h3>
              <p>{type === "incoming" ? "Requested by" : "Teacher"}: {otherUser?.name || "User"}</p>
              <p>Date: {new Date(session.date).toLocaleString()}</p>
              <p>Type: {type}</p>
              <p>Status: {session.status}</p>
              <p>Message: {session.message || "No message"}</p>
              {type === "incoming" && session.status === "Pending" && (
                <>
                  <button disabled={busy} onClick={() => handleStatus(session._id, "accept")}>Accept</button>
                  <button disabled={busy} onClick={() => handleStatus(session._id, "reject")}>Decline</button>
                </>
              )}
             {(
  (type === "incoming" && ["Pending", "Accepted"].includes(session.status)) ||
  (type === "outgoing" && session.status === "Accepted")
) && (
  <button
    disabled={busy}
    onClick={() => handleStatus(session._id, "cancel")}
  >
    Cancel
  </button>
)}

              {type === "incoming" && session.status === "Accepted" && (
                <button disabled={busy} onClick={() => handleStatus(session._id, "complete")}>Complete</button>
              )}
              <hr />
            </div>
          );
        })
      )}
    </div>
    </div>
    </div>
  );
}

export default MySessions;
