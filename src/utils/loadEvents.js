const fs = require("fs");

class EventHandler {
  constructor(client) {
    this.client = client;
  }

  init() {
    const files = fs
      .readdirSync("./src/events")
      .filter((y) => y.endsWith(".js"));
    for (const file of files) {
      const event = require(`../events/${file}`);
      const name = file.split(".")[0];
      this.client.on(name, event.bind(null, this.client));
    }
  }
}

module.exports = EventHandler;
