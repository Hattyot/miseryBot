const Discord = require('discord.js');
const Jimp = require("jimp");
module.exports = async (bot, member) => {
    let guild = member.guild
    let welcomeChannel = "524064741543641108"
    if (guild.id !== "522979850651435008") return;

    Jimp.read("https://cdn.glitch.com/f95d51d0-e705-417b-a9c8-47bb29dd12cb%2Fwelcomer.png?1536011031764").then((mainImage) => {
        Jimp.read(guild.members.get(member.id).avatarURL).then(userAvatar => {
            userAvatar.resize(420, 420);
            Jimp.read('https://streamshark.io/obs-guide/img/image-mask.png').then((mask1) => {
                mask1.resize(420, 420);
                userAvatar.mask(mask1, 0, 0);
                mainImage.composite(userAvatar, 152, 222);
                Jimp.loadFont(Jimp.FONT_SANS_128_WHITE).then((font) => {
                    let text1 = "Welcome " + guild.members.get(member.id).tag + "!";
                    let text2 = "Now We Have: " + member.guild.memberCount + " Members.";
                    mainImage.print(font, 680, 280, text1);
                    mainImage.print(font, 680, 410, text2);
                    mainImage.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
                        return guild.channels.get("536532064070270986").send(`Welcome to Misery's Box <@${member.id}>! Please read the <#${welcomeChannel}> If you have any questions, feel free to ask a staff member`, {files: [{ name: 'welcome.png', attachment: buffer }] })
                    })
                });
            })
        });
    })
};