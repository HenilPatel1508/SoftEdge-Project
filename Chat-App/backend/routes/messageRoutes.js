const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// Get chat history
router.get("/:room", async (req, res) => {
  const messages = await Message.find({
    room: req.params.room,
  });

  res.json(messages);
});

module.exports = router;