const express = require("express");
const Article = require("../models/Article");

const router = express.Router();

// Get all articles
router.get("/", async (req, res) => {
    try {
        const articles = await Article.find().sort({ _id: 1 });

        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch articles.",
            error: error.message,
        });
    }
});

// Get one article by ID
router.get("/:id", async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);

        if (!article) {
            return res.status(404).json({
                message: "Article not found.",
            });
        }

        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch article.",
            error: error.message,
        });
    }
});

// Create a new article
router.post("/", async (req, res) => {
    try {
        const {
            title,
            description,
            content,
            date,
            author,
            tags
        } = req.body;

        if (!title || !description || !content || !date || !author) {
            return res.status(400).json({
                message: "Please fill in all required fields.",
            });
        }

        const article = new Article({
            title,
            description,
            content,
            date,
            author,
            tags,
        });

        await article.save();

        res.status(201).json({
            message: "Article created successfully.",
            article,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create article.",
            error: error.message,
        });
    }
});

module.exports = router;