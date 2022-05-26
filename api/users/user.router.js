const { createUser, getUsers, getUserById, updateUser, deleteUser } = require("./user.controller");
const router = require("express").Router();

// lurl et la methode a executer
router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.patch("/", updateUser);
router.delete("/", deleteUser);
module.exports = router;