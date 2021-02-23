// Category Schema Model
const mongoose = require("../db/db");

const CategorySchema = mongoose.Schema(
  {
    username: {
      type: String,
    },
    user_id: {
      type: String,
    },
    category: {
      type: String,
      required: true,
      unique: true,
    },
    instructions: {
      type: String,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("category", CategorySchema);

module.exports = Category;
