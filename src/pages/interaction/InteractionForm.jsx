import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Input, Loader, Select, Textarea, Typeahead } from '../../components/ui';
import { interactionService } from '../../services';
import { isTokenValid } from '../../utils/authUtils';

const InteractionForm = ({ interaction, contacts, setIsEditing, setInteraction }) => {
  const [formData, setFormData] = useState(interaction || {});
  const { id } = useParams();
  const location = useLocation();
  const { contact, contactsFromState } = location.state || {};
  const [contactForId, setContactForId] = useState(contact || {});
  const [loading, setLoading] = useState(false);

  const nameValue = () => {
    if (contact?.name) {
      return contact.name;
    } else {
      return formData?.name || '';
    }
  };

  const optionsValue = () => {
    if (contacts && contacts.length > 0) {
      return contacts.map((item) => item.name || '');
    } else {
      if (!contactsFromState || contactsFromState.length === 0) {
        return [];
      }
      return contactsFromState.map((item) => item.name || '');
    }
  };

  const [name, setName] = useState(() => nameValue());
  const options = useState(() => optionsValue())[0];

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!isTokenValid(token)) {
      localStorage.removeItem('token');
      navigate('/');
      return;
    }

    if (!contactForId?.contactDetailsID) {
      console.error('Contact ID is required');
      return;
    }

    if (id) {
      try {
        // For editing an existing interaction
        const dataToSubmit = { ...formData };
        // Make sure we have a valid date format
        if (dataToSubmit.interactionDate) {
          dataToSubmit.interactionDate = dataToSubmit.interactionDate.split('T')[0];
        } else {
          dataToSubmit.interactionDate = new Date().toISOString().split('T')[0];
        }
        dataToSubmit.contactDetailsID = contactForId.contactDetailsID;

        setLoading(true);
        await interactionService.updateInteraction(dataToSubmit.id, dataToSubmit);
        if (setIsEditing && typeof setIsEditing === 'function') {
          setIsEditing(false);
        }
        if (setInteraction && typeof setInteraction === 'function') {
          setInteraction(dataToSubmit);
        }
        navigate(`/interaction/${dataToSubmit.id}`, { state: { contact: contactForId } });
      } catch (error) {
        console.error('Error updating interaction:', error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        // For adding a new interaction
        const dataToSubmit = { ...formData };
        dataToSubmit.interactionDate = new Date().toISOString().split('T')[0];
        dataToSubmit.contactDetailsID = contactForId.contactDetailsID;

        setLoading(true);
        await interactionService.createInteraction(dataToSubmit);
        navigate(`/contact/${contactForId.contactDetailsID}`);
      } catch (error) {
        console.error('Error creating interaction:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeTypeAhead = (selected) => {
    if (selected.length > 0 && contactsFromState && contactsFromState.length > 0) {
      const newContact = contactsFromState.find((c) => c.name === selected[0]);
      if (newContact) {
        setContactForId(newContact);
        setName(selected[0]);
      }
    }
  };

  const handleCancel = () => {
    if (id) {
      if (setIsEditing && typeof setIsEditing === 'function') {
        setIsEditing(false);
      }
      navigate(`/interaction/${formData.id}`, { state: { contact: contactForId } });
    } else {
      navigate('/contacts');
    }
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center">
          {id ? 'Edit Interaction' : 'Add Interaction'}
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Name of Contact
            </label>
            <Typeahead
              id="contact-names"
              onChange={handleChangeTypeAhead}
              options={options || []}
              placeholder="Choose a contact..."
              selected={name ? [name] : []}
            />
          </div>

          <Input
            id="meetingDate"
            label="Date of Meeting"
            type="date"
            name="meetingDate"
            value={formData?.meetingDate ? formData.meetingDate.split('T')[0] : ''}
            onChange={handleChange}
            required
          />

          <Select
            id="reason"
            label="Type Of Interaction"
            name="reason"
            value={formData?.reason || ''}
            onChange={handleChange}
            required
            options={[
              'Call',
              'In Person',
              'Ulema Daawat',
              'Invited As Speaker',
              'Correspondence',
              'Others',
            ]}
          />

          <Textarea
            id="comment"
            label="Comment"
            name="comment"
            rows={4}
            value={formData?.comment || ''}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex justify-center space-x-4 mt-8">
          <Button type="button" onClick={handleCancel} variant="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="info">
            {loading ? (
              <div className="flex items-center">
                <Loader size="sm" color="white" />
                <span className="ml-2">{id ? 'Updating...' : 'Saving...'}</span>
              </div>
            ) : id ? (
              'Update Interaction'
            ) : (
              'Add Interaction'
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default InteractionForm;
