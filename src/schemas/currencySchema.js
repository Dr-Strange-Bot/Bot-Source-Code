const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
  },

  guildId: {
    type: String,
    required: true,
  },

  wallet: {
    type: Number,
    default: 1000,
    required: true,
  },

  bank: {
    type: Number,
    default: 0,
    required: true,
  },

  begTimeout: {
    type: Number,
  },

  workTimeout: {
    type: Number,
  },

  searchTimeout: {
    type: Number,
  },

  huntTimeout: {
    type: Number,
  },

  fishTimeout: {
    type: Number,
  },

  digTimeout: {
    type: Number,
  },

  chopwoodTimeout: {
    type: Number,
  },

  postmemeTimeout: {
    type: Number,
  },

  dailyTimeout: {
    type: Number,
  },

  weeklyTimeout: {
    type: Number,
  },

  monthlyTimeout: {
    type: Number,
  },

  yearlyTimeout: {
    type: Number,
  },

  dicerollTimeout: {
    type: Number,
  },

  rpsTimeout: {
    type: Number,
  },

  donatedTimeout: {
    type: Number,
  },
});

module.exports = mongoose.model("currencySchema", schema);
