const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
  const sql = "SELECT * FROM reports ORDER BY created_at DESC";
  db.query(sql, (err, result) => {
    if (err) {
      console.log("❌ GET REPORTS ERROR:", err);
      return res.json([]);
    }
    res.json(result);
  });
});

router.post('/', (req, res) => {
  const { type, location, desc, severity, injured, school } = req.body;
  console.log("📥 REPORT REQUEST BODY:", req.body);

  if (!type || !location || !desc || !severity) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const sql = `
    INSERT INTO reports (type, location, description, severity, injured, school)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [type, location, desc, severity, injured || null, school || null], (err, result) => {
    if (err) {
      console.log("❌ INSERT REPORT ERROR:", err.message);
      return res.status(500).json({ message: "Error saving report", error: err.message });
    }
    console.log("✅ REPORT SAVED — ID:", result.insertId);
    res.json({ message: "Report Added", id: result.insertId });
  });
});

module.exports = router;