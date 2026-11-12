
import { useState } from "react"
import { useNavigate, useParams } from "react-router"
import axios from "axios"
import "./SessionRequest.css";

function CreateSession() {
  const { skillId } = useParams()
  const navigate = useNavigate()

  const [date, setDate] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError("")
    setLoading(true)

    try {
      const token = localStorage.getItem("token")

      await axios.post(
       `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/sessions`,
        {
          skillId,
          date,
          message
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      navigate("/my-sessions")
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to create session"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="create-session-page">
       <h1 className="create-session-title">Request a Session</h1>
           <form className="create-session-form" onSubmit={handleSubmit}>
            <div className="session-form-group">
          <label>Select Date and Time</label>
          <input
            type="datetime-local"
            value={date}
            min={new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16)}
            onChange={(event) => setDate(event.target.value)}
            required
          />
        </div>

        <div>
          <label>Message (Optional)</label>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="What would you like to learn?"
          />
        </div>

       {error && <p className="session-error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Request Session"}
        </button>
      </form>
    </div>
  )
}

export default CreateSession
