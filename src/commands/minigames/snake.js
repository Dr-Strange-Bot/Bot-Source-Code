const discord = require("discord.js");
const weky = require("weky");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  await weky.Snake({
    message: message,
    embed: {
      color: "#0155b6",
      title: "Snake Game",
      description: `Nice game ${message.author}, you scored **{{score}}** points`,
      footer: "I love snakes 🐍",
      timestamp: true,
    },
    emojis: {
      empty: "⬛",
      snakeBody: "🟩",
      food: "🔴",
      up: "⬆️",
      right: "⬅️",
      down: "⬇️",
      left: "➡️",
    },
    othersMessage: `Only ${message.author} can use the buttons!`,
    buttonText: "Stop",
  });
};

module.exports.config = {
  name: "snake",
  aliases: [],
};
