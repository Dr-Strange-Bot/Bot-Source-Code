const discord = require("discord.js");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  const permission = message.member.permissions.has("BAN_MEMBERS");
  const user = message.mentions.members.first();
  const reason = args.slice(1).join(" ") || "No reason provided";

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
        "Please mention a user to ban.\nCorrect Usage: **>ban [user] [reason]**"
      );

    message.reply({
      embeds: [errEmbed2],
    });
  } else if (user === message.author) {
    const errEmbed3 = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription("You can't ban yourself.");

    message.reply({
      embeds: [errEmbed3],
    });
  } else {
    user
      .ban({
        reason: reason,
      })
      .then(() => {
        const banEmbed = new discord.MessageEmbed()
          .setColor("0155b6")
          .setTitle("Banned a user")
          .setDescription(
            `User banned: <@${user.id}>\nModerator: <@${message.author.id}>\nReason: **${reason}**`
          )
          .setTimestamp();

        message.reply({
          embeds: [banEmbed],
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
  name: "ban",
  aliases: [],
};
