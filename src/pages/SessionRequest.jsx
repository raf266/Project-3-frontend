
import { useState } from "react";

function SessionRequest() {
  const [skillId, setSkillId] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const sessionDate = new Date(date);

    if (sessionDate <= new Date()) {
      alert("Please select a future date and time");
      return;
    }

    const sessionData = {
      skillId,
      date: sessionDate.toISOString(),
      message
    };

    console.log("Session Request:", sessionData);
    setSubmitted(true);
  };

  return (
    <div>
      <h1>Request a Session</h1>
      <p>Choose a skill and schedule your learning session.</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="skillId">Skill ID:</label>
          <input
            id="skillId"
            type="text"
            value={skillId}
            onChange={(e) => setSkillId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Date and Time:</label>
          <input
            id="date"
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a message to the teacher..."
          />
        </div>
        <button type="submit">Request Session</button>
      </form>

      {submitted && (
        <p>Session request submitted in test mode!</p>
      )}
    </div>
  );
}

export default SessionRequest;
