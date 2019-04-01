module.exports = async (bot, oldMember, newMember) => {
    let role = newMember.guild.roles.get("554345816270307329")
    
    if(newMember.voiceChannelID) {
        newMember.addRole(role)
    }else if(!newMember.voiceChannelID) {
        newMember.removeRole(role)
    }
}
module.exports.conf = {
    enabled: true,
    aliases: [],
  };