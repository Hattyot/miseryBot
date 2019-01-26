const voiceChannelData = require("../modules/data.js").voiceChannelData;
const channelData = require("../modules/data.js").channelData;
module.exports = async (bot, channel) => {
    if(channel.type === "text") {
        let newChannelData = new channelData({
            channel_ID: `${channel.id}`,
            messageAmount: 0
        });
        newChannelData.save()
            .then(r => console.log(r))
            .catch(e => console.log(e))
    }else if(channel.type === "voice") {
        let newVoiceChannelData = new voiceChannelData({
            channel_ID: `${channel.id}`,
            timeSpent: 0
        });
        newVoiceChannelData.save()
            .then(r => console.log(r))
            .catch(e => console.log(e))
    }
};