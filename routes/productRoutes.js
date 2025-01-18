const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const authenticate = require("../middleware/auth");

// Add a product (protected)
router.post("/", authenticate, async (req, res) => {
    console.log("Incoming POST request to /api/products");
    console.log("Request Body:", req.body);
    console.log("Authenticated User ID:", req.user.id);

    try {
        const { name, price, description, quantity } = req.body;

        if (!name || !price || !description || !quantity) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const newProduct = new Product({
            ...req.body,
            userId: req.user.id, // Assign logged-in user ID
        });

        const savedProduct = await newProduct.save();
        console.log("Product Created:", savedProduct);
        res.status(201).json(savedProduct);
    } catch (err) {
        console.error("Error creating product:", err.message);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
});



// Get all products for the authenticated user
// Get a single product by ID
router.get("/", async (req, res) => {
    try {
        const products = await Product.find().populate("userId", "firstName lastName");
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
});



// Update a product
router.put("/:id", authenticate, async (req, res) => {
    try {
        // Find the product by ID
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Check if the user is authorized to update the product
        if (product.userId.toString() !== req.user.id) {
            return res.status(403).json({ error: "You are not authorized to update this product" });
        }

        // Update the product
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validators
        });

        res.status(200).json(updatedProduct);
    } catch (err) {
        console.error("Error updating product:", err.message);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
});



// Delete a product
router.delete("/:id", authenticate, async (req, res) => {
    try {
        console.log("Incoming delete request for product ID:", req.params.id);
        console.log("Logged-in user ID:", req.user.id);

        // Find the product by ID
        const product = await Product.findById(req.params.id);
        if (!product) {
            console.log("Product not found");
            return res.status(404).json({ error: "Product not found" });
        }

        console.log("Product found:", product);

        // Check if the user is authorized to delete the product
        if (product.userId.toString() !== req.user.id) {
            console.log("Unauthorized delete attempt");
            return res.status(403).json({ error: "You are not authorized to delete this product" });
        }

        // Delete the product
        await product.deleteOne();
        console.log("Product deleted successfully");
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
        console.error("Error deleting product:", err.message);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
});


module.exports = router;
