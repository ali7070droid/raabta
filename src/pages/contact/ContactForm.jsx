import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Input, Loader, Select, Textarea } from '../../components/ui';
import { contactService, notificationService } from '../../services';
import { isTokenValid } from '../../utils/authUtils';

const ContactForm = ({ contact, setIsEditing, setContact }) => {
  const [formData, setFormData] = useState(contact || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!isTokenValid(token)) {
      localStorage.removeItem('token');
      navigate('/');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (id) {
        // Update existing contact
        await contactService.updateContact(id, formData);

        if (setIsEditing && typeof setIsEditing === 'function') {
          setIsEditing(false);
        }

        if (setContact && typeof setContact === 'function') {
          setContact(formData);
        }

        notificationService.success('Success', 'Contact updated successfully');
        navigate(`/contact/${id}`);
      } else {
        // Create new contact
        // Handle AIM relation empty value if No selected
        const dataToSubmit = { ...formData };
        if (dataToSubmit.isAIM === 'N') {
          dataToSubmit.relation = '';
        }

        await contactService.createContact(dataToSubmit);
        notificationService.success('Success', 'Contact created successfully');
        navigate('/contacts');
      }
    } catch (error) {
      console.error(`Error ${id ? 'updating' : 'creating'} contact:`, error);
      setError(`Failed to ${id ? 'update' : 'create'} contact. Please try again.`);
      notificationService.error(
        'Error',
        `Failed to ${id ? 'update' : 'create'} contact. Please try again.`,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    if (id) {
      if (setIsEditing && typeof setIsEditing === 'function') {
        setIsEditing(false);
      }
      navigate(`/contact/${id}`);
    } else {
      navigate('/contacts');
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center">
          {id ? 'Edit Contact' : 'Add Contact'}
        </h2>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Input
            id="name"
            label="Name"
            type="text"
            name="name"
            value={formData?.name || ''}
            onChange={handleChange}
            required
          />

          <Input
            id="phone"
            label="Phone Number"
            type="tel"
            name="phone"
            value={formData?.phone || ''}
            onChange={handleChange}
            required
          />

          <div className="md:col-span-2">
            <Textarea
              id="address"
              label="Address"
              name="address"
              rows={3}
              value={formData?.address || ''}
              onChange={handleChange}
              required
            />
          </div>

          <Input
            id="designation"
            label="Designation"
            type="text"
            name="designation"
            value={formData?.designation || ''}
            onChange={handleChange}
            required
          />

          <Select
            id="priority"
            label="Priority"
            name="priority"
            value={formData?.priority || ''}
            onChange={handleChange}
            required
            options={['High', 'Medium', 'Low']}
          />

          <Select
            id="isAIM"
            label="Related To AIM"
            name="isAIM"
            value={formData?.isAIM || ''}
            onChange={handleChange}
            required
            options={[
              { value: 'Y', label: 'Yes' },
              { value: 'N', label: 'No' },
            ]}
          />

          {formData?.isAIM === 'Y' && (
            <Input
              id="relation"
              label="Relation"
              type="text"
              name="relation"
              value={formData?.relation || ''}
              onChange={handleChange}
              required
            />
          )}

          <Input
            id="contactAddedBy"
            label="Contacted By"
            type="text"
            name="contactAddedBy"
            value={formData?.contactAddedBy || ''}
            onChange={handleChange}
            required
          />

          <Input
            id="contactOwnership"
            label="Contact Ownership"
            type="text"
            name="contactOwnership"
            value={formData?.contactOwnership || ''}
            onChange={handleChange}
            required
          />

          <Select
            id="status"
            label="State"
            name="status"
            value={formData?.status || ''}
            onChange={handleChange}
            required
            options={['Active', 'Inactive']}
          />
        </div>

        <div className="flex justify-center space-x-4 mb-2">
          <Button type="button" onClick={handleCancel} variant="secondary" disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="success" disabled={loading}>
            {loading ? (
              <div className="flex items-center">
                <Loader size="sm" color="white" />
                <span className="ml-2">{id ? 'Updating...' : 'Saving...'}</span>
              </div>
            ) : id ? (
              'Update Contact'
            ) : (
              'Add Contact'
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ContactForm;
