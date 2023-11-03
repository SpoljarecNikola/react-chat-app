import { useQuery } from 'react-query';

interface Message {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

const fetchMessages = async () => {
  const response = await fetch('http://localhost:3100/api/messages');
  if (!response.ok) {
    throw new Error('Failed to fetch messages');
    
  }
  return response.json();
};

 function MyComponent() {
  const { data, isLoading, isError } = useQuery('messages', fetchMessages);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching messages</div>;
  }
  return (
    <div>
      {data.map((message: Message) => (
        
        <div key={message.id}><div>Username: {message.author}</div><div>Text: {message.text}</div><div>Time: {message.timestamp}</div></div>
      ))}
    </div>
  );
}

export default MyComponent;