const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const KeyboardSchema = new Schema({
  brand: { type: String, required: true, maxlength: 100 },
  model: { type: String, required: true, maxlength: 100 },
  description: { type: String, required: true, maxlength: 500 },
  price: { type: Number, required: true, min: 0 },
  numberInStock: { type: Number, required: true, min: 0 },
  url: { type: String },
});

KeyboardSchema.virtual("keyboardUrl").get(function () {
  return `/catalog/keyboard/${this._id}`;
});

module.exports = mongoose.model("Keyboard", KeyboardSchema);
