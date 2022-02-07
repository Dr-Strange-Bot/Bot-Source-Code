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
        guildId: message.guild.id,
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
        "Please mention a user to add coins into their wallet.\nCorrect Usage: **>addcoins [user] [amount]**"
      );

    message.reply({
      embeds: [errEmbed2],
    });
  } else if (!amount) {
    const errEmbed3 = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Please enter the adding amount.\nCorrect Usage: **>addcoins [user] [amount]**"
      );

    message.reply({
      embeds: [errEmbed3],
    });
  } else if (isNaN(amount)) {
    const errEmbed4 = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription("Adding amount must be a real number.");

    message.reply({
      embeds: [errEmbed4],
    });
  } else {
    data.wallet += amount * 1;
    await data.save();

    const addcoinsEmbed = new discord.MessageEmbed()
      .setColor("#0155b6")
      .setDescription(
        `Successfully added **:coin: ${amount.toLocaleString()}** to ${user}'s wallet`
      );

    message.reply({
      embeds: [addcoinsEmbed],
    });
  }
};

module.exports.config = {
  name: "addcoins",
  aliases: ["addbalance"],
};
