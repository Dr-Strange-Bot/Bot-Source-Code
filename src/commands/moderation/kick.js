const discord = require("discord.js");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  const permission = message.member.permissions.has("KICK_MEMBERS");
  const user = message.mentions.members.first();
  const reason = args.slice(1).join(" ") || "No reason provided";

  if (!permission) {
    const errEmbed = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "You don't have the permission to use this command.\nRequired Permission: **KICK_MEMBERS**"
      );

    message.reply({
      embeds: [errEmbed],
    });
  } else if (!user) {
    const errEmbed2 = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Please mention a user to kick.\nCorrect Usage: **>kick [user] [reason]**"
      );

    message.reply({
      embeds: [errEmbed2],
    });
  } else if (user === message.author) {
    const errEmbed3 = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription("You can't kick yourself.");

    message.reply({
      embeds: [errEmbed3],
    });
  } else {
    user
      .kick(reason)
      .then(() => {
        const kickEmbed = new discord.MessageEmbed()
          .setColor("0155b6")
          .setTitle("Kicked a user")
          .setDescription(
            `User kicked: <@${user.id}>\nModerator: <@${message.author.id}>\nReason: **${reason}**`
          )
          .setTimestamp();

        message.reply({
          embeds: [kickEmbed],
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
  name: "kick",
  aliases: [],
};
