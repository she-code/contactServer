/* The bellow code is a middleware function that is used to authenticate the user. */
const jsonwebtoken = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const authenticateJwt = (req, res, next) => {
  let token;

  try {
    if (req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.headers.authorization) {
      token = req.get("Authorization");
    }
    if (!token) {
      console.log("Not looged in");
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    if (!token) {
      return next(
        new AppError("Invalid credential. Please log in again!", 401)
      );
    }
    jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, verifiedJwt) => {
      if (err) {
        return next(
          new AppError("Your token has expired! Please log in again.", 401)
        );
      } else {
        req.user = verifiedJwt.id;
        console.log(token);
        console.log("user", req.user);

        next();
      }
    });
  } catch (error) {}
};
module.exports = authenticateJwt;
