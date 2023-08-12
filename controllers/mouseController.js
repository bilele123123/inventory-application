const { body, validationResult } = require("express-validator");
const Mouse = require("../models/mouse");
const asyncHandler = require("express-async-handler");
const he = require("he");

// Display list of all Categories.
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
    const [mouse, description] = await Promise.all([
      Mouse.findById(req.params.id).exec(),
    ]);

    if (mouse === null) {
      const err = new Error("Mouse not found");
      err.status = 404;
      return next(err);
    }

    const category_mouse = await Mouse.find({ category: mouse.category }).exec();

    res.render("mouse_detail", {
      title: "Mouse Detail",
      mouse: mouse,
      mouse_description: description,
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
  body("brand", "Enter a valid brand").trim().notEmpty().escape(),
  body("model", "Enter a valid model").trim().notEmpty().escape(),
  body("description", "Enter a valid description").trim().notEmpty().escape(),
  body("price", "Enter a valid price").isFloat({ min: 0 }),
  body("numberInStock", "Enter a valid number in stock").isInt({ min: 0 }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const mouse = new Mouse({
      brand: he.decode(req.body.brand),
      model: he.decode(req.body.model),
      description: he.decode(req.body.description),
      price: req.body.price,
      numberInStock: req.body.numberInStock,
    });

    if (!errors.isEmpty()) {
      res.render("mouse_form", {
        title: "Create New Mouse",
        mouse: mouse,
        errors: errors.array(),
      });
      return;
    } else {
      await mouse.save();
      res.redirect("/catalog/mouse");
    }
  }),
];

// Display Mouse delete form on GET.
exports.mouse_delete_get = asyncHandler(async (req, res, next) => {
  // Get details of mouse and all their books (in parallel)
  const [mouse] = await Promise.all([
    Mouse.findById(req.params.id).exec(),
  ]);

  if (mouse === null) {
    // No results.
    res.redirect("/catalog/mouse");
  }

  res.render("mouse_delete", {
    title: "Delete Mouse",
    mouse: mouse,
  });
});

// Handle Mouse delete on POST.
exports.mouse_delete_post = asyncHandler(async (req, res, next) => {
  try {
    // Get details of mouse
    const mouse = await Mouse.findById(req.params.id).exec();

    if (!mouse) {
      // Mouse not found.
      res.redirect("/catalog/mouse");
      return;
    }

    // Delete the mouse object and redirect to the list of mouses.
    await Mouse.findByIdAndRemove(req.params.id);  // Update this line
    res.redirect("/catalog/mouse");
  } catch (err) {
    return next(err);
  }
});

// Display mouse update form on GET.
exports.mouse_update_get = asyncHandler(async (req, res, next) => {
  try {
    const mouse = await Mouse.findById(req.params.id).exec();

    if (mouse === null) {
      const err = new Error("Mouse not found");
      err.status = 404;
      return next(err);
    }

    res.render("mouse_update_form", {
      title: "Update Mouse",
      mouse: mouse,
    });
  } catch (err) {
    next(err);
  }
});

// Handle mouse update on POST.
exports.mouse_update_post = asyncHandler(async (req, res, next) => {
  try {
    const errors = validationResult(req);

    const updatedMouse = new Mouse({
      brand: he.decode(req.body.brand),
      model: he.decode(req.body.model),
      description: he.decode(req.body.description),
      price: req.body.price,
      numberInStock: req.body.numberInStock,
      _id: req.params.id, // Important: Include the mouse's _id in the updated document
    });

    if (!errors.isEmpty()) {
      // Handle validation errors...
    } else {
      await Mouse.findByIdAndUpdate(req.params.id, updatedMouse, {});
      res.redirect("/catalog/mouse/" + req.params.id);
    }
  } catch (err) {
    next(err);
  }
});
