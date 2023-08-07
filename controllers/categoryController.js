const { body, validationResult } = require("express-validator");
const Category = require("../models/category");
const Desktop = require("../models/desktop");
const Headphone = require("../models/headphone");
const Keyboard = require("../models/keyboard");
const Laptop = require("../models/laptop");
const Mouse = require("../models/mouse");
const asyncHandler = require("express-async-handler");

exports.category_list = asyncHandler(async (req, res, next) => {
  const [
    numDesktop,
    numHeadphone,
    numKeyboard,
    numLaptop,
    numMouse,
  ] = await Promise.all([
    Desktop.find({}).exec(),
    Headphone.find({}).exec(),
    Keyboard.find({}).exec(),
    Laptop.find({}).exec(),
    Mouse.find({}).exec(),
  ]);

  res.render("index", {
    title: "List of Products",
    desktop_count: numDesktop.length,
    headphone_count: numHeadphone.length,
    keyboard_count: numKeyboard.length,
    laptop_count: numLaptop.length,
    mouse_count: numMouse.length,
  });
});


// Display detail page for a specific category.
exports.category_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: category detail: ${req.params.id}`);
});

// Display category create form on GET.
exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: category create GET");
});

// Handle category create on POST.
exports.category_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: category create POST");
});

// Display category delete form on GET.
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: category delete GET");
});

// Handle category delete on POST.
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: category delete POST");
});

// Display category update form on GET.
exports.category_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: category update GET");
});

// Handle category update on POST.
exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: category update POST");
});
