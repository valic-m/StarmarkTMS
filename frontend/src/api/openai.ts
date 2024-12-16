import api from './index'; // Import the centralized API utility

/**
 * Send a message to OpenAI's chat endpoint.
 * @param message - The input message for OpenAI.
 * @returns The reply from OpenAI.
 */
export const sendMessageToOpenAI = async (message: string): Promise<string> => {
  try {
    const response = await api('/openai/chat/', {
      method: 'POST',
      body: { message }
    });
    return response.reply; // Assuming the backend sends { reply: "..." }
  } catch (error: any) {
    console.error('Error communicating with OpenAI:', error.message || error);
    throw error;
  }
};

/**
 * Example: Retrieve model details from OpenAI (if needed).
 * @returns List of available models.
 */
export const fetchOpenAIModels = async (): Promise<string[]> => {
  try {
    const response = await api('/openai/models/', {
      method: 'GET'
    });
    return response.models; // Assuming the backend sends { models: [...] }
  } catch (error: any) {
    console.error('Error fetching OpenAI models:', error.message || error);
    throw error;
  }
};
