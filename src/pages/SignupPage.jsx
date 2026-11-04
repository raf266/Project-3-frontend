
import { useState } from "react";
import { useNavigate } from "react-router";
import { signUp } from "../services/authService";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    passwordConf: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const { username, name, email, password, passwordConf } = formData;

  function handleChange(event) {
    setError("");
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (password !== passwordConf) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setSubmitting(true);

      await signUp({
        username,
        name,
        email,
        password,
      });

      navigate("/sign-in");
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to sign up. Please try again."
      );
      setSubmitting(false);
    }
  }

  function isFormInvalid() {
    return !(username && name && email && password &&
      password === passwordConf);
  }

  return (
    <main>
      <h1>Sign Up</h1>
      <p className="error">{error}</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="confirm">Confirm Password:</label>
          <input
            type="password"
            id="confirm"
            name="passwordConf"
            value={passwordConf}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <button type="submit" disabled={isFormInvalid() || submitting}>
            {submitting ? "Signing up..." : "Sign Up"}
          </button>

          <button type="button" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}

export default Signup;
