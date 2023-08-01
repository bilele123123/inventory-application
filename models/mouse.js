const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MouseSchema = new Schema({
  brand: { type: String, required: true, maxlength: 100 },
  model: { type: String, required: true, maxlength: 100 },
  description: { type: String, required: true, maxlength: 500 },
  price: { type: Number, required: true, min: 0 },
  numberInStock: { type: Number, required: true, min: 0 },
  url: { type: String },
});

MouseSchema.virtual("mouseUrl").get(function () {
  return `/catalog/mouse/${this._id}`;
});

module.exports = mongoose.model("Mouse", MouseSchema);
