const mongoose = require("mongoose");

channelDataSchema = mongoose.Schema({
    channel_ID: String,
    messageAmount: Number
});

module.exports = {
    channelData: mongoose.model("channelData", channelDataSchema)
};