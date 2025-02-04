import React, { useState } from 'react';
import './Bill.css';
const Bill = ({ menu }) => {
  const [billItems, setBillItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Add item to the bill
  const handleAddToBill = (item) => {
    const existingItem = billItems.find(billItem => billItem.food_id === item.food_id);

    if (existingItem) {
      // If the item is already in the bill, increase the quantity
      const updatedBillItems = billItems.map(billItem => 
        billItem.food_id === item.food_id ? 
        { ...billItem, qty: billItem.qty + 1, total_price: (billItem.qty + 1) * billItem.food_price } : 
        billItem
      );
      setBillItems(updatedBillItems);
    } else {
      // If the item is not in the bill, add it
      const newItem = {
        ...item,
        qty: 1,
        total_price: item.food_price,
      };
      setBillItems([...billItems, newItem]);
    }

    updateTotalPrice();
  };

  // Update item quantity
  const handleQuantityChange = (food_id, newQty) => {
    if (newQty <= 0) return;  // Prevent negative or zero quantity
    const updatedBillItems = billItems.map(billItem => 
      billItem.food_id === food_id ? 
      { ...billItem, qty: newQty, total_price: newQty * billItem.food_price } : 
      billItem
    );
    setBillItems(updatedBillItems);
    updateTotalPrice();
  };

  // Update total price
  const updateTotalPrice = () => {
    const total = billItems.reduce((acc, item) => acc + item.total_price, 0);
    setTotalPrice(total);
  };

  return (
    <div>
      <h2>Bill Page</h2>

      {/* Menu Items List */}
      <h3>Menu</h3>
      <div>
        {menu.map(item => (
          <div key={item.food_id} style={styles.menuItem}>
            <div>
              <h4>{item.food_name} - ${item.food_price}</h4>
            </div>
            <div>
              <button style={styles.addButton} onClick={() => handleAddToBill(item)}>Add to Bill</button>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Bill Items */}
      <h3>Your Order</h3>
      <ul>
        {billItems.map(item => (
          <li key={item.food_id}>
            <div>
              {item.food_name} - ${item.food_price} x
              <input
                type="number"
                value={item.qty}
                onChange={(e) => handleQuantityChange(item.food_id, parseInt(e.target.value))}
                min="1"
              />
              = ${item.total_price}
            </div>
          </li>
        ))}
      </ul>

      {/* Total Price */}
      <h3>Total: ${totalPrice}</h3>
      
      {/* Optionally, add a button to finalize the bill */}
      <button onClick={() => alert('Bill finalized!')}>Finalize Bill</button>
    </div>
  );
};

// CSS for the layout
const styles = {
  menuItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  addButton: {
    padding: '8px 12px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
  }
};

export default Bill;
