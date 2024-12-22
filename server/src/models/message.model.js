import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    recieverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    text: {
      type: String,
      default: null,
      validate: {
        validator: function () {
          return this.text || this.image;
        },
        message: "Message must have either text or an image."
      }
    },
    image: {
      type: String,
      default: null,
      validate: {
        validator: function () {
          return this.text || this.image;
        },
        message: "Message must have either text or an image."
      }
    }
  },
  { timestamps: true }
);

const Message =
  mongoose.model.Message || mongoose.model("Messages", messageSchema);
export default Message;
