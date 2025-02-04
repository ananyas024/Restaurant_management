const mysql = require('mysql2');

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',       // Your MySQL host (usually 'localhost')
  user: 'root',            // Your MySQL username
  password: '',            // Your MySQL password
  database: 'restaurant_management',  // Your MySQL database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to MySQL');
});

// Export the connection so it can be used in other files
module.exports = db;
