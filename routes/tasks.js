var express = require("express");
var router = express.Router();

var tasksCtrl = require("../controllers/tasks");
const ensureLoggedIn = require("../config/ensureLoggedIn");

router.get("/", ensureLoggedIn, tasksCtrl.index);
router.get("/new", ensureLoggedIn, tasksCtrl.new);
router.post("/create", ensureLoggedIn, tasksCtrl.create);
router.get("/show/:id", ensureLoggedIn, tasksCtrl.show);
router.put("/update/:id", ensureLoggedIn, tasksCtrl.update);
router.delete("/:id", ensureLoggedIn, tasksCtrl.delete);
router.get("/search", ensureLoggedIn, tasksCtrl.search);

module.exports = router;
