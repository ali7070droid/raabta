import React, {useEffect, useState} from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import "./styles.css"
import InteractionList from "../../components/InteractionList/InteractionList";
import AddEditContact from '../addEditContact/addEditContact';
import { isTokenValid } from '../AuthenticationUtils/authUtils';

const ContactDetails = () => {
  const { id } = useParams(); // what is useParams
  const [contact, setContact] = useState({})
  const [isEditing, setIsEditing] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const token = localStorage.getItem("token")
    if(!isTokenValid(token)){
          localStorage.removeItem('token')
          navigate("/")
        }
    fetch(`http://localhost:5273/api/Contact/GetContactDetailsById${id}`, {
      headers : {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => setContact(data))
  }, [location.pathname, isEditing, contact])

  const navigate = useNavigate();
  // const contact = contacts.find(contact => contact.id === id);
  
  const [showDetails, setShowDetails] = useState(false);
  console.log(contact)

  const handleEditClick = () => {
    setIsEditing(true);
  }

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  }

  const handleAddInteractionClick = (contact, contactsFromState) => {
    // console.log(contacts)
    navigate("/add-interaction", {state: { contact, contactsFromState}});
  }

  const handleBackButton = (e) => {
    navigate('/contactList')
  }

  if (!contact) {
    return <p>Contact not found!</p>;
  }

  return (
    <div>
      {isEditing ? 
      (<AddEditContact contact={contact} setIsEditing = {setIsEditing} setContact = {setContact}/>) : (
        <div className='contact-details-div'>
          <div className='contact-details-heading-with-buttons'>
            <button className='contact-details-back-button' onClick={handleBackButton}>Back</button>
            <h2 className='contact-details-heading'>Contact Details</h2>
            <button className='contact-details-toggle-button' onClick={handleShowDetails}>{showDetails ? 'Hide Details' : 'Show Details'}</button>
          
          
          </div>




          {/* <h2 className='contact-details-heading'>Contact Details</h2>
          <span><button className='contact-details-button' onClick={handleShowDetails}>{showDetails ? 'Hide Details' : 'Show Details'}</button></span> */}
      {showDetails && (
        <div>
          <div className='contact-details-rows'>
      
      <div className='contact-field'>
        <label className='contact-details-label'>Name: </label>
        <span className='contact-details-span'>{contact.name}</span>
      </div>
      <div className='contact-field'>
        <label className='contact-details-label'>Phone Number: </label>
        <span className='contact-details-span'>{contact.phone}</span>
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
      {/* {contact.relatedToAim === true && 
        <div className='contact-field'>
          <label className='contact-details-label'>Related To: </label>
          <span className='contact-details-span'>{contact.relatedToWho}</span>
        </div>
      } */}
      {contact.isAIM === "Y" && 
        <div className='contact-field'>
          <label className='contact-details-label'>Relation: </label>
          <span className='contact-details-span'>{contact.relation}</span>
        </div>
      }
      <div className='contact-field'>
        <label className='contact-details-label'>Contacted By: </label>
        <span className='contact-details-span'>{contact.contactAddedBy}</span>
      </div>
      <div className='contact-field'>
        <label className='contact-details-label'>Contact Ownership: </label>
        <span className='contact-details-span'>{contact.contactOwnership}</span>
      </div>
      <div className='contact-field'>
        <label className='contact-details-label'>State: </label>
        <span className='contact-details-span'>{contact.status}</span>
      </div>
      {/* <button className='contact-details-button' onClick={handleEditClick}>Edit</button> */}
    </div>
    <div className='edit-button-container'>
    <button className='contact-details-button' onClick={handleEditClick}>Edit</button>
      </div>
    
    
        </div>


        
      )}
      
      
          
        </div>
      )
    }
    <div className='edit-button-container'>
    <button className='contact-details-button' onClick={() => handleAddInteractionClick(contact, null)}>Add Interaction</button>
    </div>
    



      
    <InteractionList contact={contact} />

    
    </div>
    
  );
};

export default ContactDetails;
