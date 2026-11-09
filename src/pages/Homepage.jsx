
import { Link } from 'react-router';
import './Homepage.css';

function Homepage() {
  return (
    <main className="homepage">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">LEARN • SHARE • GROW</span>

          <h1>
            Learn something new.
            <span> Share what you know.</span>
          </h1>

          <p>
            Connect with students, exchange skills, and grow together.
            Everyone has something valuable to teach and something new to learn.
          </p>

          <div className="hero-buttons">
            <Link to="/sign-up" className="primary-btn">
              Create My Profile
            </Link>

            <a href="#how-it-works" className="secondary-btn">
              Discover How It Works
            </a>
          </div>

          <div className="hero-note">
            ✨ Your skills have value. Share them with the world.
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-circle">
            <span className="hero-emoji">🎓</span>
            <span className="floating-emoji emoji-one">💡</span>
            <span className="floating-emoji emoji-two">📚</span>
            <span className="floating-emoji emoji-three">✨</span>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-section" id="how-it-works">
        <div className="section-heading">
          <span className="section-tag">GET STARTED</span>
          <h2>How SkillSwap Works</h2>
          <p>
            Sharing knowledge and learning new skills is simple.
            Just follow four easy steps.
          </p>
        </div>

        <div className="steps-container">
          <div className="step-card">
            <div className="step-icon">👤</div>
            <span className="step-number">01</span>
            <h3>Create Your Profile</h3>
            <p>
              Set up your profile and tell other students a little about yourself.
            </p>
          </div>

          <div className="step-card">
            <div className="step-icon">💡</div>
            <span className="step-number">02</span>
            <h3>Share Your Skills</h3>
            <p>
              Add the skills you can teach and share your knowledge with others.
            </p>
          </div>

          <div className="step-card">
            <div className="step-icon">🤝</div>
            <span className="step-number">03</span>
            <h3>Connect with Students</h3>
            <p>
              Discover skills offered by other students and find something new to learn.
            </p>
          </div>

          <div className="step-card">
            <div className="step-icon">📅</div>
            <span className="step-number">04</span>
            <h3>Arrange a Session</h3>
            <p>
              Request a session, connect with another student, and start learning.
            </p>
          </div>
        </div>
      </section>

      {/* Why SkillSwap Section */}
      <section className="why-section" id="about">
        <div className="section-heading">
          <span className="section-tag">WHY SKILLSWAP?</span>
          <h2>Learn Together. Grow Together.</h2>
          <p>
            Everyone has something they can teach and something they can learn.
            SkillSwap brings students together to make that happen.
          </p>
        </div>

        <div className="benefits-container">
          <div className="benefit-card">
            <span>🌱</span>
            <h3>Keep Learning</h3>
            <p>Explore new interests and develop skills beyond the classroom.</p>
          </div>

          <div className="benefit-card">
            <span>🎓</span>
            <h3>Learn from Peers</h3>
            <p>Gain knowledge and practical experience from fellow students.</p>
          </div>

          <div className="benefit-card">
            <span>💜</span>
            <h3>Share What You Know</h3>
            <p>Use your strengths to help others learn and improve.</p>
          </div>

          <div className="benefit-card">
            <span>🌟</span>
            <h3>Build Connections</h3>
            <p>Meet students with similar interests and learn together.</p>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="final-cta">
        <h2>Ready to Share Your Skills?</h2>
        <p>
          Join SkillSwap and discover how much you can learn by sharing.
        </p>
        <Link to="/sign-up" className="primary-btn">
          Join SkillSwap
        </Link>
      </section>

      {/* Footer */}
      <footer className="homepage-footer">
        <h3>SkillSwap</h3>
        <p>Learn something new. Share what you know.</p>
        <span>© 2026 SkillSwap. All rights reserved.</span>
      </footer>

    </main>
  );
}

export default Homepage;
