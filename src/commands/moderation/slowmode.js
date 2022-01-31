const discord = require("discord.js");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  const permission = message.member.permissions.has("MANAGE_CHANNELS");
  const channel = message.channel;
  const slowmodeDuration = args[0];

  if (!permission) {
    const errEmbed = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "You don't have the permission to use this command.\nRequired Permission: **MANAGE_CHANNELS**"
      );

    message.reply({
      embeds: [errEmbed],
    });
  } else if (!slowmodeDuration) {
    const errEmbed2 = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Please enter the slowmode duration in seconds.\nCorrect Usage: **>slowmode [slowmode duration in seconds]**"
      );

    message.reply({
      embeds: [errEmbed2],
    });
  } else if (slowmodeDuration > 21600 || slowmodeDuration < 5) {
    const errEmbed3 = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Minimum slowmode limit is **5 seconds**\nMaximum slowmode limit is **21,600 seconds**"
      );

    message.reply({
      embeds: [errEmbed3],
    });
  } else {
    channel
      .setRateLimitPerUser(slowmodeDuration)
      .then(() => {
        const slowmodeEmbed = new discord.MessageEmbed()
          .setColor("0155b6")
          .setDescription(
            `Successfuly set slowmode of **${slowmodeDuration} seconds** for this channel`
          );

        message.reply({
          embeds: [slowmodeEmbed],
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
  name: "slowmode",
  aliases: ["setslowmode", "setratelimit"],
};
