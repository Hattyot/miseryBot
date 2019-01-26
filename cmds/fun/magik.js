const Jimp = require('jimp')
module.exports.run = async (bot, message, args) => {
    var user = message.mentions.users.first();
    if(!user) {
        var user = message.author
    }
    var img = user.displayAvatarURL
    if(args[0]) {
        if(args[0].startsWith("http")){
            var img = args[0]
        }
    }
    Jimp.read(`https://discord.services/api/magik?url=${img}`).then(function(image) {
        image.resize(768,768)
        image.getBuffer(Jimp.MIME_PNG, (error, buffer) => {
            if(error) {
                message.channel.send("error fam")
            }
            message.channel.send({files: [{ name: 'magik.png', attachment: buffer }] });
        });
    });


}

module.exports.help = {
    name: "magik",
    category: "Fun"
}

module.exports.conf = {
    enabled: true,
    aliases: [],
  };