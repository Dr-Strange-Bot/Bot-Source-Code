const discord = require("discord.js");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  const permission = message.member.permissions.has("MANAGE_NICKNAMES");
  const user = message.mentions.users.first();
  const nickname = args.slice(1).join(" ");

  if (!permission) {
    const errEmbed = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "You don't have the permission to use this command.\nRequired Permission: **MANAGE_NICKNAMES**"
      );

    message.reply({
      embeds: [errEmbed],
    });
  } else if (!user) {
    const errEmbed2 = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Please mention a user to change their nickname.\nCorrect Usage: **>nickname [user] [nickname]**"
      );

    message.reply({
      embeds: [errEmbed2],
    });
  } else if (!nickname) {
    const errEmbed3 = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Please enter a new nickname.\nCorrect Usage: **>nickname [user] [nickname]**"
      );

    message.reply({
      embeds: [errEmbed3],
    });
  } else {
    const member = message.guild.members.cache.get(user.id);

    await member
      .setNickname(nickname)
      .then(() => {
        const nicknameEmbed = new discord.MessageEmbed()
          .setColor("0155b6")
          .setDescription(
            `Successfully changed **${user.username}'s** nickname to **${nickname}**`
          );

        message.reply({
          embeds: [nicknameEmbed],
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
  name: "nickname",
  aliases: ["changenick", "changenickname"],
};
