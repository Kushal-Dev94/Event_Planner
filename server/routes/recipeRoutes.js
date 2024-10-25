const express = require('express'); // Import Express framework
const router = express.Router(); // Initialize router object
const recipeController = require('../controllers/recipeController'); // Import controller

/**
 * App Routes - Mapping URL paths to controller functions
 */
router.get('/', recipeController.homepage); // Home page route
router.get('/recipe/:id', recipeController.exploreRecipe); // View a specific recipe by ID
router.get('/categories', recipeController.exploreCategories); // List all categories
router.get('/categories/:id', recipeController.exploreCategoriesById); // View recipes by category ID
router.post('/search', recipeController.searchRecipe); // Handle recipe search requests
router.get('/explore-latest', recipeController.exploreLatest); // Display latest recipes
router.get('/explore-random', recipeController.exploreRandom); // Display a random recipe
router.get('/submit-recipe', recipeController.submitRecipe); // Render recipe submission form
router.post('/submit-recipe', recipeController.submitRecipeOnPost); // Handle recipe submission

router.delete('/delete-recipe/:id', recipeController.deleteRecipe); // Delete a recipe by ID

// Static About Page
router.get('/about', (req, res) => {
  res.render('about', { title: 'About Us' }); // Render the 'About Us' page
});

// Export the router for use in the main application
module.exports = router;
