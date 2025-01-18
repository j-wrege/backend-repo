const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; // Extract token
    if (!token) {
        return res.status(401).json({ error: "No token, authorization denied" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request
        next();
    } catch (err) {
        res.status(403).json({ error: "Invalid token" });
    }
};

module.exports = authenticate;
