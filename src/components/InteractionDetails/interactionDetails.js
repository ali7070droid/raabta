import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AddEditInteraction from '../addEditInteraction/addEditInteraction';
import "./styles.css"
const InteractionDetails = () => {
    const [interaction, setInteraction] = useState([])
    const { id } =useParams()
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/interaction/${id}`)
                setInteraction(response.data)
                console.log(interaction)
            }
            catch(error) {
                console.log(error)
            }
        };

        fetchData();
    }, [])

    const handleEditClick = () => {
        setIsEditing(true);
    }

    return (
        <div>
            {isEditing ? 
                (<AddEditInteraction interaction={interaction}/>) : (
                    <div>
                    <h2 className="interaction-details-heading">Interaction Details</h2>
            <div className='interaction-details'>
            <div>
                <label>Name of Contact: </label>
                <span className='interaction-details-span'>{interaction.nameOfContact}</span>
            </div>

            <div>
                <label>Date of Meeting : </label>
                <span className='interaction-details-span'>{interaction.dateOfMeeting}</span>
            </div>

            <div>
                <label>Type Of Interaction : </label>
                <span className='interaction-details-span'>{interaction.typeOfInteraction}</span>
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