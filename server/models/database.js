const mongoose = require('mongoose'); // Import Mongoose for database interaction

// Connect to MongoDB using the connection string from environment variables
mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true,  // Allows using the new URL parser
  useUnifiedTopology: true // Enables new server discovery and monitoring engine
});

// Check the connection status
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')); // Logs errors
db.once('open', function() {
  console.log('Connected'); // Logs successful connection
});

// Import the models to ensure they're registered with Mongoose
require('./Category'); 
require('./Recipe');
