const Discord = require('discord.js');
const Jimp = require("jimp");
module.exports.run = async (bot, message, args) => {
    let member = message.member
    let guild = member.guild;
    let welcomeChannel = "536532064070270986";
    let welcomeMessage = `Welcome to Misery's Box <@${member.id}>! Please read the rules in <#524064741543641108>. If you have any questions, feel free to ask a staff member`;
    let welcomeTexts = [
        "Enjoy Your Stay!",
        "Welcome To Hell!",
        "We Expected You",
        "One Of Us!",
        "Don't Shoot!",
        "Don't Advertise MLMs",
        "( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)",
        "Challenger Approaches",
        "Ha GAYYYYYY!!",
        "This Person Is Cool",
        "Heyyyyyyyyyy",
        "Run While You Can!"
    ];
    if (guild.id !== "522979850651435008") return;
    member.send(welcomeMessage);
    Jimp.read("https://user-images.githubusercontent.com/39061940/52178067-699ca600-27d2-11e9-80bf-e5ceae9534fe.png").then((mainImage) => {
        Jimp.read(member.user.displayAvatarURL).then(userAvatar => {
            userAvatar.resize(537, 537);
            Jimp.read('https://i.imgur.com/n8NpV2F.png').then((mask1) => {
                mask1.resize(537, 537);
                userAvatar.mask(mask1, 0, 0);
                mainImage.composite(userAvatar, 85, 160);
                Jimp.loadFont("./images/FONT1.fnt").then((font1) => {
                    Jimp.loadFont("./images/FONT2.fnt").then((font2) => {
                        Jimp.loadFont("./images/FONT3.fnt").then((font3) => {
                            let welcomeText = welcomeTexts[Math.floor(Math.random() * welcomeTexts.length)];
                            let name = member.user.username;
                            let discriminator = member.user.discriminator;
                            let memberCount = getText3(member.guild);
                            let specialCharactersRemoved = removeSpecialCharacters(name)

                            if(specialCharactersRemoved) {
                                name = specialCharactersRemoved
                            }else {
                                name = "Special Name"
                            }
                            mainImage.print(font1, 630, 653, welcomeText);
                            mainImage.print(font1, 693, 283, name);
                            mainImage.print(font2, 793, 440, discriminator);
                            mainImage.print(font3, 90, 710, memberCount);
                            mainImage.getBuffer(Jimp.MIME_PNG, (error, buffer) => {
                                if (error) return console.log(error);
                                return guild.channels.get(welcomeChannel).send({
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
        });
    });
    function getText3(guild) {
        let text3 = `${guild.memberCount}`;
        switch (text3[text3.length - 1]) {
            case "1":
                text3 += "st";
                break;
            case "2":
                text3 += "nd";
                break;
            case "3":
                text3 += "rd";
                break;
            default:
                text3 += "th";
                break
        }
        return text3
    }
    function removeSpecialCharacters(str) {
        let letters = str.split("")
        for (let i = 0; i < letters.length; i++) {
            if(!letters[i]) continue
            if (letters[i].charCodeAt(0) > 255) {
                letters.splice(i, 1)
            }
        }
        if(letters.length > 0) {
            return letters.join("")
        }
        return false;
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