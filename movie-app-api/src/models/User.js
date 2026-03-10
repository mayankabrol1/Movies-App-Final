const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    avatarUrl: { type: String, default: "" },
    provider: { type: String, enum: ["google", "password", "mixed"], default: "google" },
    providerUserId: { type: String, unique: true, sparse: true, index: true, default: null },
    passwordHash: { type: String, default: "" },
    phone: { type: String, default: "" },
    country: { type: String, default: "" },
    profileComplete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
