import React, {useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css"
import { isTokenValid } from '../AuthenticationUtils/authUtils';
const AddEditContact = ({contact, setIsEditing, setContact}) => {
    const [formData, setFormData] = useState(contact);
    console.log(contact)
    const {id} = useParams();

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(id) {
            // formData.interactionDetails = null
            const token = localStorage.getItem("token")
            if(!isTokenValid(token)){
                  localStorage.removeItem('token')
                  navigate("/")
            }
            fetch(`http://localhost:5273/api/Contact/PutContactDetails?id=${id}`, {
                headers : {
                  Authorization: `Bearer ${token}`,
                  'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                method:'PUT',
                body: JSON.stringify(formData)
              }).then(response => console.log(response))
            console.log(formData);
            setIsEditing(false)
            setContact(formData)
            navigate(`/contact/${id}`)
        }
        else {
            if(formData.isAIM === "N") {
                formData.relation = "";
            }
            const token = localStorage.getItem("token")
            if(!isTokenValid(token)){
                  localStorage.removeItem('token')
                  navigate("/")
            }
            fetch(`http://localhost:5273/api/Contact/PostContactDetails`, {
                headers : {
                  Authorization: `Bearer ${token}`,
                  'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                method:'POST',
                body: JSON.stringify(formData)
              }).then(response => console.log(response))
            console.log(formData);
            //navigate somewhere
            navigate('/contactList')
        }
    }

    const handleChange = (e) => {
        // if(formData !== undefined) {
        //     console.log(formData)
        //     if(formData.isAIM === true) {
        //         formData.isAIM = "Y"
        //     } else {
        //         formData.isAIM = "N"
        //     }
        // }
        
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleCancel = (e) => {
        if(id) {
            setIsEditing(false)
            navigate(`/contact/${id}`)
        }
        else  {
            navigate(`/contactList`)
        }
    }

    return (
        <div>
            <h2 className="add-edit-contact-heading">{id ? 'Edit Contact' : 'Add Contact'}</h2>

            <div>
            <form onSubmit={handleSubmit} className="form-button-container">
            <div className="add-edit-contact-form">
            <div>
                <label>Name: </label>
                <input
                    className="contact-input"
                    type = "text"
                    name = "name"
                    value = {formData?.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Phone Number: </label>
                <input
                    className="contact-input"
                    type = "tel"
                    name = "phone"
                    value = {formData?.phone}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Address: </label>
                <textarea
                    className="contact-textarea"
                    name="address"
                    value={formData?.address}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Designation: </label>
                <select
                className="contact-select"
                name="designation"
                onChange={handleChange}
                defaultValue={formData?.designation}
                required
                >
                    <option disabled selected value> --select an option --</option>
                    <option value="maulana">Maulana</option>
                    <option value="doctor">Doctor</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div>
                <label>Priority: </label>
                <select
                className="contact-select"
                name="priority"
                onChange={handleChange}
                defaultValue={formData?.priority}
                required
                >
                    <option disabled selected value> --select an option --</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
            </div>
            {/* <div>
                <label>Related To AIM: </label>
                <input
                className="contact-checkbox"
                    type="checkbox"
                    defaultChecked={formData?.isAIM === "Y"}
                    onChange={handleChange}
                    name="isAIM"
                    required
                />
            </div> */}
            <div>
                <label>Related To AIM: </label>
                <select
                className="contact-select"
                name="isAIM"
                onChange={handleChange}
                defaultValue={formData?.isAIM}
                required
                >
                    <option disabled selected value> --select an option --</option>
                    <option value="Y">Yes</option>
                    <option value="N">No</option>
                </select>
            </div>
            {/* {formData?.relatedToAim && (
                <div>
                    <label>Related To: </label>
                    <input
                    className="contact-input"
                    type = "text"
                    name = "relatedTo"
                    value = {formData?.relatedTo}
                    onChange={handleChange}
                    required
                />
                </div>
            ) } */}
            {formData?.isAIM === "Y" && (
                <div>
                    <label>Relation: </label>
                    <input
                    className="contact-input"
                    type = "text"
                    name = "relation"
                    value = {formData?.relation}
                    onChange={handleChange}
                    required
                />
                </div>
            ) }
            <div>
                    <label>Contacted By: </label>
                    <input
                    className="contact-input"
                    type = "text"
                    name = "contactAddedBy"
                    value = {formData?.contactAddedBy}
                    onChange={handleChange}
                    required
                />
                </div>
                <div>
                    <label>Contact Ownership: </label>
                    <select
                    className="contact-select"
                        name="contactOwnership"
                        onChange={handleChange}
                        defaultValue={formData?.contactOwnership}
                        required
                        >
                            <option disabled selected value> --select an option --</option>
                            <option value="z1">Z1</option>
                            <option value="z2">Z2</option>
                            <option value="z3">Z3</option>
                            <option value="z4">Z4</option>
                            <option value="obc">OBC</option>
                            <option value="tac">TAC</option>
                    </select>
                </div>
                <div>
                    <label>Status: </label>
                    <select
                    className="contact-select"
                        name="status"
                        onChange={handleChange}
                        defaultValue={formData?.status}
                        required
                        >
                            <option disabled selected value> --select an option --</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            
                    </select>
                    
                </div>
                
                
            
            </div>

            <div className="button-container">
                    <button type="submit" className="contact-button">{id ? 'Update' :'Add'}</button>
                    <button className="contact-button" onClick={handleCancel}>Cancel</button>
            </div>

            
            
                {/* <button className="contact-button" type="submit">{id ? 'Update' :'Add'}</button> */}



            </form>
            
            
            </div>

            


        </div>
    )
}
export default AddEditContact;
