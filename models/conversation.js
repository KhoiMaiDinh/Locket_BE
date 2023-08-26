const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
    {
        members: Array,
    },
    { timestamp: true }
);

const ConversationModel = mongoose.model("Chat", conversationSchema);
module.exports = ConversationModel;
