const Message = require("../model/messageModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const path = require("path");
const express = require("express");
const { upload } = require("../multer");
const router = express.Router();

// create new message
router.post(
  "/create-new-message",
  upload.single("images"),
  catchAsyncError(async (req, res, next) => {
    try {
      const messageData = req.body;
      const fileUrl = req.file ? req.file.location : undefined;

      const message = new Message({
        conversationId: messageData.conversationId,
        text: messageData.text,
        sender: messageData.sender,
        images: fileUrl,
      });

      await message.save();

      res.status(201).json({
        success: true,
        message,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all messages with conversation id
router.get(
  "/get-all-messages/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const messages = await Message.find({
        conversationId: req.params.id,
      });

      res.status(201).json({
        success: true,
        messages,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
