const express = require("express");
const { authMiddleware } = require("../middleware/auth");
const SavedItem = require("../models/SavedItem");

const router = express.Router();

router.get("/saved", authMiddleware, async (req, res) => {
  const items = await SavedItem.find({ userId: req.user._id }).sort({ createdAt: -1 });
  return res.json({
    items: items.map((item) => ({
      id: item.tmdbId,
      mediaType: item.mediaType,
      title: item.title,
      posterPath: item.posterPath,
      releaseDate: item.releaseDate,
      savedAt: item.createdAt,
    })),
  });
});

router.post("/saved", authMiddleware, async (req, res) => {
  const { mediaType, tmdbId, title, posterPath, releaseDate } = req.body || {};
  if (!["movie", "tv"].includes(mediaType)) {
    return res.status(400).json({ message: "mediaType must be movie or tv" });
  }
  if (!tmdbId || !title) {
    return res.status(400).json({ message: "tmdbId and title are required" });
  }

  const saved = await SavedItem.findOneAndUpdate(
    { userId: req.user._id, mediaType, tmdbId: String(tmdbId) },
    {
      userId: req.user._id,
      mediaType,
      tmdbId: String(tmdbId),
      title,
      posterPath: posterPath || null,
      releaseDate: releaseDate || "",
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  return res.status(201).json({
    item: {
      id: saved.tmdbId,
      mediaType: saved.mediaType,
      title: saved.title,
      posterPath: saved.posterPath,
      releaseDate: saved.releaseDate,
      savedAt: saved.createdAt,
    },
  });
});

router.delete("/saved/:mediaType/:tmdbId", authMiddleware, async (req, res) => {
  const { mediaType, tmdbId } = req.params;
  if (!["movie", "tv"].includes(mediaType)) {
    return res.status(400).json({ message: "mediaType must be movie or tv" });
  }

  await SavedItem.deleteOne({
    userId: req.user._id,
    mediaType,
    tmdbId: String(tmdbId),
  });
  return res.json({ ok: true });
});

module.exports = router;
