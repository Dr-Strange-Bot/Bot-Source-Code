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
  let amount = Math.floor(Math.random() * 5000) + 1000;

  let data;
  try {
    data = await schema.findOne({
      userId: user.id,
    });

    if (!data) {
      data = await schema.create({
        userId: user.id,
      });
    }
  } catch (err) {
    console.log(err);
    message.reply({
      content: "An error occurred while running this command.",
    });
  }

  let timeout = 3600000;
  const jobs = [
    "Doctor",
    "Scientist",
    "Artist",
    "Software Engineer",
    "Farmer",
    "Florist",
  ];
  const job = jobs[Math.floor(Math.random() * jobs.length)];

  if (timeout - (Date.now() - data.workTimeout) > 0) {
    let timeLeft = ms(timeout - (Date.now() - data.workTimeout));

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
    data.workTimeout = Date.now();
    data.wallet += amount * 1;
    await data.save();

    const workEmbed = new discord.MessageEmbed()
      .setColor("#0155b6")
      .setDescription(
        `You worked as a **${job}** and recieved **:coin: ${amount.toLocaleString()}**`
      )
      .addField("Your Wallet Balance", `${data.wallet.toLocaleString()}`);

    message.reply({
      embeds: [workEmbed],
    });
  }
};

module.exports.config = {
  name: "work",
  aliases: ["job"],
};
