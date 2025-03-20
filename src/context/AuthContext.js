import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authState, setAuthState] = useState({
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token')
  });

  const login = (token) => {
    localStorage.setItem('token', token);
    setAuthState({ token, isAuthenticated: true });
    console.log('Token set in AuthContext:', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    setAuthState({ token: null, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: authState.isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};