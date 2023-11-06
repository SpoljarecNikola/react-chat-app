import { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  currentUser: string;
  login: (userName: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [currentUser, setCurrentUser] = useState<string>("");

  const login = (userName: string) => {
    setCurrentUser(userName);
  };

  const logout = () => {
    setCurrentUser("");
  };

  return (
    <UserContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useCurrentUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useCurrentUser must be used within a UserProvider");
  }
  return context;
};
