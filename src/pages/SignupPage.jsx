
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { signUp } from "../services/authService";
import "./AuthPage.css";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    passwordConf: "",
  });

  const { username, name, email, password, passwordConf } = formData;

  function handleChange(event) {
    setError("");
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
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
        err.response?.data?.message ||
          "Unable to sign up. Please try again."
      );
      setSubmitting(false);
    }
  }

  function isFormInvalid() {
    return !(
      username &&
      name &&
      email &&
      password &&
      passwordConf &&
      password === passwordConf
    );
  }

  return (
    <main className="auth-page">
      <div className="auth-container">

        <section className="auth-brand-panel">
          <Link to="/" className="auth-brand">
            <span className="auth-logo">S</span>
            SkillSwap<span className="brand-dot">.</span>
          </Link>

          <div className="brand-content">
            <span className="brand-eyebrow">JOIN OUR COMMUNITY</span>
            <h1>
              Your next skill
              <span> starts here.</span>
            </h1>
            <p>
              Create your account, share what you know,
              and discover everything you can learn
              from fellow students.
            </p>

            <div className="brand-feature">
              <span>✦</span>
              Learn something new every day.
            </div>
            <div className="brand-feature">
              <span>✦</span>
              Share your knowledge with others.
            </div>
            <div className="brand-feature">
              <span>✦</span>
              Grow together through connection.
            </div>
          </div>

          <div className="brand-decoration brand-decoration-one"></div>
          <div className="brand-decoration brand-decoration-two"></div>

          <p className="brand-footer">
            Learn something new. Share what you know.
          </p>
        </section>

        <section className="auth-form-panel">
          <div className="auth-form-wrapper">
            <div className="auth-mobile-brand">
              <Link to="/" className="auth-brand">
                <span className="auth-logo">S</span>
                SkillSwap<span className="brand-dot">.</span>
              </Link>
            </div>

            <span className="form-eyebrow">GET STARTED</span>
            <h2>Create your account</h2>
            <p className="form-description">
              Join the community and start exchanging skills.
            </p>

            {error && (
              <div className="auth-error" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-field">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Choose a username"
                  value={username}
                  onChange={handleChange}
                  autoComplete="username"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="confirm">Confirm Password</label>
                <input
                  type="password"
                  id="confirm"
                  name="passwordConf"
                  placeholder="Enter your password again"
                  value={passwordConf}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
              </div>

              <button
                type="submit"
                className="auth-submit"
                disabled={isFormInvalid() || submitting}
              >
                {submitting ? "Creating account..." : "Create Account"}
                {!submitting && <span>→</span>}
              </button>

              <button
                type="button"
                className="auth-cancel"
                onClick={() => navigate("/")}
              >
                Back to Home
              </button>
            </form>

            <p className="auth-switch">
              Already have an account?{" "}
              <Link to="/sign-in">Sign In</Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Signup;
