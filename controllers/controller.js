// const { body, validationResult } = require("express-validator");
const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const messageLengthErr = "Must be maximum 100 characters.";

async function displayBoard(req, res) {
  const messages = await db.getAllMessages();
  res.render("index", { title: "Mini Messageboard", messages: messages });
}

async function displayMessageGet(req, res) {
  const { id } = req.params;
  const rows = await db.getMessage(id);
  if (rows.length != 0) {
    const message = rows[0];
    res.render("messageDetails", { message: message });
  }
}

function inputFormGet(req, res) {
  res.render("form");
}

async function inputFormPost(req, res) {
  const username = req.body.username;
  const message = req.body.message;
  await db.addMessage(username, message);

  res.redirect("/");
}
module.exports = {
  displayBoard,
  displayMessageGet,
  inputFormGet,
  inputFormPost,
};
