// Classify Schema Model
const mongoose = require('../db/db')

const ClassifySchema = mongoose.Schema({
  classifyName: {
    type: String,
    required: true,
    unique: true
  },
  introduction: {
    type: String,
  },
}, {timestamps: true})

const Classify = mongoose.model('classify', ClassifySchema)

module.exports = Classify