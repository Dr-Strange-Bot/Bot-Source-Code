const schema = require("../../schemas/currencySchema");
const discord = require("discord.js");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  let permission = message.member.permissions.has("ADMINISTRATOR");
  let user = message.mentions.users.first();
  let amount = args[1];

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
  } catch (err) {}

  if (!permission) {
    const errEmbed = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "You don't have the permission to use this command.\nRequired Permission: **ADMINISTRATOR**"
      );

    message.reply({
      embeds: [errEmbed],
    });
  } else if (!user) {
    const errEmbed2 = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Please mention a user to remove coins from their wallet.\nCorrect Usage: **>removecoins [user] [amount]**"
      );

    message.reply({
      embeds: [errEmbed2],
    });
  } else if (!amount) {
    const errEmbed3 = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Please enter the removal amount.\nCorrect Usage: **>removecoins [user] [amount]**"
      );

    message.reply({
      embeds: [errEmbed3],
    });
  } else if (isNaN(amount)) {
    const errEmbed4 = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription("Removal amount must be a real number.");

    message.reply({
      embeds: [errEmbed4],
    });
  } else if (amount > data.wallet) {
    const errEmbed5 = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "This user doesn't have that much coins in their wallet."
      );

    message.reply({
      embeds: [errEmbed5],
    });
  } else {
    data.wallet -= amount * 1;
    await data.save();

    const removecoinsEmbed = new discord.MessageEmbed()
      .setColor("#0155b6")
      .setDescription(
        `Successfully removed **:coin: ${amount.toLocaleString()}** from ${user}'s wallet`
      );

    message.reply({
      embeds: [removecoinsEmbed],
    });
  }
};

module.exports.config = {
  name: "removecoins",
  aliases: ["removebalance"],
};
