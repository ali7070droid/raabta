import React, {useEffect, useState} from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import AddEditInteraction from '../addEditInteraction/addEditInteraction';
import "./styles.css"
const InteractionDetails = () => {
    const [interaction, setInteraction] = useState([])
    const { id } =useParams()
    const [isEditing, setIsEditing] = useState(false);
    const location = useLocation();
    const {contact} = location.state || {};
    const [allContacts, setAllContacts] = useState([]);
    // console.log(contacts)

    // const toggleIsEditing = (value) => {
    //     setIsEditing(value);
    // }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token")
                const response = await axios.get(`http://localhost:5273/api/Interatction/GetInteratctionDetailsByID?id=${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setInteraction(response.data)
                console.log(interaction)
            }
            catch(error) {
                console.log(error)
            }
        };

        const fetchAllContacts = async () => {
            try {
                const token = localStorage.getItem("token")
                const response = await axios.get(`http://localhost:5273/api/Contact/GetContactDetails`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setAllContacts(response.data)
            }
            catch(error) {
                console.log(error)
            }
        }

        fetchData();
        fetchAllContacts();
    }, [])

    const handleEditClick = () => {
        setIsEditing(true);
    }

    return (
        <div>
            {isEditing ? 
                (<AddEditInteraction interaction={interaction} contacts = {allContacts} setIsEditing = {setIsEditing}/>) : (
                    <div>
                    <h2 className="interaction-details-heading">Interaction Details</h2>
            <div className='interaction-details'>
            <div>
                <label>Name of Contact: </label>
                <span className='interaction-details-span'>{contact.name}</span>
            </div>

            <div>
                <label>Date of Meeting : </label>
                <span className='interaction-details-span'>{interaction.meetingDate}</span>
            </div>

            <div>
                <label>Type Of Interaction : </label>
                <span className='interaction-details-span'>{interaction.reason}</span>
            </div>

            <div>
                <label>Comment : </label>
                <span className='interaction-details-span'>{interaction.comment}</span>
            </div>
            <button className="interaction-details-button" onClick={handleEditClick}>Edit</button>
            </div>
            </div>
                )
            }
        </div>
    )
}

export default InteractionDetails;