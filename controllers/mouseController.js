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
  res.render("mouse_form", { title: "Create New Mouse" });
});

// Handle Mouse create on POST.
exports.mouse_create_post = [
  // Validate and sanitize the name, brand, model, description, price, and numberInStock fields.
  body("name", "Mouse name must contain at least 3 characters")
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

    // Create a mouse object with escaped and trimmed data.
    const mouse = new Mouse({
      name: req.body.name,
      brand: req.body.brand,
      model: req.body.model,
      description: req.body.description,
      price: req.body.price,
      numberInStock: req.body.numberInStock,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("mouse_form", {
        title: "Create New Mouse",
        mouse: mouse,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Mouse with same name already exists.
      const mouseExists = await Mouse.findOne({ name: req.body.name }).exec();
      if (mouseExists) {
        // Mouse exists, redirect to its detail page.
        res.redirect(mouseExists.url);
      } else {
        await mouse.save();
        // New mouse saved. Redirect to mouse detail page.
        res.redirect(mouse.url);
      }
    }
  }),
];

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
