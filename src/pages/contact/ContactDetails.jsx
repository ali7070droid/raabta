import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card } from '../../components/ui';
import { contactService } from '../../services';
import { isTokenValid } from '../../utils/authUtils';
import { InteractionsList } from '../interaction';
import ContactForm from './ContactForm';

const ContactDetails = () => {
  const { id } = useParams();
  const [contact, setContact] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');
        if (!isTokenValid(token)) {
          localStorage.removeItem('token');
          navigate('/');
          return;
        }

        if (!isEditing && id) {
          const data = await contactService.getContactById(id);
          if (data) {
            setContact(data);
          } else {
            setError('Contact not found');
          }
        }
      } catch (error) {
        console.error('Failed to fetch contact:', error);
        setError('Failed to load contact details');
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id, isEditing, navigate]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleAddInteractionClick = () => {
    if (contact?.contactDetailsID) {
      navigate('/interactions/add', { state: { contact } });
    } else {
      console.error('Contact ID is required to add interaction');
    }
  };

  const handleBackButton = () => {
    navigate('/contacts');
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="text-center">Loading contact details...</div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center text-red-500">{error}</div>
        <div className="mt-4 text-center">
          <Button
            onClick={handleBackButton}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Contacts
          </Button>
        </div>
      </Card>
    );
  }

  if (isEditing) {
    return <ContactForm contact={contact} setIsEditing={setIsEditing} setContact={setContact} />;
  }

  if (!contact || Object.keys(contact).length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center">Contact not found!</div>
        <div className="mt-4 text-center">
          <Button
            onClick={handleBackButton}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Contacts
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <Button onClick={handleBackButton} variant="secondary">
            Back
          </Button>
          <h2 className="text-xl font-bold">Contact Details</h2>
          <Button onClick={handleShowDetails} variant="secondary">
            {showDetails ? 'Hide Details' : 'Show Details'}
          </Button>
        </div>

        {showDetails && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-b pb-2">
                <label className="font-medium">Name: </label>
                <span className="ml-2">{contact.name || 'N/A'}</span>
              </div>

              <div className="border-b pb-2">
                <label className="font-medium">Phone Number: </label>
                <span className="ml-2">{contact.phone || 'N/A'}</span>
              </div>

              <div className="border-b pb-2 md:col-span-2">
                <label className="font-medium">Address: </label>
                <span className="ml-2">{contact.address || 'N/A'}</span>
              </div>

              <div className="border-b pb-2">
                <label className="font-medium">Designation: </label>
                <span className="ml-2">{contact.designation || 'N/A'}</span>
              </div>

              <div className="border-b pb-2">
                <label className="font-medium">Priority: </label>
                <span className="ml-2">{contact.priority || 'N/A'}</span>
              </div>

              {contact.isAIM === 'Y' && (
                <div className="border-b pb-2">
                  <label className="font-medium">Relation: </label>
                  <span className="ml-2">{contact.relation || 'N/A'}</span>
                </div>
              )}

              <div className="border-b pb-2">
                <label className="font-medium">Contacted By: </label>
                <span className="ml-2">{contact.contactAddedBy || 'N/A'}</span>
              </div>

              <div className="border-b pb-2">
                <label className="font-medium">Contact Ownership: </label>
                <span className="ml-2">{contact.contactOwnership || 'N/A'}</span>
              </div>

              <div className="border-b pb-2">
                <label className="font-medium">State: </label>
                <span className="ml-2">{contact.status || 'N/A'}</span>
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <Button onClick={handleEditClick} variant="warning" size="sm">
                Edit Contact
              </Button>
            </div>
          </div>
        )}
      </Card>

      <div className="flex justify-center">
        <Button
          onClick={handleAddInteractionClick}
          variant="info"
          size="sm"
          icon={<span className="mr-1">+</span>}
        >
          Add Interaction
        </Button>
      </div>

      <InteractionsList contact={contact} />
    </div>
  );
};

export default ContactDetails;
