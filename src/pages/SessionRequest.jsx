
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import api from "../services/api";
import "./SessionRequest.css";

function SessionRequest() {
  const { skillId } = useParams();
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [availability, setAvailability] = useState([]);
  const [availabilityLoading, setAvailabilityLoading] = useState(true);

  useEffect(() => {
    async function loadAvailability() {
      try {
        setAvailabilityLoading(true);
        setError("");

        const response = await api.get(`/skills/${skillId}`);
        setAvailability(response.data.availability || []);
      } catch (error) {
        setError("Unable to load available times.");
        setAvailability([]);
      } finally {
        setAvailabilityLoading(false);
      }
    }

    if (skillId) {
      loadAvailability();
    } else {
      setError("No skill selected.");
      setAvailabilityLoading(false);
    }
  }, [skillId]);

  const availableSlots = availability.filter((slot) => {
    const slotDate = String(slot.date).slice(0, 10);
    const start = new Date(`${slotDate}T${slot.startTime}`);

    return !Number.isNaN(start.getTime()) && start > new Date();
  });

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const selectedSlot = availableSlots.find((slot) => {
      const slotDate = String(slot.date).slice(0, 10);
      return `${slotDate}T${slot.startTime}` === date;
    });

    if (!selectedSlot) {
      setError("Please select one of the teacher's available times.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/sessions`,
        {
          skillId,
          date: new Date(date).toISOString(),
          message
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      navigate("/my-sessions");
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to create session"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="create-session-page">
      <h1 className="create-session-title">Request a Session</h1>

      <form className="create-session-form" onSubmit={handleSubmit}>
        <div className="session-form-group">
          <label htmlFor="session-date">Choose an Available Time</label>

          {availabilityLoading ? (
            <p>Loading available times...</p>
          ) : availableSlots.length === 0 ? (
            <p>This teacher has no upcoming available times.</p>
          ) : (
            <select
              id="session-date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
            >
              <option value="">Select an available time</option>

              {availableSlots.map((slot) => {
                const slotDate = String(slot.date).slice(0, 10);
                const slotValue = `${slotDate}T${slot.startTime}`;

                return (
                  <option
                    key={slot._id || slotValue}
                    value={slotValue}
                  >
                    {slotDate} | {slot.startTime} - {slot.endTime}
                  </option>
                );
              })}
            </select>
          )}
        </div>

        <div className="session-form-group">
          <label htmlFor="session-message">Message (Optional)</label>
          <textarea
            id="session-message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="What would you like to learn?"
          />
        </div>

        {error && (
          <p className="session-error" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={
            loading ||
            availabilityLoading ||
            availableSlots.length === 0 ||
            !date
          }
        >
          {loading ? "Submitting..." : "Request Session"}
        </button>
      </form>
    </div>
  );
}

export default SessionRequest;
