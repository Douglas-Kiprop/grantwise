import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import GrantsList from './pages/GrantsList';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App" style={{ overflowX: 'hidden', width: '100%', position: 'relative' }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/grants" element={<GrantsList />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
