const Jimp = require('jimp');
module.exports.run = async (bot, message, args) => {
    let user = message.mentions.users.first();
    if(!user) user = message.author

    let linkRegex = /(https?:\/\/.*\.(?:png|jpg|gif|jpeg))/gi
    let imageURL
    linkRegex.exec(args[0]) ? imageURL = args[0] : imageURL = user.displayAvatarURL

    Jimp.read(imageURL).then((image) => {
        image.resize(768, 768).greyscale()
        image.getBuffer(Jimp.MIME_PNG, (error, buffer) => {
            message.channel.send({files: [{ name: 'greyscale.png', attachment: buffer }] });
        });
    });
}

module.exports.help = {
  name: "greyscale",
  cat: "Image",
  description: "Applies a greyscale effect on an image",
  usage: `greyscale (source)`,
  examples: [`greyscale`, `greyscale https://i.imgur.com/UdZQHBJ.jpg`, `greyscale @Hattyot`]
}

module.exports.conf = {
  enabled: true,
  aliases: [],
  cooldown: "3 Seconds",
};