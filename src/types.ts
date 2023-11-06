export interface Comment {
  id: string;
  author: {
    name: string;
    picture: string;
  };
  text: string;
  timestamp: Date;
  replies: Comment[];
}
