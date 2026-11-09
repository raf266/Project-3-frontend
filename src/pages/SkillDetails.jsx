import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import api from "../services/api";


function SkillDetails() {

    const {id} = useParams();
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

        <Link to="/skills">Back to Skills</Link>




    </div>
);
}

export default SkillDetails;