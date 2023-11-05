import { Comment } from "../types";

const API_URL = 'http://localhost:3100/api/messages';

export const fetchMessages = async (): Promise<Comment[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch messages');
  }
  return response.json();
};

export const postComment = async (comment: Comment) => {
    console.log(comment)
  const response = await fetch('http://localhost:3100/api/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });
  if (!response.ok) {
    throw new Error('Failed to post new comment');
  }
  
  return response;
};
