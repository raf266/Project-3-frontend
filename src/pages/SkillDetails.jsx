import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import api from "../services/api";


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
    



if(!skill){
    return <p>Loading skill...</p>
}


return (
    <div>
        <h1>{skill.title}</h1>

        <p>Description:{skill.description}</p>
        <p>Category:{skill.category}</p>
        <p>Level:{skill.level}</p>
        <p>Type:{skill.type}</p>
        <p>Created by:{skill.userId?.name || "unknown"}</p>

        {isOwner && (
            <div>
                <button onClick={() => navigate(`/skills/${id}/edit`)}>Edit Skill</button>
                <button onClick={handleDelete}>Delete Skill</button>
            </div>
        )}

        <Link to="/skills">Back to Skills</Link>
 
 </div>
  );
}

export default SkillDetails;