import React, { useState } from 'react';
import { sendMessageToOpenAI } from 'api/openai';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');

  const handleSendMessage = async () => {
    try {
      const aiReply = await sendMessageToOpenAI(message);
      setReply(aiReply);
    } catch (error) {
      console.error('Error communicating with OpenAI:', error);
    }
  };

  return (
    <div>
      <textarea
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={handleSendMessage}>Send to OpenAI</button>
      {reply && <p>OpenAI Reply: {reply}</p>}
    </div>
  );
};

export default Chat;
