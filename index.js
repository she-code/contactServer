const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require("./app");
dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 5001;
const DB = process.env.DB_URL.replace("<password>", process.env.DB_PASSWORD);
mongoose
  .connect(DB, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // usefindandModify: false,
  })
  .then((con) => console.log("Connection created"));
app.listen(port, () => {
  console.log(`Server started in ${port}`);
});
