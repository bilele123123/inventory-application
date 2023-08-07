const { body, validationResult } = require("express-validator");
const Keyboard = require("../models/keyboard");
const asyncHandler = require("express-async-handler");

// Display list of all Keyboard.
exports.keyboard_list = asyncHandler(async (req, res, next) => {
  const allKeyboard = await Keyboard.find({}, "brand model numberInStock")
    .sort({ brand: 1 })
    .populate("model")
    .exec();

  res.render("keyboard_list", { title: "Keyboard List", keyboard_list: allKeyboard });
});

// Display detail page for a specific keyboard.
exports.keyboard_detail = asyncHandler(async (req, res, next) => {
  try {
    const keyboard = await Keyboard.findById(req.params.id).exec();

    if (!keyboard) {
      const err = new Error("keyboard not found");
      err.status = 404;
      return next(err);
    }

    const category_keyboard = await Keyboard.find({ brand: keyboard.brand }).exec();

    res.render("keyboard_detail", {
      title: "keyboard Detail",
      keyboard: keyboard,
      category_keyboard: category_keyboard,
    });
  } catch (err) {
    next(err);
  }
});

// Display keyboard create form on GET.
exports.keyboard_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: keyboard create GET");
});

// Handle keyboard create on POST.
exports.keyboard_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: keyboard create POST");
});

// Display keyboard delete form on GET.
exports.keyboard_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: keyboard delete GET");
});

// Handle keyboard delete on POST.
exports.keyboard_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: keyboard delete POST");
});

// Display keyboard update form on GET.
exports.keyboard_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: keyboard update GET");
});

// Handle keyboard update on POST.
exports.keyboard_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: keyboard update POST");
});
