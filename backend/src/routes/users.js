const router = require("express").Router();
const userController = require("../controllers/users");

router.get("/", userController.getAllUsers);

router.get("/:userId", userController.getUserByID);

router.post("/", userController.createNewUser);

router.put("/:userId", userController.updateUserByID);

router.delete("/:userId", userController.deleteUserByID);

module.exports = router;