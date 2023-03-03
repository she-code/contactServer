const express = require("express");
const morgan = require("morgan");
const app = express();

const userRoute = require("./routes/userRoute");
const contactRoute = require("./routes/contactRoute");
const globalErrorHandler = require("./controllers/errorController");

app.get("/", (req, res) => {
  res.send("welcome to contact app");
});
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/users", userRoute);
app.use("/api/contacts", contactRoute);
app.use(globalErrorHandler);
module.exports = app;
