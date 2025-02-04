import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ExpensePage.css';

const ExpensePage = () => {
  // State for a single expense
  const [expense, setExpense] = useState({
    expense_date: '',
    description: '',
    amount: ''
  });

  // State for the list of expenses
  const [expenses, setExpenses] = useState([]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpense({
      ...expense,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!expense.expense_date || !expense.description || !expense.amount) {
      alert('Please fill out all fields.');
      return;
    }

    // Send the expense to the backend
    axios.post('http://localhost:5000/api/expenses', expense)
      .then(response => {
        setExpenses([...expenses, response.data]);  // Add the new expense to the state
        setExpense({
          expense_date: '',
          description: '',
          amount: ''
        });
        alert('Expense added successfully!');
      })
      .catch(error => {
        console.error('Error adding expense:', error);
        alert('Error adding expense');
      });
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/expenses')
      .then(response => {
        setExpenses(response.data);
      })
      .catch(error => {
        console.error('Error fetching expenses:', error);
      });
  }, []);

  return (
    <div className="expense-page">
      <h2>Track Your Expenses</h2>

      {/* Form to add new expenses */}
      <form onSubmit={handleSubmit} className="expense-form">
        <input
          type="date"
          name="expense_date"
          placeholder="Expense Date"
          value={expense.expense_date}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={expense.description}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={expense.amount}
          onChange={handleInputChange}
        />
        <button type="submit">Add Expense</button>
      </form>

      {/* List of expenses */}
      <div className="expense-list">
        <h3>Your Expenses</h3>
        {expenses.length === 0 ? (
          <p>No expenses added yet.</p>
        ) : (
          <ul>
            {expenses.map((exp, index) => (
              <li key={index} className="expense-item">
                <p><strong>Expense ID:</strong> {exp.expense_id}</p>
                <p><strong>Expense Date:</strong> {exp.expense_date}</p>
                <p><strong>Description:</strong> {exp.description}</p>
                <p><strong>Amount:</strong> ${exp.amount}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExpensePage;