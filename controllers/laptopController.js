const { body, validationResult } = require("express-validator");
const Laptop = require("../models/laptop");
const asyncHandler = require("express-async-handler");

// Display list of all Laptop.
exports.laptop_list = asyncHandler(async (req, res, next) => {
  const allLaptop = await Laptop.find({}, "brand model numberInStock")
    .sort({ brand: 1 })
    .populate("model")
    .exec();

  res.render("laptop_list", { title: "Laptop List", laptop_list: allLaptop });
});

// Display detail page for a specific laptop.
exports.laptop_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: laptop detail: ${req.params.id}`);
});

// Display laptop create form on GET.
exports.laptop_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: laptop create GET");
});

// Handle laptop create on POST.
exports.laptop_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: laptop create POST");
});

// Display laptop delete form on GET.
exports.laptop_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: laptop delete GET");
});

// Handle laptop delete on POST.
exports.laptop_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: laptop delete POST");
});

// Display laptop update form on GET.
exports.laptop_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: laptop update GET");
});

// Handle laptop update on POST.
exports.laptop_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: laptop update POST");
});
