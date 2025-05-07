// filepath: backend/db.js
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'itel_db',
    password: 'super1', // Ensure this matches your PostgreSQL password
    port: 6666, // Ensure this matches your PostgreSQL port
});

module.exports = pool;
