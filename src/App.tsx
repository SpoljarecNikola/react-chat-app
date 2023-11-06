import React, { useEffect, useState } from "react";
import CommentComponent from "./components/Comment";
import ReplyForm from "./components/ReplyForm";
import { Comment } from "./types";
import { v4 as uuidv4 } from "uuid";
import LogoutButton from "./components/Logout";
import { useQuery } from "react-query";
import Login from "./components/Login";
import { useCurrentUser } from "./components/UserContext";
import UserProvider from "./components/UserContext";

const fetchMessages = async () => {
  const response = await fetch("http://localhost:3100/api/messages");
  if (!response.ok) {
    throw new Error("Failed to fetch messages");
  }
  return response.json();
};

const App: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [user, setUser] = useState<string | null>(null);

  const { currentUser, login, logout } = useCurrentUser();

  const { data, isLoading, isError } = useQuery("messages", fetchMessages);

  const handleLogin = (username: string) => {
    login(username);
    setUser(username);
  };
  const handleLogout = () => {
    setUser("");
    logout();
  };

  useEffect(() => {
    setComments(data);
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching messages</div>;
  }

  const addReply = (text: string, parentId: string) => {
    setComments((currentComments) => {
      const addReplyToComment = (
        comments: Comment[],
        text: string,
        parentId: string
      ): Comment[] => {
        return comments.map((comment) => {
          if (comment.id === parentId) {
            const newReply: Comment = {
              id: uuidv4(),
              author: {
                name: currentUser,
                picture: "/assets/react.svg",
              },
              text,
              timestamp: new Date(),
              replies: [],
            };
            return {
              ...comment,
              replies: [...(comment.replies || []), newReply],
            };
          }
          if (comment.replies) {
            return {
              ...comment,
              replies: addReplyToComment(comment.replies, text, parentId),
            };
          }
          return comment;
        });
      };
      return addReplyToComment(currentComments, text, parentId);
    });
  };

  return (
    <UserProvider>
      <div>
        {!user ? (
          <Login onLogin={handleLogin} />
        ) : (
          <>
            <div className="container mx-auto p-4 bg-gray-100 rounded-lg">
              {comments.map((comment) => (
                <CommentComponent
                  key={comment.id}
                  comment={comment}
                  addReply={addReply}
                  user={user}
                />
              ))}
              <ReplyForm
                parentId=""
                user={user}
                addReply={(text) => {
                  const newComment: Comment = {
                    id: uuidv4(),
                    author: {
                      name: user,
                      picture: "/assets/react.svg",
                    },
                    text,
                    timestamp: new Date(),
                    replies: [],
                  };
                  setComments([...comments, newComment]);
                }}
                onReplySent={function (): void {}}
              />
            </div>
            <div className="flex justify-center mt-4">
              <LogoutButton onLogout={handleLogout} />
            </div>
          </>
        )}
      </div>
    </UserProvider>
  );
};

export default App;
