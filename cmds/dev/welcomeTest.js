const Discord = require('discord.js');
const Jimp = require("jimp");
module.exports.run = async (bot, message, args) => {
    let guild = message.guild
    let member = message.member
    let welcomeChannel = "524064741543641108"
    if (guild.id !== "522979850651435008") return;
    if (guild.id !== "522979850651435008") return;
    member.send(`Welcome to Misery's Box <@${member.id}>! Please read the rules in #rules-and-info. If you have any questions, feel free to ask a staff member`)
    Jimp.read("https://user-images.githubusercontent.com/39061940/52178067-699ca600-27d2-11e9-80bf-e5ceae9534fe.png").then((mainImage) => {
        Jimp.read(member.user.displayAvatarURL).then(userAvatar => {
            userAvatar.resize(537, 537);
            Jimp.read('https://i.imgur.com/n8NpV2F.png').then((mask1) => {
                mask1.resize(537, 537);
                userAvatar.mask(mask1, 0, 0);
                mainImage.composite(userAvatar, 85, 160);
                Jimp.loadFont("./images/FONT.fnt").then((font) => {
                    Jimp.loadFont("./images/FONT1.fnt").then((font1) => {
                        Jimp.loadFont("./images/FONT2.fnt").then((font2) => {
                            Jimp.loadFont("./images/FONT3.fnt").then((font3) => {
                                let text = "Enjoy Your Stay!"
                                let text1 = member.user.username
                                let text2 = member.user.discriminator
                                let text3 = getText3(member.guild)

                                mainImage.print(font1, 630, 645, text);
                                mainImage.print(font1, 690, 277, text1);
                                mainImage.print(font2, 788, 438, text2);
                                mainImage.print(font3, 90, 723, text3);
                                mainImage.getBuffer(Jimp.MIME_PNG, (error, buffer) => {
                                    if (error) return console.log(error)
                                    return guild.channels.get("536532064070270986").send({
                                        files: [{
                                            name: 'welcome.png',
                                            attachment: buffer
                                        }]
                                    })
                                })
                            })
                        })
                    });
                })
            })
        });
    })

    function getText3(guild) {
        let text3 = `${guild.memberCount}`
        switch (text3[text3.length-1]) {
            case "1":
                text3 += "st member!"
                break
            case "2":
                text3 += "nd member!"
                break
            case "3":
                text3 += "rd member!"
                break
            default:
                text3 += "th member!"
                break
        }
        return text3
    }
};

module.exports.help = {
    name: "welcomeTest",
    cat: "Dev",
    description: "",
    usage: "",
    examples: [""]
};

module.exports.conf = {
    enabled: true,
    aliases: [],
};