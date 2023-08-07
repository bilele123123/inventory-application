const { body, validationResult } = require("express-validator");
const Desktop = require("../models/desktop");
const asyncHandler = require("express-async-handler");

// Display list of all Categories.
exports.desktop_list = asyncHandler(async (req, res, next) => {
  const allDesktop = await Desktop.find({}, "brand model numberInStock")
    .sort({ brand: 1 })
    .populate("model")
    .exec();

  res.render("desktop_list", { title: "Desktop List", desktop_list: allDesktop });
});

// Display detail page for a specific desktop.
exports.desktop_detail = asyncHandler(async (req, res, next) => {
  try {
    const [desktop, description] = await Promise.all([
      Desktop.findById(req.params.id).exec(),
    ]);

    if (desktop === null) {
      const err = new Error("Desktop not found");
      err.status = 404;
      return next(err);
    }

    const category_desktop = await Desktop.find({ category: desktop.category }).exec();

    res.render("desktop_detail", {
      title: "Desktop Detail",
      desktop: desktop,
      desktop_description: description,
      category_desktop: category_desktop,
    });
  } catch (err) {
    next(err);
  }
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
