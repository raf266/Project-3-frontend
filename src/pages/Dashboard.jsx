
import { useEffect, useState } from "react";
import api from "../services/api";
import "./Profile.css";

function Dashboard({ user }) {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    profileImage: "",
  });

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await api.get("/users/profile");
        setProfile(response.data);

        setFormData({
          name: response.data.name || "",
          bio: response.data.bio || "",
          profileImage: response.data.profileImage || "",
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile.");
      }
    }

    getProfile();
  }, []);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await api.put("/users/profile", formData);

      setProfile(response.data.user);
      setFormData({
        name: response.data.user.name || "",
        bio: response.data.user.bio || "",
        profileImage: response.data.user.profileImage || "",
      });

      setEditing(false);
      setSuccess("Your profile has been updated!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.");
    }
  }

  function handleCancel() {
    setEditing(false);
    setFormData({
      name: profile.name || "",
      bio: profile.bio || "",
      profileImage: profile.profileImage || "",
    });
    setError("");
  }

  if (error && !profile) {
    return <p className="profile-error">{error}</p>;
  }

  if (!profile) {
    return <p className="profile-loading">Loading your profile...</p>;
  }

  const displayName = profile.name || profile.username || user?.username || "Student";

  return (
    <main className="profile-page">
      <div className="profile-container">

        <div className="profile-heading">
          <span className="profile-tag">YOUR SPACE</span>
          <h1>My Profile</h1>
          <p>Manage your information and tell others a little about yourself.</p>
        </div>

        {success && <div className="profile-success">{success}</div>}
        {error && <div className="profile-error">{error}</div>}

        <section className="profile-card">

          <div className="profile-header">
            <div className="profile-avatar">
              {profile.profileImage ? (
                <img src={profile.profileImage} alt="Profile" />
              ) : (
                <span>{displayName.charAt(0).toUpperCase()}</span>
              )}
            </div>

            <div className="profile-header-info">
              <h2>{displayName}</h2>
              <p>@{profile.username}</p>
              <span className="profile-member-label">SkillSwap Member</span>
            </div>

            {!editing && (
              <button
                className="edit-profile-btn"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>
            )}
          </div>

          {!editing ? (
            <div className="profile-details">

              <div className="profile-section">
                <h3>About Me</h3>
                <p className="profile-bio">
                  {profile.bio || "You haven't added a bio yet. Tell others about yourself!"}
                </p>
              </div>

              <div className="profile-section">
                <h3>Personal Information</h3>

                <div className="profile-info-grid">
                  <div className="profile-info-item">
                    <span>Username</span>
                    <p>{profile.username}</p>
                  </div>

                  <div className="profile-info-item">
                    <span>Full Name</span>
                    <p>{profile.name || "Not added yet"}</p>
                  </div>

                  <div className="profile-info-item">
                    <span>Email Address</span>
                    <p>{profile.email}</p>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <form className="profile-form" onSubmit={handleSubmit}>
              <h3>Edit Your Information</h3>

              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="bio">About Me</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell others a little about yourself..."
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label htmlFor="profileImage">Profile Picture URL</label>
                <input
                  id="profileImage"
                  type="text"
                  name="profileImage"
                  value={formData.profileImage}
                  onChange={handleChange}
                  placeholder="Paste your image URL here"
                />
              </div>

              {formData.profileImage && (
                <div className="profile-preview">
                  <span>Image Preview</span>
                  <img
                    src={formData.profileImage}
                    alt="Profile preview"
                  />
                </div>
              )}

              <div className="profile-form-buttons">
                <button type="submit" className="save-profile-btn">
                  Save Changes
                </button>

                <button
                  type="button"
                  className="cancel-profile-btn"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

        </section>
      </div>
    </main>
  );
}

export default Dashboard;
