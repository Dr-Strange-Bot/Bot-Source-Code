const discord = require("discord.js");
const yts = require("yt-search");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  const query = args.join(" ");

  if (!message.channel.nsfw) {
    const errEmbed = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription("You can use this command in a NSFW channel.");

    message.reply({
      embeds: [errEmbed],
    });
  } else {
    if (!query) {
      const errEmbed2 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(
          "Please enter a search query.\nCorrect Usage: **>youtube [search query]**"
        );

      message.reply({
        embeds: [errEmbed2],
      });
    } else {
      const result = await yts(query);
      const videos = result.videos.slice(0, 1);
      videos.forEach(function (v) {
        message.reply({
          content: `${v.url}`,
        });
      });
    }
  }
};

module.exports.config = {
  name: "youtube",
  aliases: ["youtubesearch", "ytsearch"],
};
