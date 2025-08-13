const mongoose = require('mongoose');
require('dotenv').config();

console.log('Attempting to connect to MongoDB...');
console.log('Connection string (without password):', 
  process.env.MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//USERNAME:PASSWORD@'));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully!');
    console.log('Connection established to database:', 
      mongoose.connection.db.databaseName);
    process.exit(0);
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
