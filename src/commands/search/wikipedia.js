const discord = require("discord.js");
const ultrax = require("ultrax");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  const query = args.join(" ");

  if (!query) {
    const errEmbed = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Please enter a search query.\nCorrect Usage: **>wikipedia [search query]**"
      );

    message.reply({
      embeds: [errEmbed],
    });
  } else {
    const reponse = new ultrax.Wikipedia({
      color: "#0155b6",
      query: query,
      message: message,
    });

    reponse.fetch();
  }
};

module.exports.config = {
  name: "wikipedia",
  aliases: ["wiki"],
};
