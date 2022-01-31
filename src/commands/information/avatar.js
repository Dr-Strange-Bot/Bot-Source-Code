const discord = require("discord.js");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  const user = message.mentions.users.first() || message.author;

  const avatarEmbed = new discord.MessageEmbed()
    .setColor("#0155b6")
    .setAuthor({
      name: `${user.username}'s Avatar`,
      iconURL: `${user.displayAvatarURL({ dynamic: true })}`,
    })
    .setImage(user.displayAvatarURL({ dynamic: true, size: 512 }))
    .setFooter({
      text: "😊 Nice Avatar",
    })
    .setTimestamp();

  const row = new discord.MessageActionRow().addComponents(
    new discord.MessageButton()
      .setLabel("Avatar Link")
      .setStyle("LINK")
      .setURL(user.avatarURL({ dynamic: true, format: "gif", size: 512 }))
  );

  message.reply({
    embeds: [avatarEmbed],
    components: [row],
  });
};

module.exports.config = {
  name: "avatar",
  aliases: ["pfp"],
};
