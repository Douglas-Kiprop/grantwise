import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardHome from './components/Home/Home';
// import Landing from './pages/Landing';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Profile from './components/Profile/Profile';
import GrantList from './components/Grants/GrantList';
import GrantDetail from './components/Grants/GrantDetail';
import PrivateRoute from './components/Auth/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import ResetPassword from './components/Auth/ResetPassword';
// import Footer from './components/Footer'; // Remove the Footer import

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* You might have a Header component here eventually */}
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}> {/* Optional: Wrapper for sticky footer */}
          <div style={{ flex: 1 }}> {/* Optional: Wrapper for main content */}
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
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
              {/* Add other routes as needed */}
            </Routes>
          </div>
          {/* <Footer /> Render the Footer component here, outside Routes */} {/* Remove the Footer instance */}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
