import React, { useState } from "react";
import { Comment } from "../types";
import ReplyForm from "./ReplyForm"; // Osigurajte da je putanja ispravna

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
    <div className="flex flex-row">
      <div>
        <img
          className="w-8 h-8 mt-4 mr-1 rounded-full"
          src={comment.author.picture}
          alt={`Avatar of ${comment.author.name}`}
        />
      </div>

      <div>
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-1">
              <h5 className="text-sm font-bold">{comment.author.name}</h5>
              <p className="text-xs text-gray-600">{comment.text}</p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2"></div>
        </div>
        <div className="inline-flex items-center">
          <span className="text-xs text-gray-400">
            {new Date(comment.timestamp).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </span>
          <div className="mx-2 w-0.5 h-0.5 bg-gray-600 rounded-full"></div>
          <button
            onClick={handleReplyClick}
            className="text-xs text-blue-900 transition-colors duration-300 font-bold"
          >
            {comment.replies?.length == 0
              ? "Reply"
              : "Reply (" + comment.replies?.length + ")"}
          </button>
        </div>
        {showReplyForm && (
          <ReplyForm
            parentId={comment.id}
            addReply={addReply}
            onReplySent={() => setShowReplyForm(false)}
          />
        )}
        <div className="mt-2">
          {comment.replies &&
            comment.replies.map((reply) => (
              <CommentComponent
                key={reply.id}
                comment={reply}
                addReply={addReply}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CommentComponent;

{
  /* <ReplyForm parentId={comment.id} addReply={addReply} onReplySent={() => setShowReplyForm(false)}/> */
}
