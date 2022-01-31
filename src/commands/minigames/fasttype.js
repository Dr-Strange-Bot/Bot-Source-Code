const discord = require("discord.js");
const weky = require("weky");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  const texts = [
    "absolute",
    "dangerous",
    "i love coding",
    "i love gaming",
    "i love fortnite",
    "google",
    "microsoft",
    "wumpus",
    "moderation",
    "discord nitro",
    "i love mincraft",
    "i love jebb",
    "i love typing",
  ];
  const text = texts[Math.floor(Math.random() * texts.length)];

  await weky.FastType({
    message: message,
    embed: {
      color: "#0155b6",
      title: "FastType Game",
      description: "You have **{{time}}** to type the below word/sentence",
      footer: "I love Typing ⌨️",
      timestamp: true,
    },
    sentence: text,
    winMessage: `Nice typing ${message.author}, you have a WPM of **{{wpm}}** and you made it in **{{time}}**`,
    loseMessage: "Better luck next time",
    cancelMessage: "You ended the game",
    time: 15000,
    othersMessage: `Only ${message.author} can use the buttons!`,
    buttonText: "Stop",
  });
};

module.exports.config = {
  name: "fasttype",
  aliases: [],
};
