const discord = require("discord.js");
const jokes = require("discord-jokes");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  jokes.getRandomDadJoke(function (joke) {
    const dadjokeEmbed = new discord.MessageEmbed()
      .setColor("#0155b6")
      .setTitle("Here's a new dadjoke for you")
      .setDescription(`**${joke}**`)
      .setTimestamp();

    message
      .reply({
        embeds: [
          new discord.MessageEmbed()
            .setColor("#0155b6")
            .setDescription("Fetching joke..."),
        ],
      })
      .then(async (jmsg) => {
        await jmsg.edit({
          embeds: [dadjokeEmbed],
        });
      });
  });
};

module.exports.config = {
  name: "dadjoke",
  aliases: ["djoke"],
};
