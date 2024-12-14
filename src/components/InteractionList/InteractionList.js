import React, {
    useCallback,
    useMemo,
    useRef,
    useState,
    StrictMode,
    useEffect,
  } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Assuming you are using axios, you can also use fetch
import Card from 'react-bootstrap/Card';


const InteractionsList  = ({contact}) => {
    const [interactions, setInteractions] = useState([])
    const [loading, setLoading] = useState(true); // State for loading
    const [error, setError] = useState(null); // State for error handling

    const navigate = useNavigate();

    useEffect(() => {
        console.log("useEffect")
        const fetchData = async () => {
            try {
                if(Object.keys(contact).length !== 0) {
                    console.log("contact is not null", contact);
                    const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:5273/api/Interatction/GetInteractionDetailsByContactID?contactId=${contact.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setInteractions(response.data)
                }
                
            }
            catch(error) {
                setError(error)
            }
            finally {
                setLoading(false)
            }
        };

        fetchData();
    }, [contact])

    const handleAddInteractionClick = () => {
        navigate("/add-interaction");
    }

    if(loading) {
        return (
            <div>Loading...</div>
        );
    }

    if(error) {
        return <div>{error}</div>
    }

    const interactionDetailsPage = (id, contact) => {
        navigate(`/interaction/${id}`, {state:{contact}})
        console.log(id)
    }


    return (
        <div>
            {interactions.map(interaction => (
                <Card  key={interaction.id}>
                    <Card.Body onClick={() => interactionDetailsPage(interaction.id, contact)}>
                        <Card.Title>{interaction.reasonForMeeting}</Card.Title>
                        <Card.Subtitle>{interaction.dateOfMeeting}</Card.Subtitle>
                        <Card.Text>{interaction.comment}</Card.Text>
                    </Card.Body>
                </Card>
        ))}

        {/* <button onClick={handleAddInteractionClick}>Add Interaction</button> */}
            
        </div>
    );

}

export default InteractionsList;