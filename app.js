const express = require("express");
const app = express();
const PORT = 3000;
const router = require("./routes/router");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", router);
app.use(express.static(__dirname + '/public'));

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
