// Importing essential modules for the app
const express = require('express'); // Framework to create the server
const expressLayouts = require('express-ejs-layouts'); // Helps manage layouts for EJS views
const fileUpload = require('express-fileupload'); // Enables file uploads
const session = require('express-session'); // Manages user sessions
const cookieParser = require('cookie-parser'); // Parses cookies for session management
const flash = require('connect-flash'); // Displays temporary messages (like success/fail alerts)
const methodOverride = require('method-override'); // Allows PUT/DELETE methods via POST requests

// Initializing the app
const app = express();
const port = process.env.PORT || 5000; // Sets the port from env or defaults to 5000

require('dotenv').config(); // Loads environment variables from a .env file

// Middleware configuration
app.use(methodOverride('_method')); // Enables using PUT/DELETE methods
app.use(express.urlencoded({ extended: true })); // Parses incoming URL-encoded data
app.use(express.static('public')); // Serves static files (CSS, JS, images, etc.)
app.use(expressLayouts); // Uses EJS layout system

// Session and cookie setup
app.use(cookieParser('CookingBlogSecure')); // Parses cookies with a secret
app.use(session({
  secret: 'CookingBlogSecretSession', // Session secret key
  saveUninitialized: true, // Saves uninitialized sessions
  resave: true // Forces session to be saved even when unmodified
}));
app.use(flash()); // Flash messages middleware
app.use(fileUpload()); // Enables handling file uploads

// Setting the view engine and layout for EJS
app.set('layout', './layouts/main'); // Main layout for EJS views
app.set('view engine', 'ejs'); // Sets EJS as the template engine

// Importing and using routes from a separate file
const routes = require('./server/routes/recipeRoutes.js'); // Imports routes
app.use('/', routes); // Applies routes to the root path

// Starting the server
app.listen(port, () => console.log(`Listening to port ${port}`)); // Server running on specified port
