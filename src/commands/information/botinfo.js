const discord = require("discord.js");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  const botinfoEmbed = new discord.MessageEmbed()
    .setColor("0155b6")
    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
    .setTitle("Info on Dr Strange")
    .setDescription("Here's some basic information about myself")
    .addField("My ID", `${client.user.id}`, false)
    .addField("My Usertag", `${client.user.tag}`, false)
    .addField(
      "My Developers",
      "<@787019465568419871>\n<@823429083110441030>",
      false
    )
    .addField("I was developed on", "24th January 2022", false)
    .setTimestamp();

  message.reply({
    embeds: [botinfoEmbed],
  });
};

module.exports.config = {
  name: "botinfo",
  aliases: ["drstrangeinfo"],
};
