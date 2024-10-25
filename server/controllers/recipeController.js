require('../models/database'); // Ensure database connection is established
const Category = require('../models/Category'); // Import Category model
const Recipe = require('../models/Recipe'); // Import Recipe model

/**
 * GET /
 * Homepage - Displays categories and featured recipes
 */
exports.homepage = async (req, res) => {
  try {
    const limitNumber = 5; // Limits results to 5
    const categories = await Category.find({}).limit(limitNumber); 
    const latest = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber); // Get latest recipes
    const thai = await Recipe.find({ category: 'Thai' }).limit(limitNumber); 
    const american = await Recipe.find({ category: 'American' }).limit(limitNumber); 
    const chinese = await Recipe.find({ category: 'Chinese' }).limit(limitNumber); 

    const food = { latest, thai, american, chinese }; // Group recipes by cuisine
    res.render('index', { title: 'Cooking Blog - Home', categories, food });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occurred" });
  }
};

/**
 * GET /categories
 * Displays all categories
 */
exports.exploreCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).limit(20); // Get 20 categories
    res.render('categories', { title: 'Cooking Blog - Categories', categories });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occurred" });
  }
};

/**
 * GET /categories/:id
 * Display recipes by category ID
 */
exports.exploreCategoriesById = async (req, res) => {
  try {
    const categoryById = await Recipe.find({ category: req.params.id }).limit(20); 
    res.render('categories', { title: 'Cooking Blog - Categories', categoryById });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occurred" });
  }
};

/**
 * GET /recipe/:id
 * View a single recipe by ID
 */
exports.exploreRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id); 
    res.render('recipe', { title: 'Cooking Blog - Recipe', recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occurred" });
  }
};

/**
 * POST /search
 * Search recipes by term
 */
exports.searchRecipe = async (req, res) => {
  try {
    const searchTerm = req.body.searchTerm; 
    const recipe = await Recipe.find({ $text: { $search: searchTerm, $diacriticSensitive: true } });
    res.render('search', { title: 'Cooking Blog - Search', recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occurred" });
  }
};

/**
 * GET /explore-latest
 * Display latest recipes
 */
exports.exploreLatest = async (req, res) => {
  try {
    const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(20); 
    res.render('explore-latest', { title: 'Cooking Blog - Explore Latest', recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occurred" });
  }
};

/**
 * GET /explore-random
 * Display a random recipe
 */
exports.exploreRandom = async (req, res) => {
  try {
    const count = await Recipe.countDocuments(); 
    const random = Math.floor(Math.random() * count); 
    const recipe = await Recipe.findOne().skip(random); 
    res.render('explore-random', { title: 'Cooking Blog - Explore Random', recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occurred" });
  }
};

/**
 * GET /submit-recipe
 * Render the recipe submission form
 */
exports.submitRecipe = async (req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('submit-recipe', { title: 'Cooking Blog - Submit Recipe', infoErrorsObj, infoSubmitObj });
};

/**
 * POST /submit-recipe
 * Handle recipe submission
 */
exports.submitRecipeOnPost = async (req, res) => {
  try {
    let imageUploadFile, uploadPath, newImageName;

    // Check if files were uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
      console.log('No Files were uploaded.');
    } else {
      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name; // Unique filename with timestamp
      uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

      // Move the file to the uploads folder
      imageUploadFile.mv(uploadPath, (err) => {
        if (err) return res.status(500).send(err);
      });
    }

    // Create a new Recipe instance and save it
    const newRecipe = new Recipe({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      ingredients: req.body.ingredients,
      category: req.body.category,
      image: newImageName
    });

    await newRecipe.save();
    req.flash('infoSubmit', 'Recipe has been added.');
    res.redirect('/submit-recipe');
  } catch (error) {
    req.flash('infoErrors', error);
    res.redirect('/submit-recipe');
  }
};

/**
 * DELETE /delete-recipe/:id
 * Delete a recipe by ID
 */
exports.deleteRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    await Recipe.findByIdAndDelete(recipeId); // Delete the recipe
    req.flash('infoSubmit', 'Recipe has been successfully deleted.');
    res.redirect('/');
  } catch (error) {
    req.flash('infoErrors', 'Error occurred while deleting the recipe.');
    res.redirect('/');
  }
};
