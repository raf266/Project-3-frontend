
import { Link } from "react-router";
import "./Homepage.css";

function Homepage() {
  return (
    <main className="homepage">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">
            <span className="tag-dot"></span>
            LEARN · SHARE · GROW
          </span>

          <h1>
            Your skills.
            <br />
            Your community.
            <br />
            <span>Your growth.</span>
          </h1>

          <p className="hero-description">
            Share what you know and discover what you can learn.
            Connect with fellow students, exchange skills, and
            grow together through knowledge sharing.
          </p>

          <div className="hero-buttons">
            <Link to="/sign-up" className="primary-btn">
              Join SkillSwap <span>→</span>
            </Link>

            <a href="#how-it-works" className="secondary-btn">
              Discover How It Works
            </a>
          </div>

          <div className="hero-note">
            <span>✦</span>
            Everyone has something valuable to share.
          </div>
        </div>

        {/* Hero Illustration */}
        <div className="hero-visual">
          <div className="visual-glow"></div>

          <div className="visual-diamond diamond-one"></div>
          <div className="visual-diamond diamond-two"></div>

          <div className="visual-main-card">
            <div className="brand-symbol">
              <span className="symbol-purple"></span>
              <span className="symbol-blue"></span>
              <span className="symbol-pink"></span>
            </div>

            <h2>SkillSwap</h2>
            <p>Knowledge connects us.</p>

            <div className="visual-divider"></div>

            <div className="visual-skills">
              <span>💻 Technology</span>
              <span>🎨 Creativity</span>
              <span>📚 Learning</span>
            </div>
          </div>

          <div className="floating-card floating-top">
            <span>💡</span>
            <div>
              <strong>Share ideas</strong>
              <small>Teach something new</small>
            </div>
          </div>

          <div className="floating-card floating-bottom">
            <span>🚀</span>
            <div>
              <strong>Keep growing</strong>
              <small>Learn from others</small>
            </div>
          </div>

          <div className="visual-spark spark-one">✦</div>
          <div className="visual-spark spark-two">✧</div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-section" id="how-it-works">
        <div className="section-heading">
          <span className="section-tag">YOUR JOURNEY STARTS HERE</span>
          <h2>How SkillSwap Works</h2>
          <p>
            Four simple steps to share your knowledge,
            discover new interests, and connect with students.
          </p>
        </div>

        <div className="steps-container">

          <div className="step-card">
            <div className="step-icon purple-icon">01</div>
            <span className="step-symbol">👤</span>
            <h3>Create Your Profile</h3>
            <p>
              Introduce yourself and tell the community
              about your interests and abilities.
            </p>
          </div>

          <div className="step-card">
            <div className="step-icon blue-icon">02</div>
            <span className="step-symbol">💡</span>
            <h3>Share Your Skills</h3>
            <p>
              Add the skills you can teach and
              help other students learn something new.
            </p>
          </div>

          <div className="step-card">
            <div className="step-icon purple-icon">03</div>
            <span className="step-symbol">🤝</span>
            <h3>Connect with Students</h3>
            <p>
              Explore available skills and find
              students who share your interests.
            </p>
          </div>

          <div className="step-card">
            <div className="step-icon blue-icon">04</div>
            <span className="step-symbol">📅</span>
            <h3>Arrange a Session</h3>
            <p>
              Request a session, exchange knowledge,
              and start learning together.
            </p>
          </div>

        </div>
      </section>

      {/* About / Benefits */}
      <section className="why-section" id="about">
        <div className="why-content">
          <div className="why-intro">
            <span className="section-tag">MORE THAN JUST LEARNING</span>

            <h2>
              Great things happen
              <span> when we share.</span>
            </h2>

            <p>
              SkillSwap creates a community where students
              can learn from each other, discover their potential,
              and turn their knowledge into opportunities.
            </p>
          </div>

          <div className="benefits-container">

            <div className="benefit-card">
              <span className="benefit-icon">🌱</span>
              <h3>Keep Learning</h3>
              <p>
                Discover new interests and develop
                skills beyond the classroom.
              </p>
            </div>

            <div className="benefit-card">
              <span className="benefit-icon">🎓</span>
              <h3>Learn from Peers</h3>
              <p>
                Gain practical knowledge from
                students with different experiences.
              </p>
            </div>

            <div className="benefit-card">
              <span className="benefit-icon">💜</span>
              <h3>Share Your Knowledge</h3>
              <p>
                Turn your strengths into opportunities
                to help someone else.
              </p>
            </div>

            <div className="benefit-card">
              <span className="benefit-icon">🌟</span>
              <h3>Build Connections</h3>
              <p>
                Meet like-minded students and
                create meaningful connections.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="final-cta">
        <div className="cta-decoration cta-decoration-one"></div>
        <div className="cta-decoration cta-decoration-two"></div>

        <div className="cta-content">
          <span className="section-tag">YOUR NEXT STEP STARTS HERE</span>

          <h2>
            Ready to share
            <br />
            <span>what you know?</span>
          </h2>

          <p>
            Join the SkillSwap community and discover
            how much you can achieve by learning together.
          </p>

          <Link to="/sign-up" className="cta-btn">
            Get Started Today <span>→</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="homepage-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <h3>
              <span className="footer-mark">S</span>
              SkillSwap<span className="footer-dot">.</span>
            </h3>

            <p>
              Learn something new.
              Share what you know.
            </p>
          </div>

          <div className="footer-links">
            <a href="#how-it-works">How It Works</a>
            <a href="#about">About Us</a>
            <Link to="/sign-in">Sign In</Link>
            <Link to="/sign-up">Join Us</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 SkillSwap. All rights reserved.</span>
          <span>Made for students, powered by sharing. 💜</span>
        </div>
      </footer>

    </main>
  );
}

export default Homepage;
