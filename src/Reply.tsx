// Reply.tsx
import React from "react";

interface ReplyProps {
  reply: {
    id: string;
    parentId: string; // Dodaj parentId
    author: {
      name: string;
      picture: string;
    };
    text: string;
  };
}

const Reply: React.FC<ReplyProps> = ({ reply }) => {
  return (
    <div className="reply">
      <img src={reply.author.picture} alt={reply.author.name} />
      <div className="reply-content">
        <div className="author">{reply.author.name}</div>
        <div className="text">{reply.text}</div>
      </div>
    </div>
  );
};

export default Reply;
