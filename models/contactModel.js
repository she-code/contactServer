const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema(
  {
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
    groups: {
      type: String,
      enum: ["friend", "family", "colleague"],
      default: "friend",
    },
    contactOwner: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A contact must belong to a user"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
