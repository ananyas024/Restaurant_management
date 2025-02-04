import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Menu.css';

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [newItem, setNewItem] = useState({ food_name: '', food_price: '', food_image: '' });

  useEffect(() => {
    // Fetch menu from the backend
    axios.get('http://localhost:5000/api/menu')
      .then(response => setMenu(response.data))
      .catch(error => console.error('Error fetching menu:', error));
  }, []);

  const handleAddItem = () => {
    axios.post('http://localhost:5000/api/menu', newItem)
      .then(response => {
        setMenu([...menu, response.data]); // Add the newly added item from the backend response
        setNewItem({ food_name: '', food_price: '', food_image: '' });
        alert('Item added successfully!');
      })
      .catch(error => console.error('Error adding item:', error));
  };
  

  const handleDeleteItem = (id) => {
    axios.delete(`http://localhost:5000/api/menu/${id}`)
      .then(response => {
        setMenu(menu.filter(item => item.food_id !== id));
        alert(response.data.message);
      })
      .catch(error => console.error('Error deleting item:', error));
  };

  return (
    <div className="menu-container">
      <h2>Menu</h2>
      <ul className="menu-list">
        {menu.map(item => (
          <li key={item.food_id} className="menu-item">
            <div className="menu-content">
              <h3>{item.food_name}</h3>
              <p>${item.food_price}</p>
              <div className="delete-button-container">
                <button onClick={() => handleDeleteItem(item.food_id)}>Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <h3>Add New Item</h3>
      <div className="order-details">
        <input
          type="text"
          placeholder="Food Name"
          value={newItem.food_name}
          onChange={(e) => setNewItem({ ...newItem, food_name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Food Price"
          value={newItem.food_price}
          onChange={(e) => setNewItem({ ...newItem, food_price: e.target.value })}
        />
      </div>
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  );
};

export default Menu;
