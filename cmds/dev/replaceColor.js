const Jimp = require('jimp');
const replaceColor = require('replace-color')
module.exports.run = async (bot, message, args) => {
  let member = message.mentions.members.first()
  let url
  if(member) {
      url = member.user.displayAvatarURL
  }else {
      if(args[3]) {
          if(/http/i.test(args[3])) url = args[3]
      }else {
          url = message.author.displayAvatarURL
      }
  }
 
let targetColor = args[0]
let replaceColorHex = args[1]

replaceColor({
  image: url,
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
  description: "Replace any color on any image",
  usage: `replaceColor (source)`,
  examples: [`replaceColor`, `replaceColor https://i.imgur.com/UdZQHBJ.jpg`, `replaceColor @Hattyot`]
}

module.exports.conf = {
  enabled: true,
  aliases: [],
  cooldown: "3 Seconds",
};
