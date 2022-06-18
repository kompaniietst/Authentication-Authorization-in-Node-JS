const mongoose = require('mongoose');

const entitySchema = new mongoose.Schema({
    name: { type: String, default: null },
    type: { type: String, default: null },
    path: { type: [String], default: [] },
    createdAt: { type: Date },
    author: { type: String },
})

module.exports = mongoose.model("Entity", entitySchema);