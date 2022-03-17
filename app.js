// internal import
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

//extranal import
const route = require("./router/contactRouter");

app = express();

// middlware array
const middlware = [
  morgan("dev"),
  express.urlencoded({ extended: true }),
  express.json(),
  express.static("public"),
];
app.use(middlware);

// Static Files
app.use("/css", express.static(__dirname + "public/css"));
app.use("/img", express.static(__dirname + "public/img"));
app.use("/script", express.static(__dirname + "public/script"));

// view engine set
app.set("view engine", "ejs");

// router handle
app.use("/dasboard", route);

// 404 not found error handle
app.get("*", (req, res) => {
  res.send("<h1> 404 Not Found</h1>");
});

// Data-base connect
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Database Connected Succesfully`);
    app.listen(process.env.PORT, () =>
      console.log(`Server is Running on PORT - ${process.env.PORT}`)
    );
  })
  .catch((e) => {
    console.log(e);
  });
