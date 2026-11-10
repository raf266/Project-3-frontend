
import { useState } from "react"
import { useNavigate, useParams } from "react-router"
import axios from "axios"

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
        `${import.meta.env.VITE_API_URL}/sessions`,
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
    <div>
      <h1>Request a Session</h1>

      <form onSubmit={handleSubmit}>
        <div>
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

        {error && <p>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Request Session"}
        </button>
      </form>
    </div>
  )
}

export default CreateSession
