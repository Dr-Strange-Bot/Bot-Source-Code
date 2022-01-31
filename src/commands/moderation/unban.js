const discord = require("discord.js");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  const permission = message.member.permissions.has("BAN_MEMBERS");
  const userId = args[0];
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
  } else if (!userId) {
    const errEmbed2 = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Please enter the user ID to unban.\nCorrect Usage: **>unban [user ID] [reason]**"
      );

    message.reply({
      embeds: [errEmbed2],
    });
  } else {
    const totalBans = await message.guild.bans.fetch();
    const member = totalBans.find((x) => x.user.id === userId);

    if (!member) {
      const errEmbed3 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription("This user doesn't exist in the ban list.");

      message.reply({
        embeds: [errEmbed3],
      });
    } else {
      message.guild.members
        .unban(userId, reason)
        .then(() => {
          const unbanEmbed = new discord.MessageEmbed()
            .setColor("0155b6")
            .setTitle("Unbanned a user")
            .setDescription(
              `User unbanned: <@${userId}>\nModerator: <@${message.author.id}>\nReason: **${reason}**`
            )
            .setTimestamp();

          message.reply({
            embeds: [unbanEmbed],
          });
        })
        .catch((err) => {
          console.log(err);
          message.reply({
            content: "An error occurred while running this command.",
          });
        });
    }
  }
};

module.exports.config = {
  name: "unban",
  aliases: ["removeban"],
};
