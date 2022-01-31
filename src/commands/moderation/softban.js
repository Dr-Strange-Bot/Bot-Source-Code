const discord = require("discord.js");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  const permission = message.member.permissions.has("BAN_MEMBERS");
  const user = message.mentions.members.first();
  const banDuration = args[1];
  const reason = args.slice(2).join(" ") || "No reason provided";

  if (!permission) {
    const errEmbed = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "You don't have the permission to use this command.\nRequired Permission: **BAN_MEMBERS**"
      );

    message.reply({
      embeds: [errEmbed],
    });
  } else if (!user) {
    const errEmbed2 = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Please mention a user to softban.\nCorrect Usage: **>softban [user] [duration in days] [reason]**"
      );

    message.reply({
      embeds: [errEmbed2],
    });
  } else if (!banDuration) {
    const errEmbed3 = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Please enter the ban duration in days.\nCorrect Usage: **>softban [user] [duration in days] [reason]**"
      );

    message.reply({
      embeds: [errEmbed3],
    });
  } else if (user === message.author) {
    const errEmbed4 = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription("You can't softban yourself.");

    message.reply({
      embeds: [errEmbed4],
    });
  } else {
    user
      .ban({
        reason: reason,
        days: banDuration,
      })
      .then(() => {
        const softbanEmbed = new discord.MessageEmbed()
          .setColor("0155b6")
          .setTitle("Soft Banned a user")
          .setDescription(
            `User soft banned: <@${user.id}>\nModerator: <@${message.author.id}>\nBan Duration: **${banDuration} day(s)**\nReason: **${reason}**`
          )
          .setTimestamp();

        message.reply({
          embeds: [softbanEmbed],
        });
      })
      .catch((err) => {
        console.log(err);
        message.reply({
          content: "An error occurred while running this command.",
        });
      });
  }
};

module.exports.config = {
  name: "softban",
  aliases: [],
};
