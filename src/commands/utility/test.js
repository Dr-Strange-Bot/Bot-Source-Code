const discord = require("discord.js");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  message.reply({
    content: "Hello World :wave:",
  });
};

module.exports.config = {
  name: "test",
  aliases: ["tst"],
};
