const { body, validationResult } = require("express-validator");
const Headphone = require("../models/headphone");
const asyncHandler = require("express-async-handler");
const he = require("he");

// Display list of all Categories.
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
    const [headphone, description] = await Promise.all([
      Headphone.findById(req.params.id).exec(),
    ]);

    if (headphone === null) {
      const err = new Error("Headphone not found");
      err.status = 404;
      return next(err);
    }

    const category_headphone = await Headphone.find({ category: headphone.category }).exec();

    res.render("headphone_detail", {
      title: "Headphone Detail",
      headphone: headphone,
      headphone_description: description,
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
  body("brand", "Enter a valid brand").trim().notEmpty().escape(),
  body("model", "Enter a valid model").trim().notEmpty().escape(),
  body("description", "Enter a valid description").trim().notEmpty().escape(),
  body("price", "Enter a valid price").isFloat({ min: 0 }),
  body("numberInStock", "Enter a valid number in stock").isInt({ min: 0 }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const headphone = new Headphone({
      brand: he.decode(req.body.brand),
      model: he.decode(req.body.model),
      description: he.decode(req.body.description),
      price: req.body.price,
      numberInStock: req.body.numberInStock,
    });

    if (!errors.isEmpty()) {
      res.render("headphone_form", {
        title: "Create New Headphone",
        headphone: headphone,
        errors: errors.array(),
      });
      return;
    } else {
      await headphone.save();
      res.redirect("/catalog/headphone");
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
    res.redirect("/catalog/headphone");
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
      res.redirect("/catalog/headphone");
      return;
    }

    // Delete the headphone object and redirect to the list of headphones.
    await Headphone.findByIdAndRemove(req.params.id);  // Update this line
    res.redirect("/catalog/headphone");
  } catch (err) {
    return next(err);
  }
});

// Display headphone update form on GET.
exports.headphone_update_get = asyncHandler(async (req, res, next) => {
  try {
    const headphone = await Headphone.findById(req.params.id).exec();

    if (headphone === null) {
      const err = new Error("Headphone not found");
      err.status = 404;
      return next(err);
    }

    res.render("headphone_update_form", {
      title: "Update Headphone",
      headphone: headphone,
    });
  } catch (err) {
    next(err);
  }
});

// Handle headphone update on POST.
exports.headphone_update_post = asyncHandler(async (req, res, next) => {
  try {
    const errors = validationResult(req);

    const updatedHeadphone = new Headphone({
      brand: he.decode(req.body.brand),
      model: he.decode(req.body.model),
      description: he.decode(req.body.description),
      price: req.body.price,
      numberInStock: req.body.numberInStock,
      _id: req.params.id, // Important: Include the headphone's _id in the updated document
    });

    if (!errors.isEmpty()) {
      // Handle validation errors...
    } else {
      await Headphone.findByIdAndUpdate(req.params.id, updatedHeadphone, {});
      res.redirect("/catalog/headphone/" + req.params.id);
    }
  } catch (err) {
    next(err);
  }
});
