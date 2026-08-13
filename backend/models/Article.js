const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    content: {
        type: String,
        required: true,
    },

    date: {
        type: String,
        required: true,
    },

    author: {
        type: String,
        required: true,
    },

    tags: {
        type: [String],
        default: [],
    },
});

module.exports = mongoose.model("Article", articleSchema);