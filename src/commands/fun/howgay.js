const discord = require("discord.js");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  const user = message.mentions.users.first() || message.author;
  const gayPercentage = Math.floor(Math.random() * 100);

  const howgayEmbed = new discord.MessageEmbed()
    .setColor("#0155b6")
    .setDescription(`${user} is **${gayPercentage}%** gay :rainbow_flag:`);

  message.reply({
    embeds: [howgayEmbed],
  });
};

module.exports.config = {
  name: "howgay",
  aliases: [],
};
