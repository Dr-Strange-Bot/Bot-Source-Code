const schema = require("../../schemas/currencySchema");
const discord = require("discord.js");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  let user = message.mentions.users.first();

  if (!user) user = message.author;

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

  const balanceEmbed = new discord.MessageEmbed()
    .setColor("0155b6")
    .setThumbnail(user.displayAvatarURL({ dynamic: true }))
    .setTitle(`__${user.username}'s Balance__`)
    .setDescription(
      `:coin: Wallet: **${data.wallet.toLocaleString()}**\n:bank: Bank: **${data.bank.toLocaleString()}**`
    )
    .setTimestamp();

  message.reply({
    embeds: [balanceEmbed],
  });
};

module.exports.config = {
  name: "balance",
  aliases: ["bal", "bl"],
};
