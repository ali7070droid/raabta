import apiService from './apiService';

const interactionService = {
  // Get all interactions
  getAllInteractions: () => {
    return apiService.get('/api/Interaction/GetInteractionDetails');
  },

  // Get interactions by contact ID
  getInteractionsByContactId: (contactId) => {
    return apiService.get(
      `/api/Interaction/GetInteractionDetailsByContactId?id=${contactId}`,
    );
  },

  // Get interaction by ID
  getInteractionById: (id) => {
    return apiService.get(`/api/Interaction/GetInteractionDetailsByID?id=${id}`);
  },

  // Create new interaction
  createInteraction: (interactionData) => {
    return apiService.post('/api/Interaction/PostInteractionDetails', interactionData);
  },

  // Update interaction
  updateInteraction: (id, interactionData) => {
    return apiService.put(`/api/Interaction/PutInteractionDetails?id=${id}`, interactionData);
  },
};

export default interactionService;
