const discord = require("discord.js");
/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  const donateEmbed = new discord.MessageEmbed()
    .setColor("0155b6")
    .setDescription(
      "If you want to donate, then you can go to\nhttps://patreon.com/ashutoshswamy\n\nBenefits of donation\nGet access to `>donated` command and get **:coin: 1,00,000** every hour\n\nAfter you donate, DM <@787019465568419871> to add your Discord ID in my donators database"
    )
    .setFooter({
      text: "🤑 Servers are costly nowadays",
    })
    .setTimestamp();

  const row = new discord.MessageActionRow().addComponents(
    new discord.MessageButton()
      .setLabel("Donation Link")
      .setStyle("LINK")
      .setURL("https://patreon.com/ashutoshswamy")
  );

  message.reply({
    embeds: [donateEmbed],
    components: [row],
  });
};

module.exports.config = {
  name: "donate",
  aliases: ["patreon"],
};
