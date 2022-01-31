const discord = require("discord.js");
const axios = require("axios");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  const content = args.join(" ");
  const url = `https://api.monkedev.com/fun/reverse?content=${content}`;

  if (!content) {
    const errEmbed = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Please enter the content you want to reverse.\nCorrect Usage: **>reverse [content]**"
      );

    message.reply({
      embeds: [errEmbed],
    });
  } else {
    axios
      .get(url)
      .then((res) => {
        const reverseEmbed = new discord.MessageEmbed()
          .setColor("#0155b6")
          .setDescription(
            `Original Content: **${content}**\nReversed Content: **${res.data.result}**`
          )
          .setTimestamp();

        message
          .reply({
            embeds: [
              new discord.MessageEmbed()
                .setColor("#0155b6")
                .setDescription("Reversing..."),
            ],
          })
          .then(async (r) => {
            r.edit({
              embeds: [reverseEmbed],
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
  name: "reverse",
  aliases: [],
};
