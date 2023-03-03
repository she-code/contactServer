const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First name cant be empty"],
  },
  lastName: String,
  phoneNo: {
    type: Number,
    unique: true,
    required: [true, "Phone number is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
