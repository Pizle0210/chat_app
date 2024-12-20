import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: String,
      required: true,
      ref: "User"
    },
    recieverId: {
      type: String,
      required: true,
      ref: "User"
    },
    text: {
      type: String,
      validate: {
        validator: (v) => {
          return !!v || !!this.image;
        },
        message: "Message must have either text or an image."
      }
    },
    image: {
      type: String
    }
  },
  { timestamps: true }
);

const Message =
  mongoose.model.Message || mongoose.model("Messages", messageSchema);
export default Message;
