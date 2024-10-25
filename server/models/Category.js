const mongoose = require('mongoose'); // Import Mongoose for database interaction

// Define the schema for the Category collection
const categorySchema = new mongoose.Schema({
  name: {
    type: String, // The name of the category (e.g., Wedding Events)
    required: 'This field is required.' // Validation: Must be provided
  },
  image: {
    type: String, // Stores the image path or URL
    required: 'This field is required.' // Validation: Must be provided
  },
});

// Exporting the Category model to be used in other parts of the project
module.exports = mongoose.model('Category', categorySchema);
