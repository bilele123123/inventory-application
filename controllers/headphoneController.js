const { body, validationResult } = require("express-validator");
const Headphone = require("../models/headphone");
const asyncHandler = require("express-async-handler");

// Display list of all headphone.
exports.headphone_list = asyncHandler(async (req, res, next) => {
  const allHeadphone = await Headphone.find({}, "brand model numberInStock")
    .sort({ brand: 1 })
    .populate("model")
    .exec();

  res.render("headphone_list", { title: "Headphone List", headphone_list: allHeadphone });
});

// Display detail page for a specific headphone.
exports.headphone_detail = asyncHandler(async (req, res, next) => {
  try {
    const headphone = await Headphone.findById(req.params.id).exec();

    if (!headphone) {
      const err = new Error("Headphone not found");
      err.status = 404;
      return next(err);
    }

    const category_headphone = await Headphone.find({ brand: headphone.brand }).exec();

    res.render("headphone_detail", {
      title: "Headphone Detail",
      headphone: headphone,
      category_headphone: category_headphone,
    });
  } catch (err) {
    next(err);
  }
});

// Display headphone create form on GET.
exports.headphone_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: headphone create GET");
});

// Handle headphone create on POST.
exports.headphone_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: headphone create POST");
});

// Display headphone delete form on GET.
exports.headphone_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: headphone delete GET");
});

// Handle headphone delete on POST.
exports.headphone_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: headphone delete POST");
});

// Display headphone update form on GET.
exports.headphone_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: headphone update GET");
});

// Handle headphone update on POST.
exports.headphone_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: headphone update POST");
});
