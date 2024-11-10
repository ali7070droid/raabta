import React, {useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./styles.css"
import InteractionList from "../../components/InteractionList/InteractionList";
import AddEditContact from '../addEditContact/addEditContact';

const ContactDetails = ({ contacts }) => {
  const { id } = useParams(); // what is useParams
  // console.log(parseInt(id))
  // console.log(typeof(id))
  // console.log(contacts)
  const navigate = useNavigate();
  const contact = contacts.find(contact => contact.id === id);
  const [isEditing, setIsEditing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  // console.log(contact)

  const handleEditClick = () => {
    setIsEditing(true);
  }

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  }

  const handleAddInteractionClick = (contact, contactsFromState) => {
    console.log(contacts)
    navigate("/add-interaction", {state: { contact, contactsFromState}});
  }

  if (!contact) {
    return <p>Contact not found!</p>;
  }

  return (
    <div>
      {isEditing ? 
      (<AddEditContact contact={contact}/>) : (
        <div className='contact-details-div'>
          <h2 className='contact-details-heading'>Contact Details</h2>
          <span><button className='contact-details-button' onClick={handleShowDetails}>{showDetails ? 'Hide Details' : 'Show Details'}</button></span>
      {showDetails && (
        <div className='contact-details-rows'>
      
        <div className='contact-field'>
          <label className='contact-details-label'>Name: </label>
          <span className='contact-details-span'>{contact.name}</span>
        </div>
        <div className='contact-field'>
          <label className='contact-details-label'>Phone Number: </label>
          <span className='contact-details-span'>{contact.phoneNumber}</span>
        </div>
        <div className='contact-field'>
          <label className='contact-details-label'>Address: </label>
          <span className='contact-details-span'>{contact.address}</span>
        </div>
        <div className='contact-field'>
          <label className='contact-details-label'>Designation: </label>
          <span className='contact-details-span'>{contact.designation}</span>
        </div>
        <div className='contact-field'>
          <label className='contact-details-label'>Priority: </label>
          <span className='contact-details-span'>{contact.priority}</span>
        </div>
        {contact.relatedToAim === true && 
          <div className='contact-field'>
            <label className='contact-details-label'>Related To: </label>
            <span className='contact-details-span'>{contact.relatedToWho}</span>
          </div>
        }
        {contact.relatedToAim === true && 
          <div className='contact-field'>
            <label className='contact-details-label'>Relation: </label>
            <span className='contact-details-span'>{contact.relation}</span>
          </div>
        }
        <div className='contact-field'>
          <label className='contact-details-label'>Contacted By: </label>
          <span className='contact-details-span'>{contact.contactedBy}</span>
        </div>
        <div className='contact-field'>
          <label className='contact-details-label'>Contact Ownership: </label>
          <span className='contact-details-span'>{contact.contactOwnership}</span>
        </div>
        <div className='contact-field'>
          <label className='contact-details-label'>State: </label>
          <span className='contact-details-span'>{contact.state}</span>
        </div>
        <button className='contact-details-button' onClick={handleEditClick}>Edit</button>
      </div>
      )}
      
      
          
        </div>
      )
    }
    <button className='contact-details-button' onClick={() => handleAddInteractionClick(contact, contacts)}>Add Interaction</button>



      
    <InteractionList id={contact.id} contacts={contacts} />

    
    </div>
    
  );
};

export default ContactDetails;
