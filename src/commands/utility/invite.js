const discord = require("discord.js");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  const inviteButton = new discord.MessageButton()
    .setLabel("Invite Me")
    .setStyle("LINK")
    .setURL(
      "https://discord.com/api/oauth2/authorize?client_id=935229681718952008&permissions=8&scope=bot%20applications.commands"
    );

  const row = new discord.MessageActionRow().addComponents(inviteButton);

  message.reply({
    content: "Click the below button to invite me to your server",
    components: [row],
  });
};

module.exports.config = {
  name: "invite",
  aliases: ["drstrangeinvite"],
};
