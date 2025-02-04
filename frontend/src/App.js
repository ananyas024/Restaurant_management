import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Import Router and Link
import axios from 'axios';
import './App.css';
import Menu from './Menu';  // Import the Menu component
import Bill from './Bill';  // Import the Bill component
import ExpensePage from './ExpensePage';  // Import the ExpensePage component

function App() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    // Fetch menu from the server
    axios.get('http://localhost:5000/api/menu')
      .then((response) => {
        setMenu(response.data);
      })
      .catch((error) => {
        console.error('Error fetching menu:', error);
      });
  }, []);

  return (
    <Router>
      <div className="App">
        <h1>Restaurant Management</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/expense">ExpensePage</Link></li>
            <li><Link to="/dailyIncome">Daily Income</Link></li>
            <li><Link to="/bill">Bill</Link></li>
          </ul>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu menu={menu} />} />
            <Route path="/expense" element={<ExpensePage />} />
            <Route path="/dailyIncome" element={<h2>Daily Income Section</h2>} />
            <Route path="/bill" element={<Bill menu={menu} />} /> {/* Bill Page Route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// Home page component
const Home = () => {
  return (
    <div className="home-page">
      <h2>Welcome to the Restaurant Management System</h2>
      <p>Manage your restaurant orders, expenses, and more.</p>
    </div>
  );
};


export default App;