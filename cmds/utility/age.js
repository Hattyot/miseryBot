const embedMaker = require('../../modules/embed.js')
const Jimp = require("jimp");
module.exports.run = async (bot, message, args) => {
    let member = message.member
    let potatoRole = message.guild.roles.get("530717627690123267")
    if(member.roles.has(potatoRole.id)) return

    let memberAge = Math.floor(args[0])
    console.log(memberAge)
    if(!memberAge) return embedMaker.command(message)

    if(memberAge < 13) {
        return member.send(`Sorry, but discord is 13+ and we are required to ban you`).then(() => {
            member.ban({reason: 'He needed to go' })
        })
    }else if(memberAge >= 18) {
        let adultRole = message.guild.roles.get(`530678409706209291`)
        member.addRole(adultRole)
    }
    member.addRole(potatoRole)
    message.delete()

    let guild = message.guild;
    let welcomeChannel = bot.config[guild.id].welcomeChannel;
    let welcomeTexts = [
        "Enjoy Your Stay!",
        "Welcome To Hell!",
        "We Expected You",
        "One Of Us!",
        "M'Lady",
        "Don't Advertise MLMs",
        "Don't Be A Hater",
        "Challenger Approaches",
        "Ha GAYYYYYY!!",
        "This Person Is Cool",
        "Heyyyyyyyyyy",
        "Run While You Can!"
    ];
    if (guild.id !== "522979850651435008") return;
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
                            let memberCount = ordinal(guild.memberCount);

                            if(hasSpecialChar(name)) name = "Special Name"

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

    function ordinal(number) {
        var cent = number % 100
        if (cent >= 10 && cent <= 20) return `${number}th!`
        var dec = number % 10
        if (dec === 1) return `${number}st!`
        if (dec === 2) return `${number}nd!`
        if (dec === 3) return `${number}rd!`
        return `${number}th!`
    }

    function hasSpecialChar(str) {
        for (var i = 0, n = str.length; i < n; i++) {
            if (str.charCodeAt( i ) > 255) { return true; }
        }
        return false;
    }
}

module.exports.help = {
    name: "age",
    cat: "Join",
    description: "State your age before you can join",
    usage: `age [your age]`,
    examples: [`age 18`]
}

module.exports.conf = {
    enabled: true,
    aliases: []
  };