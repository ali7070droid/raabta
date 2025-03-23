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
import { RAABTA_API } from "../../Constants";
import { Button, Modal } from "react-bootstrap";

const InteractionsList  = ({contact}) => {
    const [interactions, setInteractions] = useState([])
    const [loading, setLoading] = useState(true); // State for loading
    const [error, setError] = useState(null); // State for error handling
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // console.log("useEffect")
        const fetchData = async () => {
            try {
                if(Object.keys(contact).length !== 0) {
                    // console.log("contact is not null", contact);
                    const token = localStorage.getItem("token");
                    if(!isTokenValid(token)){
                          localStorage.removeItem('token')
                          navigate("/")
                        }
                const response = await axios.get(`${RAABTA_API}/api/Interatction/GetInteratctionDetailsByContactID?id=${contact.contactDetailsID}`, {
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

    const deleteInteraction = async (interaction) => {
        try {
            if(Object.keys(contact).length !== 0) {
                // console.log("contact is not null", contact);
                const token = localStorage.getItem("token");
                if(!isTokenValid(token)){
                      localStorage.removeItem('token')
                      navigate("/")
                    }
            const response = await axios.delete(`${RAABTA_API}/api/Interatction/DeleteInteratctionDetails?id=${interaction.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                console.log("Interaction deleted successfully");
                setShowModal(false);
                // Optionally, trigger a refresh function to update the UI
              } else {
                // console.error("Failed to delete interaction");
              }
            }
    
          
        } catch (error) {
          console.error("Error deleting interaction:", error);
        }
      };

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
        // console.log(id)
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
                    <p><strong>{interaction.meetingDate?.split('T')[0]} : </strong></p>
                    <p><strong>{interaction.reason}</strong> - </p>
                    <p>{interaction.comment}</p>
                    {/* Delete Button */}
                    <button 
                        className="delete-button"
                        onClick={(e) => { 
                        e.stopPropagation(); // Prevent triggering interactionDetailsPage
                        setShowModal(true);
                        }}
                    >
                        Delete Interaction
                    </button>

                    {/* Bootstrap Modal */}
                    <Modal 
                        show={showModal} 
                        onHide={() => setShowModal(false)} 
                        centered
                        onClick={(e) => e.stopPropagation()} // Prevents modal click from bubbling up
                    >
                        <Modal.Header closeButton onClick={(e) => e.stopPropagation()}>
                        <Modal.Title>Confirm Deletion</Modal.Title>
                        </Modal.Header>
                        <Modal.Body onClick={(e) => e.stopPropagation()}>
                        Are you sure you want to delete this interaction?
                        </Modal.Body>
                        <Modal.Footer onClick={(e) => e.stopPropagation()}>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            No
                        </Button>
                        <Button variant="danger" onClick={() => deleteInteraction(interaction)}>
                            Yes
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
        ))}
        </div>
            
            
        </div>
    );

}

export default InteractionsList;