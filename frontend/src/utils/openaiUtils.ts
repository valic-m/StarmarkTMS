import { sendMessageToOpenAI, fetchOpenAIModels } from 'api/openai';

export const handleChat = async (message: string) => {
  try {
    const reply = await sendMessageToOpenAI(message);
    console.log('AI Reply:', reply);
    return reply;
  } catch (error) {
    console.error('OpenAI Chat Error:', error);
    throw error;
  }
};

export const loadAvailableModels = async () => {
  try {
    const models = await fetchOpenAIModels();
    console.log('Available Models:', models);
    return models;
  } catch (error) {
    console.error('Error loading OpenAI models:', error);
    throw error;
  }
};
