const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");
const chatController = require("../controller/chatController");
const authController = require("../controller/authController");
const authCheck = require("../middleware/authMiddleware");

//  Register user
router.post("/register", authController.Register);

// login
router.post("/login", authController.Login);

// Create user
router.post("/createuser", userController.createUser);

// Update user
router.put("/updateuser/:id", userController.updateUser);

// Delete user
router.delete("/deleteuser/:id", userController.deleteUser);

// Get all users
router.get("/users", userController.getAllUsers);

// Get a specific user
router.get("/users/:id", userController.getUserById);

// Create chat
router.post('/chat',authCheck.authCheck,chatController.sendMessageToChatGPT)


router.get('/allChat/:id',chatController.getChatByUser)




router.use((req, res) => {
  res.status(404).json({ error: "URL not found" });
});

module.exports = router;
