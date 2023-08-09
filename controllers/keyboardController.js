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
  res.render("keyboard_form", { title: "Create New Keyboard" });
});

// Handle Keyboard create on POST.
exports.keyboard_create_post = [
  // Validate and sanitize the name, brand, model, description, price, and numberInStock fields.
  body("name", "Keyboard name must contain at least 3 characters")
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

    // Create a keyboard object with escaped and trimmed data.
    const keyboard = new Keyboard({
      name: req.body.name,
      brand: req.body.brand,
      model: req.body.model,
      description: req.body.description,
      price: req.body.price,
      numberInStock: req.body.numberInStock,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("keyboard_form", {
        title: "Create New Keyboard",
        keyboard: keyboard,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Keyboard with same name already exists.
      const keyboardExists = await Keyboard.findOne({ name: req.body.name }).exec();
      if (keyboardExists) {
        // Keyboard exists, redirect to its detail page.
        res.redirect(keyboardExists.url);
      } else {
        await keyboard.save();
        // New keyboard saved. Redirect to keyboard detail page.
        res.redirect(keyboard.url);
      }
    }
  }),
];

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
