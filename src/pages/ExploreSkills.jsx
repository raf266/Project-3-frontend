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

            <div className="explore-header">
                <div>
                    <h1>Explore Skills</h1>
                    <p>Discover skills shared by other users.</p>
                </div>

                <Link to="/skills/new" className="add-skill-link">
                    + Add Skill
                </Link>
            </div>
            {skills.length === 0 && <p>No skills found.</p>}
                {skills.map((skill) => (
                    <div key={skill._id}>
                        <h2>{skill.title}</h2>
                        <p>{skill.description}</p>
                        <p>Category:{skill.category}</p>
                        <p>Level:{skill.level}</p>
                        <p>Type:{skill.type}</p>
                        <p>Created by:{skill.userId?.name || "Unknown"}</p>

                        <div className="skill-card-actions">
    <Link
        to={`/skills/${skill._id}`}
        className="view-details-btn"
    >
        View Details
    </Link>

    <Link
        to={`/sessions/create/${skill._id}`}
        className="connect-btn"
    >
        Connect
    </Link>
</div>

<hr />
                        
                    </div>
                ))}
            
        </div>
    );
}

export default ExploreSkills;