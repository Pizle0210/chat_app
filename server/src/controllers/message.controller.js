import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export async function getUsers(req, res) {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId }
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log(`Error getting sidebar users: ${error.message}`);
    res.status(500).json({ message: `Internal Server Error` });
  }
}

export async function getMessages(req, res) {
  try {
    const { id: userChatId } = req.params;
    const myId = req.user._id; //currently authenticated user

    const messages = await Message.find({
      $or: [
        { senderId: myId, recieverId: userChatId },
        { senderId: userChatId, recieverId: myId }
      ]
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log(`Error getting sidebar users: ${error.message}`);
    res.status(500).json({ message: `Internal Server Error` });
  }
}

export async function sendMessage(req, res) {
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  try {
    const { text, image } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user._id;

    

    let imageUrl = null;
    if (image) {
      const imageBuffer = Buffer.from(image, "base64");
      if (imageBuffer.length > MAX_FILE_SIZE) {
        return res
          .status(400)
          .json({ message: "Image size exceeds the maximum limit." });
      }
      //upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image, {
        resource_type: "image",
        folder: "user_profile_images",
        invalidate: true
      });
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      recieverId,
      image: imageUrl || null,
      text: text || null
    });

    console.log(
      `Received payload size: ${Buffer.byteLength(
        JSON.stringify(req.body)
      )} bytes`
    );

    await newMessage.save();

    //   todo real time functionality ===> socket.io

    res.status(201).json(newMessage);
  } catch (error) {
    console.log(`Error sending message: ${error.message}`);
    res.status(500).json({ message: `Internal Server Error` });
  }
}
