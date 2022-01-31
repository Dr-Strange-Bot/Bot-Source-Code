const discord = require("discord.js");
const ultrax = require("ultrax");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

module.exports.run = async (client, message, args) => {
  const topic = args[0];

  const helpEmbed = new discord.MessageEmbed()
    .setColor("0155b6")
    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
    .setTitle("Hello, It's Dr Strange for your service...")
    .setDescription("Here you get information of all my commands")
    .addField("Moderation", "`>help moderation`", true)
    .addField("Economy", "`>help economy`", true)
    .addField("Eco-Mod", "`>help ecomod`", true)
    .addField("Gambling", "`>help gambling`", true)
    .addField("Fun", "`>help fun`", true)
    .addField("Mini Games", "`>help minigames`", true)
    .addField("Search", "`>help search`", true)
    .addField("Information", "`>help info`", true)
    .addField("Utility", "`>help utility`", true)
    .setFooter({
      text: "Use > prefix before every command of mine",
    });

  const moderationEmbed1 = new discord.MessageEmbed()
    .setColor("0155b6")
    .setTitle("Moderation commands")
    .setDescription(
      "• `>kick [user] [reason]` - Kick a user\n• `>ban [user] [reason]` - Ban a user\n• `>softban [user] [days] [reason]` - Ban a user temporarily\n• `>unban [userid] [reason]` - Unban a user\n• `>timeout [user] [duration] [reason]` - Timeout a user"
    )
    .setFooter({
      text: "Use > prefix before every command of mine",
    });

  const moderationEmbed2 = new discord.MessageEmbed()
    .setColor("0155b6")
    .setTitle("Moderation commands")
    .setDescription(
      "• `>slowmode [duration]` - Set slowmode for a channel\n• `>purge [amount]` - Delete messages in a channel\n• `>nickname [user] [nickname]` - Set a nickname for a user"
    )
    .setFooter({
      text: "Use > prefix before every command of mine",
    });

  const economyEmbed1 = new discord.MessageEmbed()
    .setColor("0155b6")
    .setTitle("Economy commands")
    .setDescription(
      "• `>balance [user]` - Shows your balance\n• `>deposit [amount]` - Deposit your coins in your bank\n• `>withdraw [amount]` - Withdraw your coins from your bank\n• `>beg` - Beg for some coins\n• `>work` - Work for some coins"
    )
    .setFooter({
      text: "Use > prefix before every command of mine",
    });

  const economyEmbed2 = new discord.MessageEmbed()
    .setColor("0155b6")
    .setTitle("Economy commands")
    .setDescription(
      "• `>search` - Search for some coins\n• `>hunt` - Hunt a animal in woods and get some coins\n• `>fish` - Do some fishing and get some coins\n• `>dig` - Dig the ground for some coins\n• `>chopwood` - Chop some wood in the forest and get some coins"
    )
    .setFooter({
      text: "Use > prefix before every command of mine",
    });

  const economyEmbed3 = new discord.MessageEmbed()
    .setColor("0155b6")
    .setTitle("Economy commands")
    .setDescription(
      "• `>postmeme` - Post a meme and get some coins\n• `>daily` - Claim your daily reward\n• `>weekly` - Claim your weekly reward\n• `>monthly` - Claim your monthly reward\n• `>yearly` - Claim your yearly reward"
    )
    .setFooter({
      text: "Use > prefix before every command of mine",
    });

  const economyEmbed4 = new discord.MessageEmbed()
    .setColor("0155b6")
    .setTitle("Economy commands")
    .setDescription(
      "• `>donated` - This command is only for donators who donated me through Patreon, if you want to use this command then donate me using the **>donate** command"
    )
    .setFooter({
      text: "Use > prefix before every command of mine",
    });

  const ecomodEmbed1 = new discord.MessageEmbed()
    .setColor("0155b6")
    .setTitle("Eco-Mod commands")
    .setDescription(
      "• `>addcoins [amount]` - Add coins into a user's wallet\n• `>removecoins [amount]` - Remove coins from a user's wallet"
    )
    .setFooter({
      text: "Use > prefix before every command of mine",
    });

  const gamblingEmbed1 = new discord.MessageEmbed()
    .setColor("0155b6")
    .setTitle("Gambling commands")
    .setDescription(
      "• `>diceroll [bet amount]` - Dice the roll and get a chance to double your money\n• `>rps [bet amount] [choice]` - Play Rock, Paper, Scissors and get a chance to double your money"
    )
    .setFooter({
      text: "Use > prefix before every command of mine",
    });

  const funEmbed1 = new discord.MessageEmbed()
    .setColor("0155b6")
    .setTitle("Fun commands")
    .setDescription(
      "• `>dadjoke` - Get a random dad joke\n• `>chucknorris` - Get a random chucknorris joke\n• `>meme` - Get a random meme from Reddit\n• `>shuffle` - Shuffle the order of your content\n• `>reverse` - Reverse the order of your content"
    )
    .setFooter({
      text: "Use > prefix before every command of mine",
    });

  const funEmbed2 = new discord.MessageEmbed()
    .setColor("0155b6")
    .setTitle("Fun commands")
    .setDescription("• `>howgay [user]` - Shows the gay percentage of a user")
    .setFooter({
      text: "Use > prefix before every command of mine",
    });

  const minigamesEmbed1 = new discord.MessageEmbed()
    .setColor("0155b6")
    .setTitle("Mini Games commands")
    .setDescription(
      "• `>snake` - Play the famous snake game in Discord\n• `>fasttype` - Play the Fast Typing game in Discord"
    )
    .setFooter({
      text: "Use > prefix before every command of mine",
    });

  const searchEmbed1 = new discord.MessageEmbed()
    .setColor("0155b6")
    .setTitle("Search commands")
    .setDescription(
      "• `>youtube [query]` - Search for a video on YouTube\n• `>wiki [query]` - Search for information on Wikipedia"
    )
    .setFooter({
      text: "Use > prefix before every command of mine",
    });

  const informationEmbed1 = new discord.MessageEmbed()
    .setColor("0155b6")
    .setTitle("Information commands")
    .setDescription(
      "• `>botinfo` - Gives a little information about myself\n• `>ytstats [channel name]` - Get the stats of a channel on YouTube\n• `>avatar [user]` - Get the avatar of a user\n• `>membercount` - Shows the membercount of the server"
    )
    .setFooter({
      text: "Use > prefix before every command of mine",
    });

  const utilityEmbed1 = new discord.MessageEmbed()
    .setColor("0155b6")
    .setTitle("Utility commands")
    .setDescription(
      "• `>ping` - Shows my latency, API latency and my uptime\n• `>invite` - Invite me to your server\n• `>donate` - Donate to get extra perks\n• `>website` - View my website"
    )
    .setFooter({
      text: "Use > prefix before every command of mine",
    });

  const buttonBack = new discord.MessageButton()
    .setStyle("PRIMARY")
    .setEmoji("⬅️");

  const buttonForward = new discord.MessageButton()
    .setStyle("PRIMARY")
    .setEmoji("➡️");

  if (!topic || topic.toLowerCase() === "modules") {
    message.reply({
      embeds: [helpEmbed],
    });
  } else if (topic.toLowerCase() === "moderation") {
    await ultrax.ButtonPaginator(
      message,
      [moderationEmbed1, moderationEmbed2],
      [buttonBack, buttonForward]
    );
  } else if (topic.toLowerCase() === "economy") {
    await ultrax.ButtonPaginator(
      message,
      [economyEmbed1, economyEmbed2, economyEmbed3, economyEmbed4],
      [buttonBack, buttonForward]
    );
  } else if (topic.toLowerCase() === "ecomod") {
    message.reply({
      embeds: [ecomodEmbed1],
    });
  } else if (topic.toLowerCase() === "gambling") {
    message.reply({
      embeds: [gamblingEmbed1],
    });
  } else if (topic.toLowerCase() === "fun") {
    await ultrax.ButtonPaginator(
      message,
      [funEmbed1, funEmbed2],
      [buttonBack, buttonForward]
    );
  } else if (topic.toLowerCase() === "minigames") {
    message.reply({
      embeds: [minigamesEmbed1],
    });
  } else if (topic.toLowerCase() === "search") {
    message.reply({
      embeds: [searchEmbed1],
    });
  } else if (topic.toLowerCase() === "info") {
    message.reply({
      embeds: [informationEmbed1],
    });
  } else if (topic.toLowerCase() === "utility") {
    message.reply({
      embeds: [utilityEmbed1],
    });
  }
};

module.exports.config = {
  name: "help",
  aliases: ["commands", "commandshelp"],
};
