const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HeadphoneSchema = new Schema({
  brand: { type: String, required: true, maxlength: 100 },
  model: { type: String, required: true, maxlength: 100 },
  description: { type: String, required: true, maxlength: 500 },
  price: { type: Number, required: true, min: 0 },
  numberInStock: { type: Number, required: true, min: 0 },
  url: { type: String },
});

HeadphoneSchema.virtual("url").get(function () {
  return "/headphone/" + this._id; 
});

module.exports = mongoose.model("Headphone", HeadphoneSchema);
