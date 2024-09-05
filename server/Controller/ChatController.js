const AsyncHandler = require("express-async-handler")
const { ChatModel } = require("../Model/ChatsModel")
const SendMessage = AsyncHandler(async (req, res) => {
    try {
        let message = new ChatModel({
            sender: req.userId,
            receiver: req.query.ReceiverId
        })
        await message.save()

        if (message) {
            return res.json({ message: "message sent successfully" })
        }

    } catch (error) {
        console.log("error in sending message", error.message)
    }
})


const GetUserMessages = AsyncHandler(async (req, res) => {
    try {
        let { senderId, receiverId } = req.query

        let messages = await ChatModel.find({ $and: [{ sender: senderId }, { receiver: receiverId }] })
        if (!messages) {
            return res.json({ message: "chat not found" })
        }

        res.json({ messages: messages })
    } catch (error) {
        console.log("get user messages Error", error)
    }
})

module.exports = { SendMessage, GetUserMessages }