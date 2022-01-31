const discord = require("discord.js");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  const permission = message.member.permissions.has("MANAGE_MESSAGES");
  const amount = args[0];

  if (!permission) {
    const errEmbed = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "You don't have the permission to use this command.\nRequired Permission: **MANAGE_MESSAGES**"
      );

    message.reply({
      embeds: [errEmbed],
    });
  } else if (!amount) {
    const errEmbed2 = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Please enter the amount of messages you want to delete.\nCorrect Usage: **>purge [amount of messages]**"
      );

    message.reply({
      embeds: [errEmbed2],
    });
  } else if (isNaN(amount)) {
    const errEmbed3 = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Please enter a real number which is above 0 and below 100.\nCorrect Usage: **>purge [amount of messages]**"
      );

    message.reply({
      embeds: [errEmbed3],
    });
  } else if (amount > 100 || amount <= 0) {
    const errEmbed4 = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription("Minimum limit is **1**\nMaximum limit is **100**");

    message.reply({
      embeds: [errEmbed4],
    });
  } else {
    message.channel.bulkDelete(amount, true);

    const purgeEmbed = new discord.MessageEmbed()
      .setColor("0155b6")
      .setDescription(
        `${message.author} deleted **${amount}** messages in this channel`
      );

    message.channel.send({
      embeds: [purgeEmbed],
    });
  }
};

module.exports.config = {
  name: "purge",
  aliases: ["clear", "deletemsg", "deletemessages"],
};
