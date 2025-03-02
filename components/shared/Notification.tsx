import React, { useEffect, useState } from 'react';
import { Toast } from './Toast';

interface NotificationProps {
  websocketUrl: string;
}

interface Message {
  id: number;
  content: string;
}

export const Notification: React.FC<NotificationProps> = ({ websocketUrl }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const socket = new WebSocket(websocketUrl);

    socket.onmessage = (event) => {
      const newMessage: Message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    return () => {
      socket.close();
    };
  }, [websocketUrl]);

  return (
    <div>
      {messages.map((message) => (
        <Toast key={message.id} message={message.content} />
      ))}
    </div>
  );
};