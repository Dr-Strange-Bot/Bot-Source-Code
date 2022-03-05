const discord = require("discord.js");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  const user = message.mentions.users.first() || message.author;
  const ppSize = Math.floor(Math.random() * 10);
  let pp = "";

  for (let i = 0; i < ppSize; i++) {
    pp += "=";
  }

  const finalSize = `\n**8${pp}D**`;

  const ppsizeEmbed = new discord.MessageEmbed()
    .setColor("#0155b6")
    .setDescription(`${user}'s Penis Size\n${finalSize}`);

  message.reply({
    embeds: [ppsizeEmbed],
  });
};

module.exports.config = {
  name: "ppsize",
  aliases: ["penis", "penissize"],
};
