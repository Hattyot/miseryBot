const mongoose = require("mongoose");

channelDataSchema = mongoose.Schema({
    channel_ID: String,
    messageAmount: Number
});

voiceChannelDataSchema = mongoose.Schema({
    channel_ID: String,
    timeSpent: Number
});

voiceChannelConnectedSchema = mongoose.Schema({
    user_ID: String,
    connectDate: Number
});

module.exports = {
    channelData: mongoose.model("channelData", channelDataSchema),
    voiceChannelData: mongoose.model("voiceChannelData", voiceChannelDataSchema),
    voiceChannelConnected: mongoose.model("voiceChannelConnected", voiceChannelConnectedSchema)
};