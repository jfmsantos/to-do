const express = require("express");
const router = express.Router();

const TaskController = require("../controller/TaskController");
const TaskValidation = require("../middlewares/TaskValidation");
const MacaddressValidation = require("../middlewares/macaddressValidation");

router.post("/", TaskValidation, TaskController.create);
router.put("/:id", TaskValidation, TaskController.update);
router.get("/:id", TaskController.show);
router.delete("/:id", TaskController.delete);
router.get("/filter/all", MacaddressValidation, TaskController.all);
router.put("/:id/:done", TaskController.done);

module.exports = router;
