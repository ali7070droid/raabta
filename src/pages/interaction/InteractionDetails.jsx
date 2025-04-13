import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Card } from '../../components/ui';
import { contactService, interactionService } from '../../services';
import { isTokenValid } from '../../utils/authUtils';
import InteractionForm from './InteractionForm';

const InteractionDetails = () => {
  const [interaction, setInteraction] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const location = useLocation();
  const { contact = {} } = location.state || {};
  const [allContacts, setAllContacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');
        if (!isTokenValid(token)) {
          localStorage.removeItem('token');
          navigate('/');
          return;
        }

        const data = await interactionService.getInteractionById(id);
        if (data) {
          setInteraction(data);
        } else {
          setError('Interaction not found');
        }
      } catch (error) {
        console.error('Error fetching interaction:', error);
        setError('Failed to load interaction details');
      } finally {
        setLoading(false);
      }
    };

    const fetchAllContacts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!isTokenValid(token)) {
          localStorage.removeItem('token');
          navigate('/');
          return;
        }

        const data = await contactService.getAllContacts();
        if (Array.isArray(data)) {
          setAllContacts(data);
        } else {
          setAllContacts([]);
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    if (!isEditing) {
      fetchData();
      fetchAllContacts();
    }
  }, [isEditing, id, navigate]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const goBack = () => {
    if (contact?.contactDetailsID) {
      navigate(`/contact/${contact.contactDetailsID}`);
    } else {
      navigate('/contacts');
    }
  };

  if (isEditing) {
    return (
      <InteractionForm
        interaction={interaction}
        contacts={allContacts}
        setIsEditing={setIsEditing}
        setInteraction={setInteraction}
      />
    );
  }

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center text-red-500 dark:text-red-400">{error}</div>
        <div className="mt-4 text-center">
          <Button onClick={goBack} variant="primary" size="sm">
            Go Back
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Button onClick={goBack} variant="secondary" size="sm">
          Back
        </Button>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Interaction Details</h2>
        <div className="w-20"></div>
      </div>

      <div className="space-y-4">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
          <label className="font-medium text-gray-700 dark:text-gray-300">Name of Contact: </label>
          <span className="ml-2 text-gray-900 dark:text-gray-100">{contact?.name || 'N/A'}</span>
        </div>

        <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
          <label className="font-medium text-gray-700 dark:text-gray-300">Date of Meeting: </label>
          <span className="ml-2 text-gray-900 dark:text-gray-100">
            {interaction.meetingDate ? interaction.meetingDate.split('T')[0] : 'N/A'}
          </span>
        </div>

        <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
          <label className="font-medium text-gray-700 dark:text-gray-300">
            Type Of Interaction:{' '}
          </label>
          <span className="ml-2 text-gray-900 dark:text-gray-100">
            {interaction.reason || 'N/A'}
          </span>
        </div>

        <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
          <label className="font-medium text-gray-700 dark:text-gray-300">Comment: </label>
          <p className="mt-1 text-gray-900 dark:text-gray-100">{interaction.comment || 'N/A'}</p>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Button onClick={handleEditClick} variant="warning" size="sm">
          Edit Interaction
        </Button>
      </div>
    </Card>
  );
};

export default InteractionDetails;
