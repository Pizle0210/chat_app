import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    fullName: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      minlenght: 7
    },
    profilePic: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1rNuFRQJ0m9EkNrwaJtyxCSEfY7Rz35rC_g&s"
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model.User || mongoose.model("User", userSchema);
export default User;
