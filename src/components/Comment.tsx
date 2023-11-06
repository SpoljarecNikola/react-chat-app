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

    <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
      <div className="flex items-start space-x-3">
        <img className="w-8 h-8 rounded-full" src={comment.author.picture} alt={`Avatar of ${comment.author.name}`} />
        <div className="flex-1">
          <h5 className="text-sm font-bold">{comment.author.name}</h5>
          <p className="text-xs text-gray-600">{comment.text}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-gray-400">{new Date(comment.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
        <button
          onClick={handleReplyClick}
          className="text-xs text-blue-500 hover:text-blue-600 transition-colors duration-300"
        >
          Reply ({comment.replies?.length})
        </button>
      </div>
      {showReplyForm && <ReplyForm parentId={comment.id} addReply={addReply} onReplySent={() => setShowReplyForm(false)}/>}
      <div className="mt-2 pl-11">
        {comment.replies && comment.replies.map(reply => (
          <CommentComponent key={reply.id} comment={reply} addReply={addReply} />
        ))}
      </div>
    </div>
  );
};

export default CommentComponent;

  
{/* <ReplyForm parentId={comment.id} addReply={addReply} onReplySent={() => setShowReplyForm(false)}/> */}