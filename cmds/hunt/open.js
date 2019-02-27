module.exports.run = async (bot, message, args) => {
    let channel = message.guild.channels.get("550407080062877716")
    let user = message.author
    message.delete()
    channel.overwritePermissions(user, {
        READ_MESSAGES: true,
        SEND_MESSAGES: false
    })
    
};

module.exports.help = {
    name: "open",
    cat: "Hunt",
    description: "Opens Secret Channel",
    usage: "dog",
    examples: ["dog"]
};

module.exports.conf = {
    enabled: true,
    aliases: [],
};