const discord = require("discord.js");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  const pingEmbed = new discord.MessageEmbed()
    .setColor("#0155b6")
    .setDescription("Calculating ping...");
  message
    .reply({
      embeds: [pingEmbed],
    })
    .then((replyMessage) => {
      const ping = replyMessage.createdTimestamp - message.createdTimestamp;
      const pingEmbed2 = new discord.MessageEmbed()
        .setColor("#0155b6")
        .setDescription(
          `:robot: Bot Latency: **${ping}ms**\n\n:inbox_tray: API Latency: **${client.ws.ping}ms**\n\n:alarm_clock: Uptime: **${client.uptime}ms**`
        );
      replyMessage.edit({
        embeds: [pingEmbed2],
      });
    });
};

module.exports.config = {
  name: "ping",
  aliases: ["latency", "uptime"],
};
