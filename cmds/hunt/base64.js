module.exports.run = async (bot, message, args) => {
    message.member.send("It's base64")
    message.delete()
};

module.exports.help = {
    name: "JW9wZW4=",
    cat: "Hunt",
};

module.exports.conf = {
    enabled: true,
    aliases: [],
};