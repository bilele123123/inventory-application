const { body, validationResult } = require("express-validator");
const Laptop = require("../models/laptop");
const asyncHandler = require("express-async-handler");

// Display list of all Laptop.
exports.laptop_list = asyncHandler(async (req, res, next) => {
  const allLaptop = await Laptop.find({}, "brand model numberInStock")
    .sort({ brand: 1 })
    .populate("model")
    .exec();

  res.render("laptop_list", { title: "Laptop List", laptop_list: allLaptop });
});

// Display detail page for a specific laptop.
exports.laptop_detail = asyncHandler(async (req, res, next) => {
  try {
    const laptop = await Laptop.findById(req.params.id).exec();

    if (!laptop) {
      const err = new Error("laptop not found");
      err.status = 404;
      return next(err);
    }

    const category_laptop = await Laptop.find({ brand: laptop.brand }).exec();

    res.render("laptop_detail", {
      title: "laptop Detail",
      laptop: laptop,
      category_laptop: category_laptop,
    });
  } catch (err) {
    next(err);
  }
});

// Display laptop create form on GET.
exports.laptop_create_get = asyncHandler(async (req, res, next) => {
  res.render("laptop_form", { title: "Create New Laptop" });
});

// Handle Laptop create on POST.
exports.laptop_create_post = [
  // Validate and sanitize the name, brand, model, description, price, and numberInStock fields.
  body("name", "Laptop name must contain at least 3 characters")
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

    // Create a laptop object with escaped and trimmed data.
    const laptop = new Laptop({
      name: req.body.name,
      brand: req.body.brand,
      model: req.body.model,
      description: req.body.description,
      price: req.body.price,
      numberInStock: req.body.numberInStock,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("laptop_form", {
        title: "Create New Laptop",
        laptop: laptop,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Laptop with same name already exists.
      const laptopExists = await Laptop.findOne({ name: req.body.name }).exec();
      if (laptopExists) {
        // Laptop exists, redirect to its detail page.
        res.redirect(laptopExists.url);
      } else {
        await laptop.save();
        // New laptop saved. Redirect to laptop detail page.
        res.redirect(laptop.url);
      }
    }
  }),
];

// Display laptop delete form on GET.
exports.laptop_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: laptop delete GET");
});

// Handle laptop delete on POST.
exports.laptop_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: laptop delete POST");
});

// Display laptop update form on GET.
exports.laptop_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: laptop update GET");
});

// Handle laptop update on POST.
exports.laptop_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: laptop update POST");
});
