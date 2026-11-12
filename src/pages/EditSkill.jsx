import { useEffect, useState } from "react"
import {  useNavigate, useParams } from "react-router"
import api from "../services/api"
import "./EditSkill.css";

function EditSkill() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [ formData, setFormData ] = useState({
        title:"",
        description:"",
        category:"",
        level:"Beginner",
        type:"Teach"
    });



    useEffect(()=>{
        async function getSkill(){
        try{
            const response = await api.get(`/skills/${id}`);

            setFormData({
                title: response.data.title,
                description: response.data.description,
                category: response.data.category,
                level: response.data.level,
                type: response.data.type
            });

            }catch (err){
                    console.log(err);
            }
        }

        getSkill();
    },[id]);


    function handleChange(event){
        setFormData({...formData,[event.target.name]:event.target.value})
    }

    async function handleSubmit(event){
        event.preventDefault()

        try{
          await api.put(`/skills/${id}`,formData);
          navigate(`/skills/${id}`);
        }catch (err){
            console.log(err);
        }
    }

       



  return (
    <div className="edit-skill-page">
      <h1>Edit Skill</h1>

        <form onSubmit={handleSubmit}>
            <div>
            <label>Title:</label>
            <input 
            type="text" 
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            />
            </div>

            <div>
            <label>Description:</label>
            <textarea 
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            />
            </div>

            <div>
            <label>Category:</label>
            <input 
            type="text" 
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            />
            </div>

            <div>
            <label>Level:</label>
            <select 
            name="level"
            value={formData.level}
            onChange={handleChange}
            >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>

            </select>
            </div>

            <div>
            <label>Type:</label>
            <select 
            name="type"
            value={formData.type}
            onChange={handleChange}
            >
                <option value="Teach">Teach</option>
                <option value="Learn">Learn</option>

            </select>
            </div>

            <button type="submit">Save Changes</button>

            </form>
            </div>
  );
}

export default EditSkill;