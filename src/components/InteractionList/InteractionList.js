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


const InteractionsList  = ({id}) => {
    const [interactions, setInteractions] = useState([])
    const [loading, setLoading] = useState(true); // State for loading
    const [error, setError] = useState(null); // State for error handling
    // const { id } = useParams();
    // const contact = contacts.find(contact => contact.id === id);
    // useEffect(() => {
    //     console.log(id)
    //     fetch("http://localhost:8081/mockInteractions")
    //     .then(response => response.json())
    //     .then((data) => setInteractions(data))
    //     console.log(interactions)
    // }, []) //check this part
    const navigate = useNavigate();

    useEffect(() => {
        console.log("useEffect")
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8081/mockInteractions")
                console.log(Array.isArray(response.data))
                setInteractions(response.data)
                console.log(Array.isArray(interactions))
                interactions.map(interaction => {
                    console.log(interaction)
                })
            }
            catch(error) {
                setError(error)
            }
            finally {
                setLoading(false)
            }
        };

        fetchData();
    }, [])

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

    const interactionDetailsPage = (id) => {
        navigate(`/interaction/${id}`)
        console.log(id)
    }


    return (
        <div>
            {interactions.map(interaction => (
                <Card  key={interaction.id}>
                    <Card.Body onClick={() => interactionDetailsPage(interaction.id)}>
                        <Card.Title>{interaction.reasonForMeeting}</Card.Title>
                        <Card.Subtitle>{interaction.dateOfMeeting}</Card.Subtitle>
                        <Card.Text>{interaction.comment}</Card.Text>
                    </Card.Body>
                </Card>
        ))}

        <button onClick={handleAddInteractionClick}>Add Interaction</button>
            
        </div>
    );

}

export default InteractionsList;