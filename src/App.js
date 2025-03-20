import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardHome from './components/Home/Home';
import Landing from './pages/Landing';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Profile from './components/Profile/Profile';
import GrantList from './components/Grants/GrantList';
import GrantDetail from './components/Grants/GrantDetail';
import PrivateRoute from './components/Auth/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import ResetPassword from './components/Auth/ResetPassword';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={
            <PrivateRoute>
              <DashboardHome />
            </PrivateRoute>
          } />
          <Route path="/grants" element={
            <PrivateRoute>
              <GrantList />
            </PrivateRoute>
          } />
          <Route path="/grants/:id" element={
            <PrivateRoute>
              <GrantDetail />
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
