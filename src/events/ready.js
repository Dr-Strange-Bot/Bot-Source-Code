const discord = require("discord.js");

/**
 * @param {discord.Client} client
 */

module.exports = (client) => {
  client.user.setActivity(">help", { type: "LISTENING" });
  console.log(`Logged in as ${client.user.tag}`);
};
