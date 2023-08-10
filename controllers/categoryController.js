const { body, validationResult } = require("express-validator");
const Category = require("../models/category");
const Desktop = require("../models/desktop");
const Headphone = require("../models/headphone");
const Keyboard = require("../models/keyboard");
const Laptop = require("../models/laptop");
const Mouse = require("../models/mouse");
const asyncHandler = require("express-async-handler");

exports.category_list = asyncHandler(async (req, res, next) => {
  const [
    numDesktop,
    numHeadphone,
    numKeyboard,
    numLaptop,
    numMouse,
  ] = await Promise.all([
    Desktop.find({}).exec(),
    Headphone.find({}).exec(),
    Keyboard.find({}).exec(),
    Laptop.find({}).exec(),
    Mouse.find({}).exec(),
  ]);

  res.render("index", {
    title: "List of Products",
    desktop_count: numDesktop.length,
    headphone_count: numHeadphone.length,
    keyboard_count: numKeyboard.length,
    laptop_count: numLaptop.length,
    mouse_count: numMouse.length,
  });
});
