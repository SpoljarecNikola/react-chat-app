import React, { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Message from "./Message";
import Reply from "./Reply";
import MyComponent from './MyComponent';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from 'react-query';
const queryClient = new QueryClient();

interface MessageData {
  id: string;
  author: {
    name: string;
    picture: string;
  };
  text: string;
}

interface ReplyData extends MessageData {
  parentId: string;
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  const handleAddMessage = () => {
    // Simulirajte slanje nove poruke na server
    const newMessageData: MessageData = {
      id: (messages.length + 1).toString(),
      author: {
        name: "Novi Autor",
        picture: "img/novi.jpg",
      },
      text: newMessage,
    };

    setMessages([...messages, newMessageData]);
    setNewMessage("");
  };


  return (
    <div className="app">
      <QueryClientProvider client={queryClient}><MyComponent></MyComponent></QueryClientProvider>
      
      <div className="messages-container">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>

      <div className="message-input">
        <input
          type="text"
          placeholder="Unesite novu poruku..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleAddMessage}>Pošalji</button>
      </div>
    </div>
  );
};

export default App;
