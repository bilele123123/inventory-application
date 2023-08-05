const { body, validationResult } = require("express-validator");
const Desktop = require("../models/desktop");
const asyncHandler = require("express-async-handler");

// Display list of all Categories.
exports.desktop_list = asyncHandler(async (req, res, next) => {
  const allDesktop = await Desktop.find({}, "brand model")
    .sort({ brand: 1})
    .populate("model")
    .exec();

  res.render("desktop_list", { title: "Desktop List", desktop_list: allDesktop });
});

// Display detail page for a specific desktop.
exports.desktop_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: desktop detail: ${req.params.id}`);
});

// Display desktop create form on GET.
exports.desktop_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: desktop create GET");
});

// Handle desktop create on POST.
exports.desktop_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: desktop create POST");
});

// Display desktop delete form on GET.
exports.desktop_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: desktop delete GET");
});

// Handle desktop delete on POST.
exports.desktop_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: desktop delete POST");
});

// Display desktop update form on GET.
exports.desktop_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: desktop update GET");
});

// Handle desktop update on POST.
exports.desktop_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: desktop update POST");
});
