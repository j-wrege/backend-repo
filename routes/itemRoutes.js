const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Public route: Get all items
const User = require("../models/User");

// Get all products for the logged-in user
// Fetch all products
// Get all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find().populate("userId", "firstName lastName");
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




// Public route: Get a single item by ID
router.get("/:id", async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
