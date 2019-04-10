const Jimp = require('jimp');
const replaceColor = require('replace-color')
module.exports.run = async (bot, message, args) => {

let targetColor = args[0]
let replaceColorHex = args[1]
replaceColor({
  image: message.author.displayAvatarURL,
  colors: {
    type: 'hex',
    targetColor: targetColor,
    replaceColor: replaceColorHex
  },
  deltaE: 10
})
  .then((jimpObject) => {
    jimpObject.getBuffer(Jimp.MIME_PNG, (error, buffer) => {
              message.channel.send({files: [{ name: 'gay.png', attachment: buffer }] });
            });
  })

}

module.exports.help = {
  name: "replaceColor",
  cat: "Dev",
  description: "Applies gay pride flag filter over image",
  usage: `gaymagik (source)`,
  examples: [`gay`, `gay https://i.imgur.com/UdZQHBJ.jpg`, `gay @Hattyot`]
}

module.exports.conf = {
  enabled: true,
  aliases: [],
  cooldown: "3 Seconds",
};
