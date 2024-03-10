const express = require("express");
const router = express.Router();

const TaskController = require("../controller/TaskController");
const TaskValidation = require("../middlewares/TaskValidation");
const MacaddressValidation = require("../middlewares/macaddressValidation");

router.post("/", TaskValidation, TaskController.create);
router.put("/:id", TaskValidation, TaskController.update);
router.put("/:id/:done", TaskController.done);
router.delete("/:id", TaskController.delete);
router.get("/:id", TaskController.show);
router.get("/filter/all", MacaddressValidation, TaskController.all);
router.get("/filter/late", MacaddressValidation, TaskController.late);
router.get("/filter/today", MacaddressValidation, TaskController.today);
router.get("/filter/week", MacaddressValidation, TaskController.week);

module.exports = router;
