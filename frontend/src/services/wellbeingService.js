/**
 * Wellbeing Service
 * 
 * High-level functions to interact with the wellbeing backend.
 * Features: Sentiment analysis, AI Chat support, and trend tracking.
 */
const wellbeingService = {
  /**
   * Submit student text/journal entry for analysis
   * @param {string} text - The raw text from the student
   * @returns {Promise} - Analysis result (sentiment, stress level, recommendation)
   */
  performSentimentAnalysis: async (text) => {
    try {
      const response = await api.post('/wellbeing/analyze', { text });
      return response.data;
    } catch (error) {
      console.error('Error analyzing text:', error);
      throw error;
    }
  },

  /**
   * Get AI response from Mira
   * @param {Array} messages - Chat history
   * @param {string} mood - Current user mood context
   */
  getMiraChatResponse: async (messages, mood) => {
    try {
      const response = await api.post('/wellbeing/chat', { messages, mood });
      return response.data;
    } catch (error) {
      console.error('Error chatting with Mira:', error);
      throw error;
    }
  },

  /**
   * Fetch current wellbeing statistics
   */
  getStats: async () => {
    try {
      const response = await api.get('/wellbeing/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching stats:', error);
      return null;
    }
  },

  /**
   * Submit a journal entry
   */
  submitJournal: async (text) => {
    try {
      const response = await api.post('/wellbeing/journal', { text });
      return response.data;
    } catch (error) {
      console.error('Error submitting journal:', error);
      throw error;
    }
  }
};

export default wellbeingService;
