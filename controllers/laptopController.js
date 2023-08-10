const { body, validationResult } = require("express-validator");
const Laptop = require("../models/laptop");
const asyncHandler = require("express-async-handler");
const he = require("he");

// Display list of all Categories.
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
    const [laptop, description] = await Promise.all([
      Laptop.findById(req.params.id).exec(),
    ]);

    if (laptop === null) {
      const err = new Error("Laptop not found");
      err.status = 404;
      return next(err);
    }

    const category_laptop = await Laptop.find({ category: laptop.category }).exec();

    res.render("laptop_detail", {
      title: "Laptop Detail",
      laptop: laptop,
      laptop_description: description,
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
      brand: he.decode(req.body.brand),
      model: he.decode(req.body.model),
      description: he.decode(req.body.description),
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
        // Laptop exists, redirect to the laptop list.
        res.redirect("/catalog/laptop");
      } else {
        await laptop.save();
        // New laptop saved. Redirect to the laptop list.
        res.redirect("/catalog/laptop");
      }
          }
  }),
];

// Display Laptop delete form on GET.
exports.laptop_delete_get = asyncHandler(async (req, res, next) => {
  // Get details of laptop and all their books (in parallel)
  const [laptop] = await Promise.all([
    Laptop.findById(req.params.id).exec(),
  ]);

  if (laptop === null) {
    // No results.
    res.redirect("/catalog/laptop");
  }

  res.render("laptop_delete", {
    title: "Delete Laptop",
    laptop: laptop,
  });
});

// Handle Laptop delete on POST.
exports.laptop_delete_post = asyncHandler(async (req, res, next) => {
  try {
    // Get details of laptop
    const laptop = await Laptop.findById(req.params.id).exec();

    if (!laptop) {
      // Laptop not found.
      res.redirect("/catalog/laptop");
      return;
    }

    // Delete the laptop object and redirect to the list of laptops.
    await Laptop.findByIdAndRemove(req.params.id);  // Update this line
    res.redirect("/catalog/laptop");
  } catch (err) {
    return next(err);
  }
});

// Display laptop update form on GET.
exports.laptop_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: laptop update GET");
});

// Handle laptop update on POST.
exports.laptop_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: laptop update POST");
});
