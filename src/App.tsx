import React, { useEffect, useState } from 'react';
import CommentComponent from './components/Comment';
import ReplyForm from './components/ReplyForm';
import { Comment } from './types';
import { v4 as uuidv4 } from 'uuid';
import { useQuery } from 'react-query';


const fetchMessages = async () => {
  const response = await fetch('http://localhost:3100/api/messages');
  if (!response.ok) {
    throw new Error('Failed to fetch messages');
    
  }
  return response.json();
};

const App: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);

  // 

  // useEffect(() => {
  //     setComments(data);
  // }, [data]);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  //   return <div>Error fetching messages</div>;
  // }

   

  const addReply = (text: string, parentId: string) => {
    setComments(currentComments => {
      const addReplyToComment = (comments: Comment[], text: string, parentId: string): Comment[] => {
        return comments.map(comment => {
          if (comment.id === parentId) {
            const newReply: Comment = {
              id: uuidv4(),
              author: {
                name: 'Current User',
                picture: '/src/assets/react.svg', // Putanja do slike vašeg default avatara
              },
              text,
              timestamp: new Date(),
            };
            return { ...comment, replies: [...(comment.replies || []), newReply] };
          }
          if (comment.replies) {
            return { ...comment, replies: addReplyToComment(comment.replies, text, parentId) };
          }
          return comment;
        });
      };

      return addReplyToComment(currentComments, text, parentId);
    });
  };

  // Render the comments and the form to add new comments at the same level
  return (
    <div className="container mx-auto p-4">
      {comments.map(comment => (
        <CommentComponent key={comment.id} comment={comment} addReply={addReply} />
      ))}
      <ReplyForm parentId="" addReply={(text, parentId) => {
        const newComment: Comment = {
          id: uuidv4(),
          author: {
            name: 'Current User',
            picture: '/src/assets/react.svg', // Putanja do slike vašeg default avatara
          },
          text,
          timestamp: new Date(),
          replies: [],
        };
        setComments([...comments, newComment]);
      } } onReplySent={function (): void {
        throw new Error('Function not implemented.');
      } } />
    </div>
  );
};

export default App;
