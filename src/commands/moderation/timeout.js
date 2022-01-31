const discord = require("discord.js");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  const permission =
    message.member.permissions.has("KICK_MEMBERS") ||
    message.member.permissions.has("BAN_MEMBERS");
  const user = message.mentions.members.first();
  const timeoutDuration = args[1];
  const reason = args.slice(2).join(" ") || "No reason provided";

  if (!permission) {
    const errEmbed = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "You don't have the permission to use this command.\nRequired Permission: **KICK_MEMBERS** or **BAN_MEMBERS**"
      );

    message.reply({
      embeds: [errEmbed],
    });
  } else if (!user) {
    const errEmbed2 = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Please mention a user to timeout.\nCorrect Usage: **>timeout [user] [timeout duration in minutes] [reason]**"
      );

    message.reply({
      embeds: [errEmbed2],
    });
  } else if (!timeoutDuration) {
    const errEmbed3 = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Please enter the timeout duration in minutes.\nCorrect Usage: **>timeout [user] [timeout duration in minutes] [reason]**"
      );

    message.reply({
      embeds: [errEmbed3],
    });
  } else {
    user
      .timeout(timeoutDuration * 60 * 1000, reason)
      .then(() => {
        const timeoutEmbed = new discord.MessageEmbed()
          .setColor("0155b6")
          .setTitle("Timedout a user")
          .setDescription(
            `User timedout: <@${user.id}>\nModerator: <@${message.author.id}>\nTimeout Duration: **${timeoutDuration} minute(s)**Reason: **${reason}**`
          );

        message.reply({
          embeds: [timeoutEmbed],
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
  name: "timeout",
  aliases: ["mute"],
};
