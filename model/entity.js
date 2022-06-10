const mongoose = require('mongoose');

const entitySchema = new mongoose.Schema({
    name: { type: String, default: null },
    type: { type: String, default: null },
    createdAt: { type: Date },
    author: { type: String },
})

module.exports = mongoose.model("Entity", entitySchema);