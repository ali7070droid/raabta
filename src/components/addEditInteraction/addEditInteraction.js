import React, {useEffect, useState, useMemo} from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';
import "./styles.css"

const AddEditInteraction = ({ interaction, contacts }) => {
    const [formData, setFormData] = useState(interaction) //Use the proper object
    const  {id} = useParams();
    const location = useLocation();
    const {contact, contactsFromState} = location.state || {};
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
            return formData?.nameOfContact
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
            return contactsFromState.map(item => item.name);
            // return contactsFromState;
        }
    }

    const name = useMemo(() => nameValue(), []);
    console.log("Name: " + name);

    const options = useMemo(() => optionsValue(), []);
    console.log("Options" + options);

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

    const handleChangeTypeAhead = (e) => {
        console.log(e);
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
                    name = "dateOfMeeting"
                    value = {formData?.dateOfMeeting}
                    onChange = {handleChange}
                    required
                />
            </div>
            <div>
                <label>Type Of Interaction : </label>
                <select 
                className="interaction-select"
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
                    className="interaction-textarea"
                    name="comment"
                    value={formData?.comment}
                    onChange={handleChange}
                    required
                />
            </div>
            <button className="interaction-button" type="submit">{id ? 'Update' : 'Add'}</button>
            </form>

            

            

            

            

            
        </div>
    );


}

export default AddEditInteraction;