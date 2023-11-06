import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  currentUser: string;
  login: (userName: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  children: ReactNode; // Ovo definira tip za 'children'
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<string>("");

  const login = (userName: string) => {
    // Ovdje mijenjamo 'String' u 'string'
    setCurrentUser(userName);
    // Trebalo bi se ispisati kada se pozove funkcija login
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

export const useCurrentUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useCurrentUser must be used within a UserProvider");
  }
  return context;
};
