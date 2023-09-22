const Chat = require("../model/chatModel");
const User = require("../model/userModel");
const axios = require("axios");
require('dotenv').config();

const apiKey = process.env.CHAT_GPT_API_KEY;
const apiUrl = process.env.CHAT_GPT_URL
console.log("api key",apiKey)
console.log("api url",apiUrl)


const sendMessageToChatGPT = async (req, res) => {
  try {
    const { userId, message } = req.body;
    // console.log(userId, message);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const response = await axios.post(
      apiUrl,
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant.",
          },
          {
            role: "user",
            content: message,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    // console.log(
    //   "this is the responce result",
    //   response.data.choices[0].message.content
    // );
    const newChat = new Chat({
      user: userId,
      question: message,
      answer: response.data.choices[0].message.content,
    });
    await newChat.save();
    return res.json({
      question: message,
      response: response.data.choices[0].message.content,
    });
  } catch (error) {
    res.status(error.response.status).json({
      error_code: error.code,
      error_status_code: error.response.status,
      error_status_text: error.response.statusText,
    });
  }
};

const getChatByUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const chat = await Chat.find({ user: userId }).exec();
    if (!chat) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(chat);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  sendMessageToChatGPT,
  getChatByUser,
};
