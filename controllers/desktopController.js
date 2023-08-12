const { body, validationResult } = require("express-validator");
const Desktop = require("../models/desktop");
const asyncHandler = require("express-async-handler");
const he = require("he");

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
  res.render("desktop_form", { title: "Create New Desktop" });
});

// Handle Desktop create on POST.
exports.desktop_create_post = [
  body("brand", "Enter a valid brand").trim().notEmpty().escape(),
  body("model", "Enter a valid model").trim().notEmpty().escape(),
  body("description", "Enter a valid description").trim().notEmpty().escape(),
  body("price", "Enter a valid price").isFloat({ min: 0 }),
  body("numberInStock", "Enter a valid number in stock").isInt({ min: 0 }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const desktop = new Desktop({
      brand: he.decode(req.body.brand),
      model: he.decode(req.body.model),
      description: he.decode(req.body.description),
      price: req.body.price,
      numberInStock: req.body.numberInStock,
    });

    if (!errors.isEmpty()) {
      res.render("desktop_form", {
        title: "Create New Desktop",
        desktop: desktop,
        errors: errors.array(),
      });
      return;
    } else {
      await desktop.save();
      res.redirect("/catalog/desktop");
    }
  }),
];

// Display Desktop delete form on GET.
exports.desktop_delete_get = asyncHandler(async (req, res, next) => {
  // Get details of desktop and all their books (in parallel)
  const [desktop] = await Promise.all([
    Desktop.findById(req.params.id).exec(),
  ]);

  if (desktop === null) {
    // No results.
    res.redirect("/catalog/desktop");
  }

  res.render("desktop_delete", {
    title: "Delete Desktop",
    desktop: desktop,
  });
});

// Handle Desktop delete on POST.
exports.desktop_delete_post = asyncHandler(async (req, res, next) => {
  try {
    // Get details of desktop
    const desktop = await Desktop.findById(req.params.id).exec();

    if (!desktop) {
      // Desktop not found.
      res.redirect("/catalog/desktop");
      return;
    }

    // Delete the desktop object and redirect to the list of desktops.
    await Desktop.findByIdAndRemove(req.params.id);  // Update this line
    res.redirect("/catalog/desktop");
  } catch (err) {
    return next(err);
  }
});

// Display desktop update form on GET.
exports.desktop_update_get = asyncHandler(async (req, res, next) => {
  try {
    const desktop = await Desktop.findById(req.params.id).exec();

    if (desktop === null) {
      const err = new Error("Desktop not found");
      err.status = 404;
      return next(err);
    }

    res.render("desktop_update_form", {
      title: "Update Desktop",
      desktop: desktop,
    });
  } catch (err) {
    next(err);
  }
});

// Handle desktop update on POST.
exports.desktop_update_post = asyncHandler(async (req, res, next) => {
  try {
    const errors = validationResult(req);

    const updatedDesktop = new Desktop({
      brand: he.decode(req.body.brand),
      model: he.decode(req.body.model),
      description: he.decode(req.body.description),
      price: req.body.price,
      numberInStock: req.body.numberInStock,
      _id: req.params.id, // Important: Include the desktop's _id in the updated document
    });

    if (!errors.isEmpty()) {
      // Handle validation errors...
    } else {
      await Desktop.findByIdAndUpdate(req.params.id, updatedDesktop, {});
      res.redirect("/catalog/desktop/" + req.params.id);
    }
  } catch (err) {
    next(err);
  }
});
