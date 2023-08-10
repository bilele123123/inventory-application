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
  res.render("headphone_form", { title: "Create New Headphone" });
});

// Handle Headphone create on POST.
exports.headphone_create_post = [
  // Validate and sanitize the name, brand, model, description, price, and numberInStock fields.
  body("name", "Headphone name must contain at least 3 characters")
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

    // Create a headphone object with escaped and trimmed data.
    const headphone = new Headphone({
      name: req.body.name,
      brand: req.body.brand,
      model: req.body.model,
      description: req.body.description,
      price: req.body.price,
      numberInStock: req.body.numberInStock,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("headphone_form", {
        title: "Create New Headphone",
        headphone: headphone,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Headphone with same name already exists.
      const headphoneExists = await Headphone.findOne({ name: req.body.name }).exec();
      if (headphoneExists) {
        // Headphone exists, redirect to its detail page.
        res.redirect(headphoneExists.url);
      } else {
        await headphone.save();
        // New headphone saved. Redirect to headphone detail page.
        res.redirect(headphone.url);
      }
    }
  }),
];

// Display Headphone delete form on GET.
exports.headphone_delete_get = asyncHandler(async (req, res, next) => {
  // Get details of headphone and all their books (in parallel)
  const [headphone] = await Promise.all([
    Headphone.findById(req.params.id).exec(),
  ]);

  if (headphone === null) {
    // No results.
    res.redirect("/catalog/headphones");
  }

  res.render("headphone_delete", {
    title: "Delete Headphone",
    headphone: headphone,
  });
});

// Handle Headphone delete on POST.
exports.headphone_delete_post = asyncHandler(async (req, res, next) => {
  try {
    // Get details of headphone
    const headphone = await Headphone.findById(req.params.id).exec();

    if (!headphone) {
      // Headphone not found.
      res.redirect("/catalog/headphones");
      return;
    }

    // Delete the headphone object and redirect to the list of headphones.
    await Headphone.findByIdAndRemove(req.body.headphoneid);
    res.redirect("/catalog/headphones");
  } catch (err) {
    return next(err);
  }
});
// Display headphone update form on GET.
exports.headphone_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: headphone update GET");
});

// Handle headphone update on POST.
exports.headphone_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: headphone update POST");
});
