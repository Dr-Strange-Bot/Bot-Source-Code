const discord = require("discord.js");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  const voteButton = new discord.MessageButton()
    .setLabel("Vote Me on Top.gg")
    .setStyle("LINK")
    .setURL("https://top.gg/bot/935229681718952008/vote");

  const row = new discord.MessageActionRow().addComponents(voteButton);

  message.reply({
    content: "Click the below button to vote me on Top.gg",
    components: [row],
  });
};

module.exports.config = {
  name: "vote",
  aliases: ["drstrangevote"],
};
