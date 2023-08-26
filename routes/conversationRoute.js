const { Router } = require("express");
const {
    createChat,
    findConversation,
    getUserConversations,
} = require("../controllers/chatController");

const router = Router();

router.post("/createChat", createChat);
router.get("/:userId", getUserConversations);
router.get("/find/:firstId/:secondId", findConversation);

module.exports = router;
