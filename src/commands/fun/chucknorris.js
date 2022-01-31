const discord = require("discord.js");
const jokes = require("discord-jokes");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  jokes.getRandomCNJoke(function (joke) {
    const chucknorrisEmbed = new discord.MessageEmbed()
      .setColor("#0155b6")
      .setTitle("Here's a new chucknorris joke for you")
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
          embeds: [chucknorrisEmbed],
        });
      });
  });
};

module.exports.config = {
  name: "chucknorris",
  aliases: ["cnjoke"],
};
