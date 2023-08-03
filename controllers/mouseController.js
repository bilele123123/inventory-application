const { body, validationResult } = require("express-validator");
const Mouse = require("../models/mouse");
const asyncHandler = require("express-async-handler");

// Display list of all Categories.
exports.mouse_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: mouse list");
});

// Display detail page for a specific mouse.
exports.mouse_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: mouse detail: ${req.params.id}`);
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
