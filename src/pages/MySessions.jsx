
import { useState } from "react";

const sampleSessions = [
  { _id: "1",
    skill: "Python Programming",
    user: "Sarah", date: "2026-12-15",
    status: "Pending",
    type: "outgoing" },

  { _id: "2",
    skill: "Graphic Design",
    user: "Raghad",
    date: "2026-12-18",
    status: "Pending",
    type: "incoming" },

  { _id: "3",
    skill: "Web Development",
    user: "Waad",
    date: "2026-12-20",
    status: "Accepted",
    type: "incoming" }
];

function MySessions() {
  const [sessions, setSessions] = useState(sampleSessions);
  const [activeTab, setActiveTab] = useState("all");

  const filteredSessions = sessions.filter((session) => activeTab === "all" || session.type === activeTab);

  const updateSessionStatus = (sessionId, newStatus) => {
    setSessions((previousSessions) =>
      previousSessions.map((session) =>
        session._id === sessionId ? { ...session, status: newStatus } : session
      )
    );
  };

  const totalSessions = sessions.length;
  const pendingSessions = sessions.filter((session) => session.status === "Pending").length;
  const acceptedSessions = sessions.filter((session) => session.status === "Accepted").length;
  const completedSessions = sessions.filter((session) => session.status === "Completed").length;

  return (
    <div>
      <h1>My Sessions</h1>

      <p>Manage your learning and teaching sessions.</p>

      <h2>Session Overview</h2>

      <p>Total Sessions: {totalSessions}</p>
      <p>Pending Sessions: {pendingSessions}</p>
      <p>Accepted Sessions: {acceptedSessions}</p>
      <p>Completed Sessions: {completedSessions}</p>


      <h2>Filter Sessions</h2>
      <button onClick={() => setActiveTab("all")}>All Sessions</button>
      <button onClick={() => setActiveTab("incoming")}>Incoming</button>
      <button onClick={() => setActiveTab("outgoing")}>Outgoing</button>


      <h2>
        {activeTab === "all" ? "All Sessions" : activeTab === "incoming" ? "Incoming Sessions" : "Outgoing Sessions"}
      </h2>
      {filteredSessions.length === 0 ? (
        <p>No sessions found.</p>
      ) : (
        filteredSessions.map((session) => (
          <div key={session._id}>
            <h3>{session.skill}</h3>
            <p>User: {session.user}</p>
            <p>Date: {session.date}</p>
            <p>Type: {session.type}</p>
            <p>Status: {session.status}</p>

            {session.type === "incoming" && session.status === "Pending" && (
              <div>
                <button onClick={() => updateSessionStatus(session._id, "Accepted")}>Accept</button>
                <button onClick={() => updateSessionStatus(session._id, "Rejected")}>Reject</button>
              </div>
            )}
            {["Pending", "Accepted"].includes(session.status) && (
              <button onClick={() => updateSessionStatus(session._id, "Cancelled")}>Cancel</button>
            )}
            {session.type === "incoming" && session.status === "Accepted" && (
              <button onClick={() => updateSessionStatus(session._id, "Completed")}>Complete</button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default MySessions;
