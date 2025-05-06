import apiService from './apiService';

const contactService = {
  // Get all contacts
  getAllContacts: () => {
    return apiService.get('/api/Contact/GetContactDetails');
  },

  // Get contact by ID
  getContactById: (id) => {
    return apiService.get(`/api/Contact/GetContactDetailsById${id}`);
  },

  // Create new contact
  createContact: (contactData) => {
    return apiService.post('/api/Contact/PostContactDetails', contactData);
  },

  // Update contact
  updateContact: (id, contactData) => {
    return apiService.put(`/api/Contact/PutContactDetails?id=${id}`, contactData);
  },
};

export default contactService;
