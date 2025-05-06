import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Table } from '../../components/ui';
import { contactService } from '../../services';
import { isTokenValid } from '../../utils/authUtils';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchContacts = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');
        if (!isTokenValid(token)) {
          localStorage.removeItem('token');
          navigate('/');
          return;
        }

        const data = await contactService.getAllContacts();
        if (Array.isArray(data?.contacts)) {
          setContacts(data.contacts);
        } else if (Array.isArray(data)) {
          setContacts(data);
        } else {
          console.warn('API did not return an array for contacts', data);
          setContacts([]);
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setError('Failed to load contacts');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchContacts();
    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const handleRowClick = (contact) => {
    if (contact?.contactDetailsID) {
      navigate(`/contact/${contact.contactDetailsID}`);
    }
  };

  const handleAddContact = () => navigate('/contacts/add');

  const columns = useMemo(
    () => [
      {
        field: 'name',
        headerName: 'Name',
      },
      {
        field: 'phone',
        headerName: 'Phone',
      },
      {
        field: 'designation',
        headerName: 'Designation',
      },
      {
        field: 'priority',
        headerName: 'Priority',
        cellRenderer: (row) => (
          <span
            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
              row.priority === 'High'
                ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                : row.priority === 'Medium'
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                  : row.priority === 'Low'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            {row.priority || 'N/A'}
          </span>
        ),
      },
    ],
    [],
  );

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Contacts</h2>
        <Button
          onClick={handleAddContact}
          variant="success"
          size="sm"
          icon={<span className="mr-1">+</span>}
        >
          Add Contact
        </Button>
      </div>

      {loading ? (
        <div className="p-4 text-center dark:text-gray-300">Loading contacts...</div>
      ) : error ? (
        <div className="p-4 text-center text-red-600 dark:text-red-400">{error}</div>
      ) : contacts.length > 0 ? (
        <Table
          data={contacts}
          columns={columns}
          onRowClick={handleRowClick}
          searchPlaceholder="Search contacts..."
          striped
          hoverable
        />
      ) : (
        <div className="p-8 text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-md">
          <p className="mb-4">No contacts found</p>
          <Button onClick={handleAddContact} variant="success">
            Add Your First Contact
          </Button>
        </div>
      )}
    </Card>
  );
};

export default ContactList;
