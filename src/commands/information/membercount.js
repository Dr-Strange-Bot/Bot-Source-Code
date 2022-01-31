const discord = require("discord.js");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  const membercountEmbed = new discord.MessageEmbed()
    .setColor("#0155b6")
    .setDescription(`Members in this server: **${message.guild.memberCount}**`)
    .setTimestamp();

  message.reply({
    embeds: [membercountEmbed],
  });
};

module.exports.config = {
  name: "membercount",
  aliases: ["members"],
};
