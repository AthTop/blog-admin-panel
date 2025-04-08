import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <AuthContext.Provider
      value={{ currentUser, token, setCurrentUser, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}
