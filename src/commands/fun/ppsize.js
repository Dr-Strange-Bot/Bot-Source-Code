const discord = require("discord.js");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  const user = message.mentions.users.first() || message.author;
  const pps = [
    "8D",
    "8=D",
    "8==D",
    "8===D",
    "8====D",
    "8=====D",
    "8======D",
    "8=======D",
    "8========D",
    "8=========D",
    "8==========D",
  ];
  const ppsize = pps[Math.floor(Math.random() * pps)];

  const ppsizeEmbed = new discord.MessageEmbed()
    .setColor("#0155b6")
    .setDescription(`${user}'s Penis Size\n${ppsize}`);

  message.reply({
    embeds: [ppsizeEmbed],
  });
};

module.exports.config = {
  name: "ppsize",
  aliases: ["penis", "penissize"],
};
