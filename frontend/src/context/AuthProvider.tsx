// File: src/context/AuthProvider.tsx

import React, { createContext, useContext } from 'react';

// Define the shape of the context value
export interface AuthContextType {
  roles: string[];
}

// Create the AuthContext
export const AuthContext = createContext<AuthContextType | null>(null);

// Create the AuthProvider component
export const AuthProvider: React.FC<{
  roles: string[];
  children: React.ReactNode;
}> = ({ roles, children }) => {
  return (
    <AuthContext.Provider value={{ roles }}>{children}</AuthContext.Provider>
  );
};

// Create a custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
