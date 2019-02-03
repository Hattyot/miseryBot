const Discord = require('discord.js');
const Jimp = require("jimp");
module.exports = async (bot, member) => {
    let guild = member.guild
    if (guild.id !== "522979850651435008") return;

    Jimp.read("https://cdn.glitch.com/f95d51d0-e705-417b-a9c8-47bb29dd12cb%2Fwelcomer.png?1536011031764").then((image) => {
        Jimp.read(guild.members.get(member.id).avatarURL).then(ima => {
            ima.resize(420, 420);
            Jimp.read('https://streamshark.io/obs-guide/img/image-mask.png').then((mask1) => {
                mask1.resize(420, 420);
                ima.mask(mask1, 0, 0);
                image.composite(ima, 152, 222);
                Jimp.loadFont(Jimp.FONT_SANS_128_WHITE).then(function (font) {
                    let text1 = "Welcome " + guild.members.get(member.id).tag + "!";
                    let text2 = "Now We Have: " + member.guild.memberCount + " Members.";
                    image.print(font, 680, 280, text1);
                    image.print(font, 680, 410, text2);
                    image.write('welcome.png', () => {
                        guild.channels.get("536532064070270986").send({
                            files: [
                                "welcome.png"
                            ]
                        }).catch((err) => console.log(err));
                    });
                });
            })
        });
    })
};