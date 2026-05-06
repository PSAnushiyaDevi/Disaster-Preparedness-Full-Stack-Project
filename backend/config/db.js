const mysql = require('mysql2');
require('dotenv').config();

// ✅ Use CONNECTION POOL (important for cloud)
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'defaultdb',
  port: process.env.DB_PORT || 23006,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false
  }
});

// ✅ Test connection properly
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ DB CONNECTION FAILED:", err.message);
  } else {
    console.log("✅ DB CONNECTED (POOL)");
    connection.release();
  }
});

module.exports = db;
