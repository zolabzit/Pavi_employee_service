// api.js

import axios from 'axios';

const api = {
  getTrainingPrograms: async () => {
    const response = await axios.get('/api/training-programs');
    return response.data;
  },

  getUserProgress: async () => {
    const response = await axios.get('/api/user-progress');
    return response.data;
  },

  getSuggestedCourses: async () => {
    const response = await axios.get('/api/suggested-courses');
    return response.data;
  },
};

export default api;
