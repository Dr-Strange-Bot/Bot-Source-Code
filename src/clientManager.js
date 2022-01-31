const config = require("../config.json");
const discord = require("discord.js");
const EventHandler = require("./utils/loadEvents");

module.exports = class ClientManager extends discord.Client {
  constructor(options) {
    super(options);
    this.commands = new discord.Collection();
    this.aliases = new discord.Collection();
  }

  setup() {
    this.events = new EventHandler(this);
    this.events.init();
    require("./utils/loadCommands")(this);
    this.login(config.bot_token);
  }
};
