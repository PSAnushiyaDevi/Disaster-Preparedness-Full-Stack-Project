const express = require('express');
const router = express.Router();
const db = require('../config/db');


// ================= REGISTER =================
router.post('/register', (req, res) => {
  const { name, email, password, role, school } = req.body;

  console.log("📥 REGISTER REQUEST:", req.body);

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const checkSql = "SELECT * FROM users WHERE email=?";
  
  db.query(checkSql, [email], (err, result) => {
    if (err) {
      console.error("❌ CHECK ERROR:", err.message);
      return res.status(500).json({ error: err.message });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const insertSql = `
      INSERT INTO users (name, email, password, role, school)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(insertSql, [name, email, password, role || null, school || null], (err, result) => {
      if (err) {
        console.error("❌ INSERT ERROR:", err.message);
        return res.status(500).json({ error: err.message });
      }

      console.log("✅ USER CREATED:", result.insertId);
      res.json({ message: "Registered Successfully" });
    });
  });
});

// ================= LOGIN =================
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  console.log("🔐 LOGIN REQUEST:", email);

  const sql = "SELECT * FROM users WHERE email=? AND password=?";
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.log("❌ LOGIN ERROR:", err);
      return res.status(500).json({ message: "Server Error" });
    }

    if (result.length > 0) {
      console.log("✅ LOGIN SUCCESS:", result[0].email);

      // 🕒 Log the login
      const logSql = "INSERT INTO logs (email) VALUES (?)";
      db.query(logSql, [email], (err) => {
        if (err) console.log("⚠ LOG INSERT ERROR:", err);
      });

      // ✅ STRIP PASSWORD before sending — never send password to frontend
      const { password: _pw, ...safeUser } = result[0];
      res.json(safeUser);

    } else {
      console.log("❌ INVALID LOGIN");
      res.status(401).json({ message: "Invalid email or password." });
    }
  });
});


// ================= GET LOGIN LOGS =================
router.get('/logs', (req, res) => {
  const sql = "SELECT * FROM logs ORDER BY login_time DESC";
  db.query(sql, (err, result) => {
    if (err) {
      console.log("❌ FETCH LOGS ERROR:", err);
      return res.status(500).json({ message: "Error fetching logs" });
    }
    res.json(result);
  });
});


// ================= GET ALL USERS =================
router.get('/users', (req, res) => {
  // ✅ Never return password column
  const sql = "SELECT id, name, email, role, school FROM users";
  db.query(sql, (err, result) => {
    if (err) {
      console.log("❌ FETCH USERS ERROR:", err);
      return res.status(500).json({ message: "Error fetching users" });
    }
    res.json(result);
  });
});


module.exports = router;
