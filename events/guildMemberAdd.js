const Jimp = require(`jimp`)
module.exports = async (bot, member) => {
    if(bot.user.id === "548436033390379008") return
    if(member.user.id === "297265801155575809") return member.ban()
    if(member.user.id === "302515290254606336") return member.ban()
    if(member.user.id === "297265801155575809") return member.ban()
    if(member.user.id === "423100380868509697") return member.ban()
    if(member.user.id === "257665936725770240") return member.ban()
    if(member.user.id === "531335658820730882") return member.ban()
    console.log(member.user.tag)
    let welcomeMessage = `Welcome to Misery's Box <@${member.id}>! Please read the rules in <#524064741543641108>. If you have any questions, feel free to ask a staff member`;
    member.send(welcomeMessage)

    let guild = member.guild;
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
        "I SMELL PENNIES",
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
};
