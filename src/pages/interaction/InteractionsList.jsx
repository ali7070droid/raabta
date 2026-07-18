import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Table } from '../../components/ui';
import { interactionService } from '../../services';
import { isTokenValid } from '../../utils/authUtils';

const InteractionsList = ({ contact }) => {
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchInteractions = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');
        if (!isTokenValid(token)) {
          localStorage.removeItem('token');
          navigate('/');
          return;
        }

        let data;
        if (contact?.contactDetailsID) {
          data = await interactionService.getInteractionsByContactId(contact.contactDetailsID);
        } else {
          data = await interactionService.getAllInteractions();
        }

        if (isMounted) {
          if (Array.isArray(data?.interactions)) {
            setInteractions(data.interactions);
          } else if (Array.isArray(data)) {
            setInteractions(data);
          } else {
            console.warn('API did not return an array for interactions', data);
            setInteractions([]);
          }
        }
      } catch (error) {
        console.error('Error fetching interactions:', error);
        if (isMounted) setError('Failed to load interactions');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchInteractions();
    return () => {
      isMounted = false;
    };
  }, [contact, navigate]);

  const handleRowClick = (interaction) => {
    if (interaction?.id) {
      navigate(`/interaction/${interaction.id}`, {
        state: { contact: contact || {} },
      });
    }
  };

  const handleAddInteraction = () => {
    navigate('/interactions/add', {
      state: { contact: contact || {} },
    });
  };

  const columns = useMemo(
    () => [
      {
        field: 'meetingDate',
        headerName: 'Date',
        cellRenderer: (row) => row.meetingDate?.split('T')[0] ?? 'N/A',
      },
      {
        field: 'reason',
        headerName: 'Type',
        cellRenderer: (row) => row.reason || 'N/A',
      },
      {
        field: 'comment',
        headerName: 'Comment',
        cellRenderer: (row) => row.comment || 'N/A',
      },
    ],
    [],
  );

  return (
    <Card className="mt-6 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Interactions</h2>
        <Button
          onClick={handleAddInteraction}
          variant="info"
          size="sm"
          icon={<span className="mr-1">+</span>}
        >
          Add Interaction
        </Button>
      </div>

      {loading ? (
        <div className="p-4 text-center dark:text-gray-300">Loading interactions...</div>
      ) : error ? (
        <div className="p-4 text-center text-red-600 dark:text-red-400">{error}</div>
      ) : interactions.length > 0 ? (
        <Table
          data={interactions}
          columns={columns}
          onRowClick={handleRowClick}
          searchPlaceholder="Search interactions..."
          hoverable
          striped
        />
      ) : (
        <div className="p-8 text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-md">
          <p className="mb-4">No interactions found</p>
          <Button onClick={handleAddInteraction} variant="info">
            Add Your First Interaction
          </Button>
        </div>
      )}
    </Card>
  );
};

export default InteractionsList;
