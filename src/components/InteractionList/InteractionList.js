import React, {
    useCallback,
    useMemo,
    useRef,
    useState,
    StrictMode,
    useEffect,
  } from "react";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; // Assuming you are using axios, you can also use fetch
import Card from 'react-bootstrap/Card';
import './styles.css'
import { isTokenValid } from "../AuthenticationUtils/authUtils";

const InteractionsList  = ({contact}) => {
    const [interactions, setInteractions] = useState([])
    const [loading, setLoading] = useState(true); // State for loading
    const [error, setError] = useState(null); // State for error handling

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        console.log("useEffect")
        const fetchData = async () => {
            try {
                if(Object.keys(contact).length !== 0) {
                    console.log("contact is not null", contact);
                    const token = localStorage.getItem("token");
                    if(!isTokenValid(token)){
                          localStorage.removeItem('token')
                          navigate("/")
                        }
                const response = await axios.get(`http://localhost:5273/api/Interatction/GetInteratctionDetailsByContactID?id=${contact.contactDetailsID}`, {
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
    }, [contact, location.pathname])

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
        <div className="interaction-list-container">
        {interactions.map(interaction => (
                // <Card  key={interaction.id}>
                //     <Card.Body onClick={() => interactionDetailsPage(interaction.id, contact)}>
                //         <Card.Title>{interaction.reason}</Card.Title>
                //         <Card.Subtitle>{interaction.meetingDate?.split('T')[0]}</Card.Subtitle>
                //         <Card.Text>{interaction.comment}</Card.Text>
                //     </Card.Body>
                // </Card>

                <div onClick={() => interactionDetailsPage(interaction.id, contact)} key={interaction.id} className="interaction-container">
                    <p>{interaction.meetingDate?.split('T')[0]}</p>
                    <p>{interaction.comment}</p>
                </div>
        ))}
        </div>
            
            
        </div>
    );

}

export default InteractionsList;