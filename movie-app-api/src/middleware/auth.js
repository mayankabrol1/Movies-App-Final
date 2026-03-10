const User = require("../models/User");
const { verifyAccessToken } = require("../utils/tokens");

async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const [scheme, token] = authHeader.split(" ");
    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({ message: "Missing or invalid Authorization header" });
    }

    const payload = verifyAccessToken(token);
    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired access token" });
  }
}

module.exports = { authMiddleware };
