
import { Link } from 'react-router';
import './Navbar.css';

function Navbar({ user, handleLogout }) {
  return (
    <nav className="navbar">
     <Link to="/" className="navbar-logo">
  <span className="navbar-icon">⇄</span>
  <span className="navbar-name">
    SkillSwap<span className="navbar-dot">.</span>
  </span>
</Link>
      {user ? (
        <div className="navbar-links">
          <Link to="/profile">My Profile</Link>
          <Link to="/skills">Explore Skills</Link>
          <Link to="/my-sessions">My Sessions</Link>

          <button className="signout-btn" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      ) : (
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>

          <Link to="/#how-it-works" className="nav-link">
            How It Works
          </Link>

          <Link to="/#about" className="nav-link">
            About
          </Link>

          <Link to="/sign-in" className="signin-btn">
            Sign In
          </Link>

          <Link to="/sign-up" className="signup-btn">
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
