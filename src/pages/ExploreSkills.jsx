import { useEffect, useState } from "react";
import api from "../services/api";
import {Link} from "react-router";
import "./ExploreSkills.css";

function ExploreSkills({user}){
    const [ skills, setskills ] = useState([]);
    const [ search, setSearch] = useState("");
    const [ ownership, setOwnership] = useState("All");
    const [ level, setLevel] = useState("All");
    const [ type, setType] = useState("All");



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

    const searchedSkills = skills.filter((skill) =>{
        const keywords = search.toLocaleLowerCase().trim().split(/\s+/);

        const skillText = `
        ${skill.title}
        ${skill.description}
        ${skill.category}
        ${skill.level}
        ${skill.type}
        ${skill.userId?.name || ""}
        `.toLocaleLowerCase();

        return keywords.every((word) => skillText.includes(word));
    });

    const userId = user?._id || user?.id || user?.userId;
    const filteredSkills = searchedSkills.filter((skill) => {

        const matchesLevel =
        level === "All" || skill.level === level;

        const matchesType =
        type === "All" || skill.type === type;

        const skillOwnerId = skill.userId?._id || skill.userId;

        const matchesOwnership =
        ownership === "All" ||
        (userId && String (skillOwnerId) === String(userId));

        return matchesLevel && matchesType && matchesOwnership;
    });

    return(
              <div className="explore-page">

            <div className="explore-header">
                <div>
                    <h1>Explore Skills</h1>
                    <p>Discover skills shared by other users.</p>
                </div>

                <div className="skills-search">
                    <input 
                    type="text"
                    placeholder="Search by skill, category, level, or student..."
                    value={search}
                    onChange={(event)=> setSearch(event.target.value)}
                    ></input>

                    {search && (
                        <button onClick={() => setSearch("")}>
                            Clear
                        </button>
                    )}
                </div>

                <Link to="/skills/new" className="add-skill-link">
                    + Add Skill
                </Link>
            </div>



            <div className="skills-filter">

                <select
                value={level}
                onChange={(event) => setLevel(event.target.value)}
                >

                    <option value="All">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>


                <select
                value={type}
                onChange={(event) => setType(event.target.value)}
                >

                    <option value="All">All Types</option>
                    <option value="Teach">Teach</option>
                    <option value="Learn">Learn</option>
                </select>


             {user && (
                <select
                value={ownership}
                onChange={(event) => setOwnership(event.target.value)}
                >

                    <option value="All">All Skills</option>
                    <option value="Mine">My Skills</option>
                </select>

             )}

             <button
             type="button"
             className="reset-filters-btn"
             onClick={() => {
                setLevel("All");
                setType("All");
                setOwnership("All");
             }}
             >
                Reset Filters
             </button>


            </div>



            {filteredSkills.length === 0 && (
                <p>No matching skills found.</p>
            )}
                {filteredSkills.map((skill) => (
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

   {user &&
    String(skill.userId?._id || skill.userId) !==
    String(user._id || user.id || user.userId) &&
    skill.type === "Teach" && (

    <Link
      to={`/sessions/create/${skill._id}`}
      className="connect-btn"
    >
      Connect
      
    </Link>
)}
</div>

<hr />
                        
                    </div>
                ))}
            
        </div>
    );
}

export default ExploreSkills;