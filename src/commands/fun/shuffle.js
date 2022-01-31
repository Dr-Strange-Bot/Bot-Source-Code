const discord = require("discord.js");
const axios = require("axios");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  const content = args.join(" ");
  const url = `https://api.monkedev.com/fun/shuffle?content=${content}`;

  if (!content) {
    const errEmbed = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Please enter the content you want to shuffle.\nCorrect Usage: **>shuffle [content]**"
      );

    message.reply({
      embeds: [errEmbed],
    });
  } else {
    axios
      .get(url)
      .then((res) => {
        const shuffleEmbed = new discord.MessageEmbed()
          .setColor("#0155b6")
          .setDescription(
            `Original Content: **${content}**\nShuffled Content: **${res.data.result}**`
          )
          .setTimestamp();

        message
          .reply({
            embeds: [
              new discord.MessageEmbed()
                .setColor("#0155b6")
                .setDescription("Shuffling..."),
            ],
          })
          .then(async (s) => {
            s.edit({
              embeds: [shuffleEmbed],
            });
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
  name: "shuffle",
  aliases: [],
};
