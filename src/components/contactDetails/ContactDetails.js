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

  const handleAddInteractionClick = (contact) => {
    navigate("/add-interaction", {state: { contact}});
  }

  if (!contact) {
    return <p>Contact not found!</p>;
  }

  return (
    <div>
      {isEditing ? 
      (<AddEditContact contact={contact}/>) : (
        <div>
          <h2>Contact Details</h2>
          <span><button onClick={handleShowDetails}>{showDetails ? 'Hide Details' : 'Show Details'}</button></span>
      {showDetails && (
        <div className='contact-details-grid'>
      
        <div className='contact-field'>
          <label>Name: </label>
          <span>{contact.name}</span>
        </div>
        <div className='contact-field'>
          <label>Phone Number: </label>
          <span>{contact.phoneNumber}</span>
        </div>
        <div className='contact-field'>
          <label>Address: </label>
          <span>{contact.address}</span>
        </div>
        <div className='contact-field'>
          <label>Designation: </label>
          <span>{contact.designation}</span>
        </div>
        <div className='contact-field'>
          <label>Priority: </label>
          <span>{contact.priority}</span>
        </div>
        {contact.relatedToAim === true && 
          <div className='contact-field'>
            <label>Related To: </label>
            <span>{contact.relatedToWho}</span>
          </div>
        }
        {contact.relatedToAim === true && 
          <div className='contact-field'>
            <label>Relation: </label>
            <span>{contact.relation}</span>
          </div>
        }
        <div className='contact-field'>
          <label>Contacted By: </label>
          <span>{contact.contactedBy}</span>
        </div>
        <div className='contact-field'>
          <label>Contact Ownership: </label>
          <span>{contact.contactOwnership}</span>
        </div>
        <div className='contact-field'>
          <label>State: </label>
          <span>{contact.state}</span>
        </div>
        <button onClick={handleEditClick}>Edit</button>
      </div>
      )}
      
      
          
        </div>
      )
    }
    <button onClick={() => handleAddInteractionClick(contact)}>Add Interaction</button>



      
    <InteractionList id={contact.id} />

    
    </div>
    
  );
};

export default ContactDetails;
