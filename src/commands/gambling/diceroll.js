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
  let betAmount = args[0];
  let userChoice1 = Math.floor(Math.random() * 6);
  let userChoice2 = Math.floor(Math.random() * 6);
  let botChoice1 = Math.floor(Math.random() * 6);
  let botChoice2 = Math.floor(Math.random() * 6);
  let userTotal = userChoice1 * 1 + userChoice2 * 1;
  let botTotal = botChoice1 * 1 + botChoice2 * 1;

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

  let timeout = 30000;

  if (timeout - (Date.now() - data.dicerollTimeout) > 0) {
    let timeLeft = ms(timeout - (Date.now() - data.dicerollTimeout));

    const timeoutEmbed = new discord.MessageEmbed()
      .setColor("#0155b6")
      .setTitle("Chill, Take a breath")
      .setDescription(
        `You are on cooldown, you can use this command again after :alarm_clock: **${timeLeft}**`
      )
      .setTimestamp();

    message.reply({
      embeds: [timeoutEmbed],
    });
  } else {
    if (!betAmount) {
      const errEmbed = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(
          "Please enter a bet amount to roll the dice.\nCorrect Usage: **>diceroll [bet amount]**"
        );

      message.reply({
        embeds: [errEmbed],
      });
    } else if (betAmount > 100000 || betAmount < 100) {
      const errEmbed2 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(
          "Minimum bet amount is **100**\nMaximum bet amount is **1,00,000**"
        );

      message.reply({
        embeds: [errEmbed2],
      });
    } else if (isNaN(betAmount)) {
      const errEmbed3 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription("Bet amount must be a real number.");

      message.reply({
        embeds: [errEmbed3],
      });
    } else if (betAmount > data.wallet) {
      const errEmbed4 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(
          "You do not have that much coins in your wallet to roll the dice."
        );

      message.reply({
        embeds: [errEmbed4],
      });
    } else {
      if (userTotal === botTotal) {
        data.dicerollTimeout = Date.now();
        data.wallet -= betAmount * 1;
        data.wallet += betAmount * 1;
        await data.save();

        const tieEmbed = new discord.MessageEmbed()
          .setColor("#0155b6")
          .setTitle(`__${user.username}'s Diceroll__`)
          .setDescription(
            `**${user.username}** it's a **tie**, and you got all your coins back`
          )
          .addField(
            "Your Wallet Balance",
            `${data.wallet.toLocaleString()}`,
            true
          )
          .addField("")
          .setTimestamp();

        message.reply({
          embeds: [tieEmbed],
        });
      } else if (userTotal > botTotal) {
        let winAmount = betAmount * 2;

        data.dicerollTimeout = Date.now();
        data.wallet -= betAmount * 1;
        data.wallet += winAmount * 1;
        await data.save();

        const winEmbed = new discord.MessageEmbed()
          .setColor("#0155b6")
          .setTitle(`__${user.username}'s Diceroll__`)
          .setDescription(
            `**${user.username}** you **won**, and you got double of your coins\n\nYou rolled **${userChoice1}** and **${userChoice2}**\nI rolled **${botChoice1}** and **${botChoice2}**`
          )
          .addField("Your Wallet Balance", `${data.wallet.toLocaleString()}`)
          .setTimestamp();

        message.reply({
          embeds: [winEmbed],
        });
      } else if (botTotal > userTotal) {
        let loseAmount = betAmount * 1;

        data.dicerollTimeout = Date.now();
        data.wallet -= loseAmount * 1;
        await data.save();

        const loseEmbed = new discord.MessageEmbed()
          .setColor("#0155b6")
          .setTitle(`__${user.username}'s Diceroll__`)
          .setDescription(
            `**${user.username}** you **lost**, and you lost all of your coins\n\nYou rolled **${userChoice1}** and **${userChoice2}**\nI rolled **${botChoice1}** and **${botChoice2}**`
          )
          .addField("Your Wallet Balance", `${data.wallet.toLocaleString()}`)
          .setTimestamp();

        message.reply({
          embeds: [loseEmbed],
        });
      }
    }
  }
};

module.exports.config = {
  name: "diceroll",
  aliases: ["dice"],
};
