// create chat
// get all user chat
// find chat
const ConversationModel = require("../models/conversation");

module.exports.createChat = async (req, res) => {
    const { firstId, secondId } = req.body;

    try {
        // If conversation already exists, send back the old one
        const chat = await ConversationModel.findOne({
            members: { $all: [firstId, secondId] },
        });

        if (chat) return res.status(200).json(chat);
        // Create new chat
        const newChat = new ConversationModel({
            members: [firstId, secondId],
        });

        const response = await newChat.save();

        res.status(201).json(response);
    } catch (err) {
        console.log(err);
    }
};

module.exports.getUserConversations = async (req, res) => {
    const userId = req.params.userId;

    try {
        const chats = await ConversationModel.find({
            members: { $in: [userId] },
        });

        res.status(200).json(chats);
    } catch (error) {
        console.log(error);
    }
};

module.exports.findConversation = async (req, res) => {
    const { firstId, secondId } = req.params;

    try {
        const chat = await ConversationModel.findOne({
            members: { $all: [firstId, secondId] },
        });

        res.status(200).json(chat);
    } catch (error) {
        console.log(error);
    }
};
