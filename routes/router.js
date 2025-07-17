const { Router } = require("express");
const controller = require("../controllers/controller");
const router = Router();

router.get("/", controller.displayBoard); //This is the index, should show index page
router.get("/message/:id", controller.displayMessageGet);
router.get("/new", controller.inputFormGet);
router.post("/new", controller.inputFormPost);

module.exports = router;
