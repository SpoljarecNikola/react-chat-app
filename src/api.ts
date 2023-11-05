import axios from 'axios';

interface Comment {
  id?: string; // id može biti opcionalan jer server može dodijeliti id
  parent_id?: string;
  text: string;
  author?: string; // može biti opcionalan ako server automatski dodaje autora
  // Dodajte sve ostale potrebne atribute koje koristi vaš API
}

const apiClient = axios.create({
  baseURL: 'http://localhost:3100/api',
});

export const fetchComments = async () => {
  const { data } = await apiClient.get('/messages');
  return data;
};

export const postComment = async (comment: Comment) => {
  const { data } = await apiClient.post('/messages', comment);
  return data;
};
