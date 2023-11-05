import React, { useState } from 'react';

interface ReplyFormProps {
  parentId: string;
  addReply: (text: string, parentId: string) => void;
  onReplySent: () => void;
}

const ReplyForm: React.FC<ReplyFormProps> = ({ parentId, addReply, onReplySent }) => {
  const [text, setText] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addReply(text, parentId);
    setText('');
    onReplySent();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        className="w-full p-2 text-sm border rounded-md"
        placeholder="Write your reply..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">
        Submit
      </button>
    </form>
  );
};

export default ReplyForm;
