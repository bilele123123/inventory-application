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
  res.render("desktop_form", { title: "Create New Desktop" });
});

// Handle Desktop create on POST.
// Handle Desktop create on POST.
exports.desktop_create_post = [
  // Validate and sanitize the name, brand, model, description, price, and numberInStock fields.
  body("name", "Desktop name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("brand", "Enter a valid brand").trim().notEmpty().escape(),
  body("model", "Enter a valid model").trim().notEmpty().escape(),
  body("description", "Enter a valid description").trim().notEmpty().escape(),
  body("price", "Enter a valid price").isFloat({ min: 0 }),
  body("numberInStock", "Enter a valid number in stock").isInt({ min: 0 }),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a desktop object with escaped and trimmed data.
    const desktop = new Desktop({
      name: req.body.name,
      brand: req.body.brand,
      model: req.body.model,
      description: req.body.description,
      price: req.body.price,
      numberInStock: req.body.numberInStock,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("desktop_form", {
        title: "Create New Desktop",
        desktop: desktop,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Desktop with same name already exists.
      const desktopExists = await Desktop.findOne({ name: req.body.name }).exec();
      if (desktopExists) {
        // Desktop exists, redirect to its detail page.
        res.redirect(desktopExists.url);
      } else {
        await desktop.save();
        // New desktop saved. Redirect to desktop detail page.
        res.redirect(desktop.url);
      }
    }
  }),
];


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
