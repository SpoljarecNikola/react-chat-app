import React from "react";

interface MessageProps {
  message: {
    id: string,
    author: {
      name: string,
      picture: string,
    },
    text: string,
  };
}

const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <div className="message">
      <img src={message.author.picture} alt={message.author.name} />
      <div className="message-content">
        <div className="author">{message.author.name}</div>
        <div className="text">{message.text}</div>
      </div>
    </div>
  );
};

export default Message;
