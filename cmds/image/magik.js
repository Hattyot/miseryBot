const Jimp = require('jimp')
module.exports.run = async (bot, message, args) => {
    let user = message.mentions.users.first();
    if(!user) {
        user = message.author
    }
    let img = user.displayAvatarURL;
    if(args[0]) {
        if(args[0].startsWith("http")){
            img = args[0]
        }
    }
    Jimp.read(`https://discord.services/api/magik?url=${img}`).then(function(image) {
        image.resize(768,768);
        image.getBuffer(Jimp.MIME_PNG, (error, buffer) => {
            if(error) {
                message.channel.send("error fam")
            }
            message.channel.send({files: [{ name: 'magik.png', attachment: buffer }] });
        });
    });


};

module.exports.help = {
    name: "magik",
    cat: "Image",
    description: "Give some magik to an image",
    usage: "magik [url]",
    examples: ["magik https://i.imgur.com/ohDKCIO.jpg", "magik @Hattyot"]
};

module.exports.conf = {
    enabled: true,
    aliases: [],
};