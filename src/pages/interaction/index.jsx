import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { contactService } from '../../services';
import { isTokenValid } from '../../utils/authUtils';
import InteractionDetails from './InteractionDetails';
import InteractionForm from './InteractionForm';
import InteractionsList from './InteractionsList';

// Page Components
export const InteractionsPage = ({ contact }) => {
  return <InteractionsList contact={contact} />;
};

export const InteractionFormPage = () => {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!isTokenValid(token)) {
      localStorage.removeItem('token');
      navigate('/');
      return;
    }
    contactService
      .getAllContacts()
      .then((data) => {
        if (Array.isArray(data?.contacts)) setContacts(data.contacts);
        else if (Array.isArray(data)) setContacts(data);
      })
      .catch(console.error);
  }, [navigate]);

  return <InteractionForm contacts={contacts} />;
};

export const InteractionDetailsPage = () => {
  return <InteractionDetails />;
};

// Export components for direct use
export { InteractionsList, InteractionForm, InteractionDetails };
