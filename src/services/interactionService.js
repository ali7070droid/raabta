import apiService from './apiService';

const interactionService = {
  // Get all interactions
  getAllInteractions: () => {
    return apiService.get('/api/Interatction/GetInteratctionDetailsList');
  },

  // Get interactions by contact ID
  getInteractionsByContactId: (contactId) => {
    return apiService.get(
      `/api/Interatction/GetInteratctionDetailsByContactId?contactId=${contactId}`,
    );
  },

  // Get interaction by ID
  getInteractionById: (id) => {
    return apiService.get(`/api/Interatction/GetInteratctionDetailsByID?id=${id}`);
  },

  // Create new interaction
  createInteraction: (interactionData) => {
    return apiService.post('/api/Interatction/PostInteratctionDetails', interactionData);
  },

  // Update interaction
  updateInteraction: (id, interactionData) => {
    return apiService.put(`/api/Interatction/PutInteratctionDetails?id=${id}`, interactionData);
  },
};

export default interactionService;
