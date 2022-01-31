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
  let userChoice = args[1];
  let choices = ["rock", "paper", "scissors"];
  let botChoice = choices[Math.floor(Math.random() * choices.length)];

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

  if (timeout - (Date.now() - data.rpsTimeout) > 0) {
    let timeLeft = ms(timeout - (Date.now() - data.rpsTimeout));

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
          "Please enter a bet amount to play rock paper scissors.\nCorrect Usage: **>rps [bet amount] [your choice]**"
        );

      message.reply({
        embeds: [errEmbed],
      });
    } else if (!userChoice) {
      const errEmbed2 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(
          "Please enter your choice to play rock paper scissors.\nCorrect Usage: **>rps [bet amount] [your choice]**"
        );

      message.reply({
        embeds: [errEmbed2],
      });
    } else if (betAmount > 100000 || betAmount < 100) {
      const errEmbed3 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(
          "Minimum bet amount is **100**\nMaximum bet amount is **1,00,000**"
        );

      message.reply({
        embeds: [errEmbed3],
      });
    } else if (isNaN(betAmount)) {
      const errEmbed4 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription("Bet amount must be a real number.");

      message.reply({
        embeds: [errEmbed4],
      });
    } else if (betAmount > data.wallet) {
      const errEmbed4 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(
          "You do not have that much coins in your wallet to play rock paper scissors."
        );

      message.reply({
        embeds: [errEmbed4],
      });
    } else {
      if (userChoice === botChoice) {
        data.rpsTimeout = Date.now();
        data.wallet -= betAmount * 1;
        data.wallet += betAmount * 1;
        await data.save();

        const tieEmbed = new discord.MessageEmbed()
          .setColor("#0155b6")
          .setTitle(`__${user.username}'s Rock Paper Scissors__`)
          .setDescription(
            `**${user.username}** it's a **tie**, and you got all your coins back`
          )
          .addField("Your Wallet Balance", `${data.wallet.toLocaleString()}`)
          .setTimestamp();

        message.reply({
          embeds: [tieEmbed],
        });
      } else if (userChoice === "rock" && botChoice === "scissors") {
        let winAmount1 = betAmount * 2;

        data.dicerollTimeout = Date.now();
        data.wallet -= betAmount * 1;
        data.wallet += winAmount1 * 1;
        await data.save();

        const winEmbed1 = new discord.MessageEmbed()
          .setColor("#0155b6")
          .setTitle(`__${user.username}'s Rock Paper Scissors__`)
          .setDescription(
            `**${user.username}** you **won**, and you got double of your coins`
          )
          .addField("Your Wallet Balance", `${data.wallet.toLocaleString()}`)
          .setTimestamp();

        message.reply({
          embeds: [winEmbed1],
        });
      } else if (userChoice === "scissors" && botChoice === "paper") {
        let winAmount2 = betAmount * 2;

        data.dicerollTimeout = Date.now();
        data.wallet -= betAmount * 1;
        data.wallet += winAmount2 * 1;
        await data.save();

        const winEmbed2 = new discord.MessageEmbed()
          .setColor("#0155b6")
          .setTitle(`__${user.username}'s Rock Paper Scissors__`)
          .setDescription(
            `**${user.username}** you **won**, and you got double of your coins`
          )
          .addField("Your Wallet Balance", `${data.wallet.toLocaleString()}`)
          .setTimestamp();

        message.reply({
          embeds: [winEmbed2],
        });
      } else if (userChoice === "paper" && botChoice === "rock") {
        let winAmount3 = betAmount * 2;

        data.dicerollTimeout = Date.now();
        data.wallet -= betAmount * 1;
        data.wallet += winAmount3 * 1;
        await data.save();

        const winEmbed3 = new discord.MessageEmbed()
          .setColor("#0155b6")
          .setTitle(`__${user.username}'s Rock Paper Scissors__`)
          .setDescription(
            `**${user.username}** you **won**, and you got double of your coins`
          )
          .addField("Your Wallet Balance", `${data.wallet.toLocaleString()}`)
          .setTimestamp();

        message.reply({
          embeds: [winEmbed3],
        });
      } else {
        let loseAmount = betAmount * 1;

        data.rpsTimeout = Date.now();
        data.wallet -= loseAmount * 1;
        await data.save();

        const loseEmbed = new discord.MessageEmbed()
          .setColor("#0155b6")
          .setTitle(`__${user.username}'s Diceroll Rock Paper Scissors__`)
          .setDescription(
            `**${user.username}** you **lost**, and you lost all of your coins`
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
  name: "rps",
  aliases: ["rockpaperscissors"],
};
