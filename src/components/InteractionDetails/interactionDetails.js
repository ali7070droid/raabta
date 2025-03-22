import React, {useEffect, useState} from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddEditInteraction from '../addEditInteraction/addEditInteraction';
import "./styles.css"
import { isTokenValid } from '../AuthenticationUtils/authUtils';
import { RAABTA_API } from "../../Constants";
const InteractionDetails = () => {
    const [interaction, setInteraction] = useState([])
    const { id } =useParams()
    const [isEditing, setIsEditing] = useState(false);
    const location = useLocation();
    const {contact} = location.state || {};
    const [allContacts, setAllContacts] = useState([]);
    const navigate = useNavigate()
    // console.log(contacts)

    // const toggleIsEditing = (value) => {
    //     setIsEditing(value);
    // }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token")
                if(!isTokenValid(token)){
                      localStorage.removeItem('token')
                      navigate("/")
                    }
                const response = await axios.get(`${RAABTA_API}/api/Interatction/GetInteratctionDetailsByID?id=${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setInteraction(response.data)
                console.log(response.data.meetingDate.split('T')[0])
            }
            catch(error) {
                console.log(error)
            }
        };

        const fetchAllContacts = async () => {
            try {
                const token = localStorage.getItem("token")
                if(!isTokenValid(token)){
                      localStorage.removeItem('token')
                      navigate("/")
                    }
                const response = await axios.get(`${RAABTA_API}/api/Contact/GetContactDetails`, {
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
    }, [isEditing])

    const handleEditClick = () => {
        setIsEditing(true);
    }

    const goBack = (e) => {
        navigate(`/contact/${contact.contactDetailsID}`)
    }

    return (
        <div>
            {isEditing ? 
                (<AddEditInteraction interaction={interaction} contacts = {allContacts} setIsEditing = {setIsEditing} setInteraction={setInteraction}/>) : (
                    <div>
                    {/* <h2 className="interaction-details-heading">Interaction Details</h2> */}
            <div className='interaction-details'>
            <div className='heading-back-button'>
                <button onClick={goBack} className='interaction-back-button'>Back</button>
                <h2 className='heading-interaction-details'>Interaction Details</h2>
            </div>
            <div>
                <label>Name of Contact: </label>
                <span className='interaction-details-span'>{contact.name}</span>
            </div>

            <div>
                <label>Date of Meeting : </label>
                <span className='interaction-details-span'>{interaction.meetingDate?.split('T')[0]}</span>
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