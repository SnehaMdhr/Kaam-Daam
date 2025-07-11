const { Pool } = require('pg');
require('dotenv').config(); // Keep only one instance

// Optional: Debug .env variable
console.log('✅ Loaded PGPASSWORD:', typeof process.env.PGPASSWORD, process.env.PGPASSWORD);

// Set up PostgreSQL connection
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});

// Test DB connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Database connected successfully at:', res.rows[0].now);
  }
});

module.exports = pool;
