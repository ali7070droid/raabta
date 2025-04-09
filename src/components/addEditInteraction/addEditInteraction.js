import React, {useEffect, useState, useMemo} from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';
import "./styles.css"
import { isTokenValid } from '../AuthenticationUtils/authUtils';
import { RAABTA_API } from "../../Constants";

const AddEditInteraction = ({ interaction, contacts, setIsEditing, setInteraction }) => {
    const [formData, setFormData] = useState(interaction) //Use the proper object
    const  {id} = useParams();
    const location = useLocation();
    const {contact, contactsFromState} = location.state || {};
    const [contactForId, setContactForId] = useState(contact);
    // const stateContact = location.state || {};
    // const contact = stateContact.contact;
    // const contactsState = stateContact.contacts
    // console.log(stateContact)
    // const {contactsState} = location.state || {};
    console.log("Contact: " + contact);
    console.log(contactsFromState);
    const nameValue = () => {
        if(contact !== undefined) {
            console.log(contact.name)
            return contact.name;
        }
        else {
            return formData?.name
        }
        
    }

    const optionsValue = () => {
        if(contacts !== undefined) {
            console.log(contacts);
            return contacts.map(item => item.name);
            // return contacts;
        }
        else {
            console.log(contactsFromState);
            if(contactsFromState === null){
                return []
            }
            return contactsFromState.map(item => item.name);
            // return contactsFromState;
        }
    }

    // const name = useMemo(() => nameValue(), []);
    // console.log("Name: " + name);
    const [name,setName] = useState(() => nameValue());
    console.log("Name: " + name);

    const options = useMemo(() => optionsValue(), []);
    console.log("Options" + options);

    const navigate = useNavigate();

    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            //call the edit api
            formData.interactionDate = formData.interactionDate.split('T')[0];
            
            formData.contactDetailsID = contactForId.contactDetailsID
            console.log(formData)

            const token = localStorage.getItem("token")
            if(!isTokenValid(token)){
                  localStorage.removeItem('token')
                  navigate("/")
                }
            fetch(`${RAABTA_API}/api/Interatction/PutInteratctionDetails?id=${formData.id}`, {
                headers : {
                  Authorization: `Bearer ${token}`,
                  'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                method:'PUT',
                body: JSON.stringify(formData)
              }).then(response => console.log(response))
            //navigate someplace
            // toggleIsEditing(false);
            setIsEditing(false);
            setInteraction(formData);
            navigate(`/interaction/${formData.contactDetailsID}`, {state:{contact}})
        }
        else {
            formData.interactionDate = new Date().toISOString().split('T')[0];
            //call the add api
            formData.contactDetailsID = contactForId.contactDetailsID
            console.log(formData)

            const token = localStorage.getItem("token")
            if(!isTokenValid(token)){
                  localStorage.removeItem('token')
                  navigate("/")
                }
            fetch(`${RAABTA_API}/api/Interatction/PostInteratctionDetails`, {
                headers : {
                  Authorization: `Bearer ${token}`,
                  'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                method:'POST',
                body: JSON.stringify(formData)
              }).then(response => console.log(response))
            //navigate someplace
            navigate(`/contact/${contactForId.contactDetailsID}`)
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleChangeTypeAhead = (e) => {
        const newContact = contactsFromState.find(c => c.name == e[0]);
        setContactForId(newContact);
        setName(e[0])
        console.log(newContact)
        console.log(e);
    }

    const cancelUpdate = (e) => {
        if(id) {
            setIsEditing(false);
            navigate(`/interaction/${formData.id}`, {state:{contact}})
        }
        else {
            navigate('/contactList')
        }
        
    }

    

    return (
        <div>
            <h2 className="add-edit-interaction-heading">{id ? 'Edit Interaction' : 'Add Interaction'}</h2>

            <form onSubmit={handleSubmit} className="add-edit-interaction-form"> 
            <div>
                <label>Name of Contact: </label>
                {/* <input
                    className="interaction-input"
                    type = "text"
                    name = "nameOfContact"
                    value = {name}
                    onChange={handleChange}
                    required
                /> */}
                <Typeahead
                    id = "contact-names"
                    className="interaction-input"
                    onChange={handleChangeTypeAhead}
                    options={options}
                    placeholder="Choose a contact..."
                    selected={name === undefined ? [] : [name]}
                    name = "nameOfContact"
                />
            </div>

            <div>
                <label>Date of Meeting : </label>
                <input
                    className="interaction-input"
                    type = "date"
                    name = "meetingDate"
                    value = {formData?.meetingDate.split('T')[0]}
                    onChange = {handleChange}
                    required
                />
            </div>
            <div>
                <label>Type Of Interaction : </label>
                <select 
                className="interaction-select"
                name = "reason" 
                onChange={handleChange} 
                defaultValue={formData?.reason}
                required>
                    <option disabled selected value> --select an option --</option>
                    <option value="Call">Call</option>
                    <option value="In Person">In Person</option>
                    <option value="Ulema Daawat">Ulema Daawat</option>
                    <option value="Invited As Speaker">Invited As Speaker</option>
                    <option value="Correspondence">Correspondence</option>
                    <option value="Others">Others</option>
                </select>

            </div>

            <div>
                <label>Comment : </label>
                <textarea
                    className="interaction-textarea"
                    name="comment"
                    value={formData?.comment}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="interaction-submit-buttons-div">
                <button className="interaction-button" type="submit">{id ? 'Update' : 'Add'}</button>
                <button className="interaction-button" onClick={cancelUpdate}>Cancel</button>
            </div>
            
            </form>

            

            

            

            

            
        </div>
    );


}

export default AddEditInteraction;