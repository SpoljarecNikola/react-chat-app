import React, { useState } from 'react';
import { Comment } from '../types';
import ReplyForm from './ReplyForm'; // Osigurajte da je putanja ispravna

interface CommentProps {
  comment: Comment;
  addReply: (text: string, parentId: string) => void;
}

const CommentComponent: React.FC<CommentProps> = ({ comment, addReply }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReplyClick = () => {
    setShowReplyForm(!showReplyForm);
  };


  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
      <div className="flex items-start">
        <img className="w-10 h-10 rounded-full mr-4" src={comment.author.picture} alt={`Avatar of ${comment.author.name}`} />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h5 className="text-lg font-bold">{comment.author.name}</h5>
            <span className="text-sm text-gray-500">{comment.timestamp.toLocaleString()}</span>
          </div>
          <p className="mt-3 text-gray-700">{comment.text}</p>
          <button
            onClick={handleReplyClick}
            className="mt-2 text-sm px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
          >
            Reply
          </button>
          {showReplyForm && (
            <ReplyForm parentId={comment.id} addReply={addReply} onReplySent={() => setShowReplyForm(false)}/>
          )}
        </div>
      </div>
      {comment.replies && (
        <div className="mt-4 pl-12">
          {comment.replies.map(reply => (
            <CommentComponent key={reply.id} comment={reply} addReply={addReply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentComponent;