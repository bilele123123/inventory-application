const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DesktopSchema = new Schema({
  brand: { type: String, required: true, maxlength: 100 },
  model: { type: String, required: true, maxlength: 100 },
  description: { type: String, required: true, maxlength: 500 },
  price: { type: Number, required: true, min: 0 },
  numberInStock: { type: Number, required: true, min: 0 },
  url: { type: String },
});

DesktopSchema.virtual("desktopUrl").get(function () {
  return `/catalog/desktop/${this._id}`;
});

module.exports = mongoose.model("Desktop", DesktopSchema);
