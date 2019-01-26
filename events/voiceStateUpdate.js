const voiceChannelData = require("../modules/data.js").voiceChannelData;
const voiceChannelConnected = require("../modules/data.js").voiceChannelConnected;
module.exports = async (bot, oldMember, newMember) => {
    if(newMember.guild.id === "522979850651435008") {
        let regex = /\d+/;
        if(regex.test(newMember.voiceChannelID)) {
            let newVoiceChannelConnected = new voiceChannelConnected({
                user_ID: `${newMember.id}`,
                connectDate: Date.now()
            });
            newVoiceChannelConnected.save()
                .catch(e => console.log(e))

        }else {
            voiceChannelConnected.find({user_ID: newMember.id}, (err, data) => {
                if(data.length > 0) {
                    let currentDate = Date.now();
                    let connectDate = data[0].connectDate;
                    let timeSpentInVC = currentDate - connectDate;

                    voiceChannelData.findOneAndUpdate({"channel_ID": oldMember.voiceChannelID}, {$inc: {timeSpent: timeSpentInVC}}, {new:true}, (err) => {
                        if(err) console.log(err)
                        voiceChannelConnected.deleteMany( { user_ID: oldMember.id }, (err) => {
                            if(err) console.log(err)
                        })
                    })
                }
            });

        }
    }
};