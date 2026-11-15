import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import api from "../services/api";
import "./SkillDetails.css";
import AvailabilityCalendar from "../components/AvailabilityCalendar";


function SkillDetails({user}) {

    const {id} = useParams();
    const navigate = useNavigate();

    const [ skill, setSkill ] = useState(null);
    const [availability, setAvailability] = useState([]);

    useEffect(()=>{
    async function getSkill(){
        try{
        const response = await api.get(`/skills/${id}`);
        setSkill(response.data);
        setAvailability(response.data.availability || []);
        }catch (err){
            console.log(err);
        }
    }

    getSkill();
 },[id]);

 const isOwner = user && skill && skill.userId?._id === user._id;

 async function handleDelete() {
    if(!window.confirm("Are you sure you want to delete this skill?")){
        return;
    }

    try{
          await api.delete(`/skills/${id}`);
          navigate("/skills");
        }catch (err){
            console.log(err);
        }
    }
    

  async function handleAddSlot(slot) {
  try {
    const now = new Date();

    const futureAvailability = availability
      .filter((item) => {
        const start = new Date(
          `${String(item.date).slice(0, 10)}T${item.startTime}`
        );

        return start > now;
      })
      .map((item) => ({
        date: String(item.date).slice(0, 10),
        startTime: item.startTime,
        endTime: item.endTime
      }));

    const updatedAvailability = [
      ...futureAvailability,
      slot
    ];

    const response = await api.put(
      `/skills/${id}/availability`,
      { availability: updatedAvailability }
    );

    setAvailability(response.data.availability);
    alert("Availability saved successfully!");
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || "Error saving availability");
  }
}


if (!skill) {
  return <p className="skill-details-loading">Loading skill...</p>;
}


return (
    <div className="skill-details-page">
  <div className="skill-details-container">
        <h1>{skill.title}</h1>

        <p>Description:{skill.description}</p>
        <p>Category:{skill.category}</p>
        <p>Level:{skill.level}</p>
        <p>Type:{skill.type}</p>
        <p>Created by:{skill.userId?.name || "unknown"}</p>

        
        {isOwner && (
            <div className="skill-owner-actions">
                <button onClick={() => navigate(`/skills/${id}/edit`)} className="edit-skill-btn">Edit Skill</button>
                <button onClick={handleDelete} className="delete-skill-btn">Delete Skill</button>
            </div>
        )}

        {user && !isOwner && skill.userId?._id && (
            <button
                onClick={() => navigate(`/chat/${skill.userId._id}`)}
                className="message-student-btn"
            >
                Message Student
            </button>
        )}

            {skill.type === "Teach" && (
            <div>
                <h2>Available Sessions</h2>

                {isOwner && (
                <AvailabilityCalendar onAddSlot={handleAddSlot} />
                )}

                {availability.length === 0 ? (
                <p>No available times yet.</p>
                ) : (
                availability.map((slot, index) => (
                    <div key={slot._id || index}>
                    <p>
                        Date: {String(slot.date).slice(0, 10)}
                    </p>
                    <p>
                        Time: {slot.startTime} - {slot.endTime}
                    </p>
                    <hr />
                    </div>
                ))
                )}
            </div>
            )}

        <Link to="/skills" className="back-skills-link">Back to Skills</Link>

 </div>
 </div>
  );
}

export default SkillDetails;