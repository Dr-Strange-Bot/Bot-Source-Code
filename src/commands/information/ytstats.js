const discord = require("discord.js");
const yts = require("yt-search");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  const channelName = args.join(" ");

  if (!channelName) {
    const errEmbed = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Please enter a channel name.\nCorrect Usage: **>ytstats [channel name]**"
      );

    message.reply({
      embeds: [errEmbed],
    });
  } else {
    const result = await yts(channelName);
    const channels = result.channels.slice(0, 1);
    channels.forEach(function (c) {
      const ytstatsEmbed = new discord.MessageEmbed()
        .setColor("0155b6")
        .setThumbnail(c.image)
        .setTitle("YouTube Stats")
        .addField("Channel Name", `${c.name}`, false)
        .addField("Subscribers Count", `${c.subCount.toLocaleString()}`, false)
        .addField("Videos Count", `${c.videoCount.toLocaleString()}`, false)
        .setTimestamp();

      const row = new discord.MessageActionRow().addComponents(
        new discord.MessageButton()
          .setLabel("Channel Link")
          .setStyle("LINK")
          .setURL(c.url)
      );

      message
        .reply({
          embeds: [
            new discord.MessageEmbed()
              .setColor("0155b6")
              .setDescription("Fetching stats..."),
          ],
        })
        .then(async (s) => {
          s.edit({
            embeds: [ytstatsEmbed],
            components: [row],
          });
        });
    });
  }
};

module.exports.config = {
  name: "ytstats",
  aliases: ["youtubestats"],
};
