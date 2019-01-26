const voiceChannelData = require("../modules/data.js").voiceChannelData;
const channelData = require("../modules/data.js").channelData;
module.exports = async (bot, channel) => {
    if(channel.type === "text") {
        channelData.findOneAndDelete({channel_ID: channel.id}, {}, (err, data) => {
            console.log(data)
        })
    }else if(channel.type === "voice") {
        voiceChannelData.findOneAndDelete({channel_ID: channel.id}, {}, (err, data) => {
            console.log(data)
        })
    }
};