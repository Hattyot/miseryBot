module.exports = async (bot, oldMember, newMember) => {
    if(newMember.guild.id === "522979850651435008") {
        if(newMember.voiceChannelID) {
            let role = newMember.guild.roles.get("554345816270307329")
            newMember.addRole(role)
        }else if(!newMember.voiceChannelID) {
            let role = newMember.guild.roles.get("554345816270307329")
            newMember.removeRole(role)
        }
    }
}
module.exports.conf = {
    enabled: true,
    aliases: [],
  };