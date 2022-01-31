const discord = require("discord.js");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  message.reply({
    content: "Website is in development :tools:",
  });
};

module.exports.config = {
  name: "website",
  aliases: ["web", "drstrangewebsite", "drstrangeweb"],
};
