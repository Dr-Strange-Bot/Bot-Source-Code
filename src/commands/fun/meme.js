const discord = require("discord.js");
const axios = require("axios");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  const url = "https://meme-api.herokuapp.com/gimme";

  axios
    .get(url)
    .then((res) => {
      const memeEmbed = new discord.MessageEmbed()
        .setColor("#0155b6")
        .setTitle(res.data.title)
        .addField("Author", `${res.data.author}`, true)
        .addField("Ups :thumbsup:", `${res.data.ups}`, true)
        .setImage(res.data.url)
        .setTimestamp();

      const row = new discord.MessageActionRow().addComponents(
        new discord.MessageButton()
          .setLabel("Post Link")
          .setStyle("LINK")
          .setURL(res.data.postLink)
      );

      message
        .reply({
          embeds: [
            new discord.MessageEmbed()
              .setColor("#0155b6")
              .setDescription("Fetching meme..."),
          ],
        })
        .then(async (m) => {
          m.edit({
            embeds: [memeEmbed],
            components: [row],
          });
        });
    })
    .catch((err) => {
      console.log(err);
      message.reply({
        content: "An error occurred while running this command.",
      });
    });
};

module.exports.config = {
  name: "meme",
  aliases: ["maymay"],
};
