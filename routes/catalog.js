const express = require("express");
const router = express.Router();

// Require controller modules.
const categoryController = require("../controllers/categoryController");
const desktopController = require("../controllers/desktopController");
const headphoneController = require("../controllers/headphoneController");
const keyboardController = require("../controllers/keyboardController");
const laptopController = require("../controllers/laptopController");
const mouseController = require("../controllers/mouseController");

/// CATEGORY ROUTES ///

// GET catalog home page.
router.get("/", categoryController.category_list);

// GET request for list of all Category.
router.get("/category", categoryController.category_list);

/// DESKTOP ROUTES ///

// GET request for creating desktop. NOTE This must come before route for id (i.e. display desktop).
router.get("/desktop", desktopController.desktop_list);

router.get("/desktop/create", desktopController.desktop_create_get);

// POST request for creating desktop.
router.post("/desktop/create", desktopController.desktop_create_post);

// GET request to delete desktop.
router.get("/desktop/:id/delete", desktopController.desktop_delete_get);

// POST request to delete desktop.
router.post("/desktop/:id/delete", desktopController.desktop_delete_post);

// GET request to update desktop.
router.get("/desktop/:id/update", desktopController.desktop_update_get);

// POST request to update desktop.
router.post("/desktop/:id/update", desktopController.desktop_update_post);

// GET request for one desktop.
router.get("/desktop/:id", desktopController.desktop_detail);

/// HEADPHONE ROUTES ///

// GET request for creating a headphone. NOTE This must come before route that displays headphone (uses id).
router.get("/headphone", headphoneController.headphone_list);

router.get("/headphone/create", headphoneController.headphone_create_get);

// POST request for creating headphone.
router.post("/headphone/create", headphoneController.headphone_create_post);

// GET request to delete headphone.
router.get("/headphone/:id/delete", headphoneController.headphone_delete_get);

// POST request to delete headphone.
router.post("/headphone/:id/delete", headphoneController.headphone_delete_post);

// GET request to update headphone.
router.get("/headphone/:id/update", headphoneController.headphone_update_get);

// POST request to update headphone.
router.post("/headphone/:id/update", headphoneController.headphone_update_post);

// GET request for one headphone.
router.get("/headphone/:id", headphoneController.headphone_detail);

/// KEYBOARD ROUTES ///

// GET request for creating a keyboard. NOTE This must come before route that displays keyboard (uses id).
router.get("/keyboard", keyboardController.keyboard_list);

router.get("/keyboard/create", keyboardController.keyboard_create_get);

// POST request for creating keyboard.
router.post("/keyboard/create", keyboardController.keyboard_create_post);

// GET request to delete keyboard.
router.get("/keyboard/:id/delete", keyboardController.keyboard_delete_get);

// POST request to delete keyboard.
router.post("/keyboard/:id/delete", keyboardController.keyboard_delete_post);

// GET request to update keyboard.
router.get("/keyboard/:id/update", keyboardController.keyboard_update_get);

// POST request to update keyboard.
router.post("/keyboard/:id/update", keyboardController.keyboard_update_post);

// GET request for one keyboard.
router.get("/keyboard/:id", keyboardController.keyboard_detail);

/// LAPTOP ROUTES ///

// GET request for creating a laptop. NOTE This must come before route that displays laptop (uses id).
router.get("/laptop", laptopController.laptop_list);

router.get("/laptop/create", laptopController.laptop_create_get);

// POST request for creating laptop.
router.post("/laptop/create", laptopController.laptop_create_post);

// GET request to delete laptop.
router.get("/laptop/:id/delete", laptopController.laptop_delete_get);

// POST request to delete laptop.
router.post("/laptop/:id/delete", laptopController.laptop_delete_post);

// GET request to update laptop.
router.get("/laptop/:id/update", laptopController.laptop_update_get);

// POST request to update laptop.
router.post("/laptop/:id/update", laptopController.laptop_update_post);

// GET request for one laptop.
router.get("/laptop/:id", laptopController.laptop_detail);

/// MOUSE ROUTES ///

// GET request for creating a mouse. NOTE This must come before route that displays mouse (uses id).
router.get("/mouse", mouseController.mouse_list);

router.get("/mouse/create", mouseController.mouse_create_get);

// POST request for creating mouse.
router.post("/mouse/create", mouseController.mouse_create_post);

// GET request to delete mouse.
router.get("/mouse/:id/delete", mouseController.mouse_delete_get);

// POST request to delete mouse.
router.post("/mouse/:id/delete", mouseController.mouse_delete_post);

// GET request to update mouse.
router.get("/mouse/:id/update", mouseController.mouse_update_get);

// POST request to update mouse.
router.post("/mouse/:id/update", mouseController.mouse_update_post);

// GET request for one mouse.
router.get("/mouse/:id", mouseController.mouse_detail);

module.exports = router;
