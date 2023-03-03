const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { generateHashedPassword, createSendToken } = require("../utils/index");
const AppError = require("../utils/AppError");

exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNo, email, password } = req.body;
    const hashedPassword = await generateHashedPassword(password);
    const user = await User.create({
      firstName,
      lastName,
      phoneNo,
      password: hashedPassword,
      email,
    });
    if (user) {
      createSendToken(user, req, res);
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: "fail",
      error: { message: error.message },
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (isPasswordCorrect) {
        createSendToken(user, req, res);
      } else {
        return next(new AppError("Incorrect email or password", 401));
      }
    } else {
      return next(new AppError("User not found", 404));
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: "fail",
      error: { message: error.message },
    });
  }
};
