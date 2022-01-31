const config = require("./config.json");
const ClientManager = require("./src/clientManager");
const mongoose = require("mongoose");

const client = new ClientManager({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: 32767,
  disableMentions: "everyone",
});

client.setup();

mongoose
  .connect(config.mongodb_connection_srv)
  .then(() => {
    console.log("Connected to the MongoDB Database successfully");
  })
  .catch((err) => {
    console.log(err);
  });
