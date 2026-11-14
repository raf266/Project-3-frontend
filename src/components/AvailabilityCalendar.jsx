
import { useState } from "react";
import "./AvailabilityCalendar.css";

function AvailabilityCalendar({ onAddSlot }) {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!date || !startTime || !endTime) {
      setError("Please complete all fields.");
      return;
    }

    const start = new Date(`${date}T${startTime}`);
    const end = new Date(`${date}T${endTime}`);

    if (start <= new Date() || end <= start) {
      setError("Please choose a valid future time range.");
      return;
    }

    onAddSlot({ date, startTime, endTime });
    setDate("");
    setStartTime("");
    setEndTime("");
  }

  return (
    <div className="availability-calendar">
      <h3>Availability Calendar</h3>
      <p>Select the dates and times you are available to teach.</p>

      <form onSubmit={handleSubmit}>
        <div className="availability-form">
          <div className="availability-field">
            <label htmlFor="availability-date">Date</label>
            <input
              id="availability-date"
              type="date"
              value={date}
              min={new Date().toLocaleDateString("en-CA")}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="availability-field">
            <label htmlFor="availability-start">Start Time</label>
            <input
              id="availability-start"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>

          <div className="availability-field">
            <label htmlFor="availability-end">End Time</label>
            <input
              id="availability-end"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
        </div>

        {error && (
          <p className="availability-error" role="alert">
            {error}
          </p>
        )}

        <button className="availability-button" type="submit">
          Add Available Time
        </button>
      </form>
    </div>
  );
}

export default AvailabilityCalendar;
