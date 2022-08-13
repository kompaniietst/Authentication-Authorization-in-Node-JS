const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
    word: { type: String, default: null },
    translate: { type: String, default: null },
    transcription: { type: String, default: null },
    list_id: { type: String, default: null },
    createdAt: { type: Date },
})

module.exports = mongoose.model("Word", wordSchema);