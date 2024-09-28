import React, {useEffect, useState, useMemo} from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./styles.css"

const AddEditInteraction = ({ interaction}) => {
    const [formData, setFormData] = useState(interaction) //Use the proper object
    const  {id} = useParams();
    const location = useLocation();
    const {contact} = location.state || {};
    console.log(contact);
    const nameValue = () => {
        if(contact !== undefined) {
            console.log(contact.name)
            return contact.name;
        }
        else {
            return formData?.nameOfContact
        }
        
    }

    const name = useMemo(() => nameValue(), []);

    const navigate = useNavigate();

    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            //call the edit api
            console.log(formData)
            //navigate someplace
        }
        else {
            //call the add api
            console.log(formData)
            //navigate someplace
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    

    return (
        <div>
            <h2>{id ? 'Edit Interaction' : 'Add Interaction'}</h2>

            <form onSubmit={handleSubmit}> 
            <div>
                <label>Name of Contact: </label>
                <input
                    type = "text"
                    name = "nameOfContact"
                    value = {name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>Date of Meeting : </label>
                <input
                    type = "date"
                    name = "dateOfMeeting"
                    value = {formData?.dateOfMeeting}
                    onChange = {handleChange}
                    required
                />
            </div>
            <div>
                <label>Type Of Interaction : </label>
                <select 
                name = "typeOfInteraction" 
                onChange={handleChange} 
                defaultValue={formData?.typeOfInteraction}
                required>
                    <option value="call">Call</option>
                    <option value="inPerson">In Person</option>
                    <option value="ulemaDaawat">Ulema Daawat</option>
                    <option value="invitedAsSpeaker">Invited As Speaker</option>
                    <option value="correspondence">Correspondence</option>
                    <option value="others">Others</option>
                </select>

            </div>

            <div>
                <label>Comment : </label>
                <textarea
                    name="comment"
                    value={formData?.comment}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">{id ? 'Update' : 'Add'}</button>
            </form>

            

            

            

            

            
        </div>
    );


}

export default AddEditInteraction;