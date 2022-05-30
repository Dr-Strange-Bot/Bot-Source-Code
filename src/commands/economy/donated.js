const schema = require("../../schemas/currencySchema");
const discord = require("discord.js");
const ms = require("ms");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  let user = message.author;
  let donatedId = "787019465568419871";

  let data;
  try {
    data = await schema.findOne({
      userId: user.id,
    });

    if (!data) {
      data = await schema.create({
        userId: user.id,
        guildId: message.guild.id,
      });
    }
  } catch (err) {
    console.log(err);
    message.reply({
      content: "An error occurred while running this command.",
    });
  }

  let timeout = 3600000;

  if (timeout - (Date.now() - data.donatedTimeout) > 0) {
    let timeLeft = ms(timeout - (Date.now() - data.donatedTimeout));

    const timeoutEmbed = new discord.MessageEmbed()
      .setColor("#0155b6")
      .setTitle("Chill, don't be in a hurry")
      .setDescription(
        `You are on cooldown, you can use this command again after :alarm_clock: **${timeLeft}**`
      )
      .setTimestamp();

    message.reply({
      embeds: [timeoutEmbed],
    });
  } else {
    if (!user.id.includes(donatedId)) {
      const errEmbed = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(
          "You have not donated yet.\nIf you want to use this command, you need to donate me on Patreon."
        );

      const row = new discord.MessageActionRow().addComponents(
        new discord.MessageButton()
          .setLabel("Donation Link")
          .setStyle("LINK")
          .setURL("https://patreon.com/ashutoshswamy")
      );

      message.reply({
        embeds: [errEmbed],
        components: [row],
      });
    } else {
      data.donatedTimeout = Date.now();
      data.wallet += 100000 * 1;
      await data.save();

      const donatedEmbed = new discord.MessageEmbed()
        .setColor("#0155b6")
        .setTitle("Here's your donation reward")
        .setDescription(`You recieved **:coin: 1,00,000**`)
        .addField("Your Wallet Balance", `${data.wallet.toLocaleString()}`);

      message.reply({
        embeds: [donatedEmbed],
      });
    }
  }
};

module.exports.config = {
  name: "donated",
  aliases: [],
};
