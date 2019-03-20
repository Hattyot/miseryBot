const Jimp = require('jimp');
module.exports.run = async (bot, message, args) => {
    let user = message.mentions.users.first();
    if(!user) user = message.author

    let linkRegex = /(https?:\/\/.*\.(?:png|jpg|gif|jpeg))/gi
    let imageURL
    linkRegex.exec(args[0]) ? imageURL = args[0] : imageURL = user.displayAvatarURL

    Jimp.read(imageURL).then(function(image) {
        Jimp.read("https://cdn.glitch.com/8c009d94-1f7e-464c-82c2-bccaf15cb6cd%2Fgay.png?1520010590279").then(function(image2) {
            image.resize(768, 768);
            image2.fade(0.6);
            image.composite(image2, 0, 0);
            image.getBuffer(Jimp.MIME_PNG, (error, buffer) => {
              message.channel.send({files: [{ name: 'gay.png', attachment: buffer }] });
            });
      });
    });
}

module.exports.help = {
  name: "gay",
  cat: "Image",
  description: "Applies gay pride flag filter over image",
  usage: `gaymagik (source)`,
  examples: [`gay`, `gay https://i.imgur.com/UdZQHBJ.jpg`, `gay @Hattyot`]
}

module.exports.conf = {
  enabled: true,
  aliases: [],
  cooldown: "3 Seconds",
};