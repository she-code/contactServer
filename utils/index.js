const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.generateHashedPassword = async (cleanPassword) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(cleanPassword, salt);
  return hashedPassword;
};

exports.generateJwtToken = (userId, expiresIn = "60d") => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn,
  });
  return token;
};
exports.createSendToken = (user, req, res) => {
  //generate jwt token
  const token = this.generateJwtToken(user._id);

  const cookieOPtions = {
    expiresIn: "60d",
    httpOnly: true,
  };
  if (process.env.NODE_ENV == "production") cookieOPtions.secure = true;

  res.cookie("jwt", token, cookieOPtions);
  res.status(200).json({
    status: "Success",
    id: user._id,
    token,
    expiresIn: "7776000",
  });
};
