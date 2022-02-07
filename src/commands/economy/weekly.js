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
  let amount = Math.floor(Math.random() * 10000) + 5000;

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

  let timeout = 604800000;

  if (timeout - (Date.now() - data.weeklyTimeout) > 0) {
    let timeLeft = ms(timeout - (Date.now() - data.weeklyTimeout));

    const timeoutEmbed = new discord.MessageEmbed()
      .setColor("#0155b6")
      .setTitle("Chill, You have came too early my friend")
      .setDescription(
        `Looks like you have already claimed your weekly reward\nYou are on cooldown, you can use this command again after :alarm_clock: **${timeLeft}**`
      )
      .setTimestamp();

    message.reply({
      embeds: [timeoutEmbed],
    });
  } else {
    data.weeklyTimeout = Date.now();
    data.wallet += amount * 1;
    await data.save();

    const weeklyEmbed = new discord.MessageEmbed()
      .setColor("#0155b6")
      .setTitle("Here's your weekly reward")
      .setDescription(`You recieved **:coin: ${amount.toLocaleString()}**`)
      .addField("Your Wallet Balance", `${data.wallet.toLocaleString()}`);

    message.reply({
      embeds: [weeklyEmbed],
    });
  }
};

module.exports.config = {
  name: "weekly",
  aliases: [],
};
