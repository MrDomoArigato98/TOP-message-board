const express = require("express");
const path = require("node:path");
const { execPath } = require("node:process");
const app = express();
const assetsPath = path.join(__dirname, "public");
const PORT = 3000;
const { body, validationResult } = require("express-validator");

app.use(express.static(assetsPath));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

app.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});
app.get("/message/:index", (req, res) => {
  const { index } = req.params;
  const message = messages[index];

  res.render("messageDetails", { message: message });
});

app.get("/new", (req, res) => {
  res.render("form");
});

app.post("/new", (req, res) => {
  const message = req.body.message;
  const name = req.body.name;
  if (message == "" || name == "") {
    res.redirect("/");
    console.log("Nothing added");
  } else {
    messages.push({ text: message, user: name, added: new Date() });

    console.log(`Added User: ${name} `);
    console.log(`Message: ${message} `);
    res.redirect("/");
  }
});
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
