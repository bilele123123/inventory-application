const { body, validationResult } = require("express-validator");
const Mouse = require("../models/mouse");
const asyncHandler = require("express-async-handler");

// Display list of all Mouse.
exports.mouse_list = asyncHandler(async (req, res, next) => {
  const allMouse = await Mouse.find({}, "brand model numberInStock")
    .sort({ brand: 1 })
    .populate("model")
    .exec();

  res.render("mouse_list", { title: "Mouse List", mouse_list: allMouse });
});

// Display detail page for a specific mouse.
exports.mouse_detail = asyncHandler(async (req, res, next) => {
  try {
    const mouse = await Mouse.findById(req.params.id).exec();

    if (!mouse) {
      const err = new Error("mouse not found");
      err.status = 404;
      return next(err);
    }

    const category_mouse = await Mouse.find({ brand: mouse.brand }).exec();

    res.render("mouse_detail", {
      title: "mouse Detail",
      mouse: mouse,
      category_mouse: category_mouse,
    });
  } catch (err) {
    next(err);
  }
});

// Display mouse create form on GET.
exports.mouse_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: mouse create GET");
});

// Handle mouse create on POST.
exports.mouse_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: mouse create POST");
});

// Display mouse delete form on GET.
exports.mouse_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: mouse delete GET");
});

// Handle mouse delete on POST.
exports.mouse_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: mouse delete POST");
});

// Display mouse update form on GET.
exports.mouse_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: mouse update GET");
});

// Handle mouse update on POST.
exports.mouse_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: mouse update POST");
});
