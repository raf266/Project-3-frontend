
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { signIn } from "../services/authService";
import "./AuthPage.css";

const SignInForm = ({ setUser }) => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [submitting, setSubmitting] = useState(false);

  function handleChange(event) {
    setError("");
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSubmitting(true);

      const signedInUser = await signIn(formData);

      setUser(signedInUser);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to sign in. Please try again."
      );
      setSubmitting(false);
    }
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
            <span className="brand-eyebrow">WELCOME BACK</span>
            <h1>
              Your learning
              <span> journey continues.</span>
            </h1>
            <p>
              Sign in to reconnect with students,
              explore new skills, and continue
              sharing your knowledge.
            </p>

            <div className="brand-feature">
              <span>✦</span>
              Discover new skills to learn.
            </div>
            <div className="brand-feature">
              <span>✦</span>
              Connect with fellow students.
            </div>
            <div className="brand-feature">
              <span>✦</span>
              Keep growing and sharing.
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

            <span className="form-eyebrow">WELCOME BACK</span>
            <h2>Sign in to SkillSwap</h2>
            <p className="form-description">
              Enter your details to access your account.
            </p>

            {error && (
              <div className="auth-error" role="alert">
                {error}
              </div>
            )}

            <form
              autoComplete="on"
              onSubmit={handleSubmit}
              className="auth-form"
            >
              <div className="form-field">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  autoComplete="username"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  autoComplete="current-password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="auth-submit"
                disabled={
                  !formData.username ||
                  !formData.password ||
                  submitting
                }
              >
                {submitting ? "Signing in..." : "Sign In"}
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
              Don't have an account?{" "}
              <Link to="/sign-up">Create Account</Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default SignInForm;
