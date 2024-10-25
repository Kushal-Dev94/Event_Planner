const mongoose = require('mongoose'); // Import Mongoose

// Define the schema for the Recipe collection
const recipeSchema = new mongoose.Schema({
  name: {
    type: String, // Name of the recipe/event
    required: 'This field is required.'
  },
  description: {
    type: String, // Description of the event
    required: 'This field is required.'
  },
  email: {
    type: String, // Organizer’s contact email
    required: 'This field is required.'
  },
  ingredients: {
    type: Array, // List of items (e.g., event supplies or menu items)
    required: 'This field is required.'
  },
  category: {
    type: String, // Category (e.g., Wedding, Birthday)
    enum: ['Wedding Events', 'Graduation Parties', 'Birthday Parties'], // Valid categories
    required: 'This field is required.'
  },
  image: {
    type: String, // Stores the event image path or URL
    required: 'This field is required.'
  },
});

// Add a text index on the 'name' and 'description' fields for full-text search
recipeSchema.index({ name: 'text', description: 'text' });

// Wildcard index for full-text search across all fields (optional)
// recipeSchema.index({ "$**" : 'text' });

// Export the Recipe model for use in other files
module.exports = mongoose.model('Recipe', recipeSchema);
