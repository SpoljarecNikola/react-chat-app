import React, { useState } from "react";
import arrowSrc from "../assets/arrow.svg";

interface ReplyFormProps {
  parentId: string;
  addReply: (text: string, parentId: string) => void;
  onReplySent: () => void;
}

const ReplyForm: React.FC<ReplyFormProps> = ({
  parentId,
  addReply,
  onReplySent,
}) => {
  const [text, setText] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addReply(text, parentId);
    setText("");
    onReplySent();
  };

  return (
    // <form onSubmit={handleSubmit} className="mt-4">
    //   <textarea
    //     className="w-full p-2 text-sm border rounded-md"
    //     placeholder="Write your reply..."
    //     value={text}
    //     onChange={(e) => setText(e.target.value)}
    //   />
    //   <button
    //     type="submit"
    //     className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
    //   >
    //     Submit
    //   </button>
    // </form>
    <form
      onSubmit={handleSubmit}
      className="flex items-center space-x-2 bg-white p-2 rounded-lg"
    >
      <button
        type="button"
        className="bg-blue-900 text-white font-bold py-2 px-4 rounded-md"
      >
        +
      </button>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 p-2 border rounded-lg"
      />

      <button
        type="submit"
        className="bg-blue-900 hover:bg-blue-950 text-white font-semibold py-2 px-4 rounded-r-lg flex items-center justify-center "
      >
        <svg
          className="svg-icon"
          style={{
            width: "18px",
            height: "18px",
            verticalAlign: "baseline",
            fill: "currentColor",
            overflow: "hidden",
            marginRight: "12px",
          }}
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M469.333333 597.333333c-12.8 0-21.333333-4.266667-29.866666-12.8-17.066667-17.066667-17.066667-42.666667 0-59.733333l469.333333-469.333333c17.066667-17.066667 42.666667-17.066667 59.733333 0s17.066667 42.666667 0 59.733333l-469.333333 469.333333c-8.533333 8.533333-17.066667 12.8-29.866667 12.8z" />
          <path d="M640 981.333333c-17.066667 0-34.133333-8.533333-38.4-25.6l-162.133333-366.933333-371.2-166.4C51.2 413.866667 42.666667 401.066667 42.666667 384s12.8-34.133333 29.866666-38.4l853.333334-298.666667c17.066667-4.266667 34.133333 0 42.666666 8.533334 12.8 12.8 17.066667 29.866667 8.533334 42.666666l-298.666667 853.333334c-4.266667 17.066667-17.066667 29.866667-38.4 29.866666zM200.533333 388.266667l285.866667 128c8.533333 4.266667 17.066667 12.8 21.333333 21.333333l128 285.866667 234.666667-669.866667L200.533333 388.266667z" />
        </svg>
        Send message
      </button>
    </form>
  );
};

export default ReplyForm;
