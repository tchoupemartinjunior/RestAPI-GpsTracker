const { addPosition, getPositions, getPositionById, deletePosition } = require("./position.controller");
const router = require("express").Router();

// lurl et la methode a executer
router.post("/", addPosition);
router.get("/", getPositions);
router.get("/:id", getPositionById);
//router.patch("/", updateUser);
router.delete("/", deletePosition);
module.exports = router;