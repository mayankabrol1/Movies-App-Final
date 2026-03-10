const mongoose = require("mongoose");

const savedItemSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    mediaType: { type: String, enum: ["movie", "tv"], required: true },
    tmdbId: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    posterPath: { type: String, default: null },
    releaseDate: { type: String, default: "" },
  },
  { timestamps: true }
);

savedItemSchema.index({ userId: 1, mediaType: 1, tmdbId: 1 }, { unique: true });

module.exports = mongoose.model("SavedItem", savedItemSchema);
