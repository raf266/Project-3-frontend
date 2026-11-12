import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import api from "../services/api";
import "./SkillDetails.css";


function SkillDetails({user}) {

    const {id} = useParams();
    const navigate = useNavigate();

    const [ skill, setSkill ] = useState(null);


    useEffect(()=>{
    async function getSkill(){
        try{
        const response = await api.get(`/skills/${id}`);
        setSkill(response.data);
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
                <button onClick={handleDelete}className="delete-skill-btn">Delete Skill</button>
            </div>
        )}

        <Link to="/skills" className="back-skills-link">Back to Skills</Link>
 </div>
 </div>
  );
}

export default SkillDetails;