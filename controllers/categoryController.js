const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// Display list of all Categories.
exports.category_list = asayncHandler(async (req, res, next) => {
    
})

// Display detail page for a specific Category.
exports.category_detail = asyncHandler(async (req, res, next) => {
    // Get details of categories of products.
})


// Display Category create form on GET. 
exports.category_create_get = (req, res, next) => {
    res.render("", { title: "Create Category"});
;}