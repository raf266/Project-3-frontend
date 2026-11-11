import { useEffect, useState } from "react";
import api from "../services/api";
import {Link} from "react-router";
import "./ExploreSkills.css";

function ExploreSkills(){
    const [ skills, setskills ] = useState([]);

    useEffect(() => {
        async function getSkills() {

            try{
                const response = await api.get("/skills");
                setskills(response.data);
            }catch(err){
                console.log(err);
            }
              
        }

        getSkills();
    },[]);

    return(
         <div className="explore-page">
            <h1>Explore Skills</h1>
            <p>Discover skills shared by other users.</p>


            {skills.length === 0 && <p>No skills found.</p>}

                {skills.map((skill) => (
                    <div key={skill._id}>
                        <h2>{skill.title}</h2>
                        <p>{skill.description}</p>
                        <p>Category:{skill.category}</p>
                        <p>Level:{skill.level}</p>
                        <p>Type:{skill.type}</p>
                        <p>Created by:{skill.userId?.name || "Unknown"}</p>

                        <Link to={`/skills/${skill._id}`}>View Details</Link>
                        <hr  />
                        
                    </div>
                ))}
            
        </div>
    );
}

export default ExploreSkills;