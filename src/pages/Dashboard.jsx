
import { useEffect, useState } from "react";
import api from "../services/api";

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
        setError(
          err.response?.data?.message || "Failed to load profile."
        );
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
      setEditing(false);
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update profile."
      );
    }
  }

  if (error && !profile) {
    return <p>{error}</p>;
  }

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <div>
      <h1>Welcome {profile.name || user.username}!</h1>

      <h2>Your Profile</h2>

      {profile.profileImage && (
        <img
          src={profile.profileImage}
          alt="Profile"
          width="120"
        />
      )}

      <p>Username: {profile.username}</p>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
      <p>Bio: {profile.bio}</p>

      {success && <p>{success}</p>}
      {error && <p>{error}</p>}

      {!editing ? (
        <button onClick={() => setEditing(true)}>
          Edit Profile
        </button>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Edit Profile</h2>

          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Bio:</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>

        <div>
  <h3>Profile Picture</h3>

  {formData.profileImage ? (
    <img
      src={formData.profileImage}
      alt="Profile Preview"
      width="150"
      height="150"
      style={{
        borderRadius: "50%",
        objectFit: "cover",
      }}
    />
  ) : (
    <p>No profile picture added yet.</p>
  )}

  <label>Profile Image URL:</label>
  <input
    type="text"
    name="profileImage"
    value={formData.profileImage}
    onChange={handleChange}
    placeholder="Paste your image URL here"
  />
</div>

          <button type="submit">Save Changes</button>

          <button
            type="button"
            onClick={() => {
              setEditing(false);
              setFormData({
                name: profile.name || "",
                bio: profile.bio || "",
                profileImage: profile.profileImage || "",
              });
            }}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default Dashboard;
