const schema = require("../../schemas/currencySchema");
const discord = require("discord.js");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  let user = message.author;
  let amount = args[0];

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

  if (!amount) {
    const errEmbed = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Please enter the amount you want to deposit.\nCorrect Usage: **>deposit [amount]**"
      );

    message.reply({
      embeds: [errEmbed],
    });
  } else if (amount < 100) {
    const errEmbed2 = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription("Minimum deposit amount is **100**.");

    message.reply({
      embeds: [errEmbed2],
    });
  } else if (amount > data.wallet) {
    const errEmbed3 = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "You don't have that much of coins in your wallet to deposit."
      );

    message.reply({
      embeds: [errEmbed3],
    });
  } else if (isNaN(amount)) {
    const errEmbed4 = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription("Deposit amount must be a real number.");

    message.reply({
      embeds: [errEmbed4],
    });
  } else {
    data.wallet -= amount * 1;
    data.bank += amount * 1;
    await data.save();

    const depositEmbed = new discord.MessageEmbed()
      .setColor("0155b6")
      .setDescription(
        `Successfully deposited **:coin: ${amount.toLocaleString()}** into your bank`
      )
      .addFields(
        {
          name: "Your Wallet Balance",
          value: `${data.wallet.toLocaleString()}`,
          inline: true,
        },
        {
          name: "Your Bank Balance",
          value: `${data.bank.toLocaleString()}`,
          inline: true,
        }
      );

    message.reply({
      embeds: [depositEmbed],
    });
  }
};

module.exports.config = {
  name: "deposit",
  aliases: ["dep", "depo"],
};
