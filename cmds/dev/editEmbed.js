const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    let guild = bot.guilds.get("522979850651435008");
    let channel = guild.channels.get("524064741543641108");
    function rules() {
        channel.fetchMessage("536196178136662016").then(message => {
            let newEmbed = new Discord.RichEmbed()
                .setThumbnail("https://user-images.githubusercontent.com/39061940/50972501-77bb1780-14ef-11e9-9712-fcacf98014ad.png")
                .setAuthor("(`◕‿◕´)  Welcome to Misery's Box", "https://user-images.githubusercontent.com/39061940/50972668-e304e980-14ef-11e9-817f-cedabcf88313.png")
                .setDescription(`** **\nLet's be a fun, loving and positive community that supports one another regardless of race, religion or social/political views.\n** **`)
                .addField("**1. Be respectful and courteous**", "You don't know what perspective others are coming from. Keep in mind that your experience is not the same as everyone else’s. What may seem obvious to you may not be clear to someone else. If you're making somebody uncomfortable and they ask you to stop, you stop; toxicity and trolling are not tolerated. Do not belittle others that are asking for advice or giving advice.\n** **")
                .addField("**2. No Spamming.**", "Do not spam outside of the memes channel. This includes the excessive use of CAPS and emojis. Make note that most spamming is a mute-able offense and will be dealt with as such.\n** **")
                .addField("**3. Listen to the Staff.**", "Staff members enforce the rules and make sure the community runs smoothly for everyone. As such, we expect you to listen to them. If they give you an instruction - do it, even if it isn’t detailed or specified in the rules.\n** **")
                .addField("**4. No self-promotion or advertising outside the self-promoting channel.**", "If you do feel like advertising of self-promoting do it in #self-promo-stuff.\n** **")
                .addField("**5. Post relevant content in its appropriate channel.**", "Make sure to keep discussion relevant to each channel. This includes not posting random images or videos that clog up the chats and disrupt conversation. If you would really like to post these things in the main channel, be sure it relates to the current conversation. Each channel is designed so people can find discussions on particular topics, it is important that this remains the case. If you are in a voice chat and unable to speak, or wish to post content related to the voice conversation, use #no-mic\n** **")
                .addField("**6. No NSFW content.**", "Period. There are minors on this server.\n** **")
                .addField("**7. No doxxing or exposing of private information of other members.**", "Doxxing members will result in a permanent ban, we do not care about your ex/friend and what he did wrong.")
                .addField("**8. Do not impersonate others or create fake accounts.**", "We reserve the rights to rename, mute and/or remove a user we find to be impersonating at our own discretion.")
                .addField("**9. Do not raid any other servers, ever.**", "If we find out that you plan to raid and/or have raided other communities, we will have to mute or ban you.")
                .addField("**10. Keep controversial topics out of main chats and voice channels**", "When bringing up Subjects to discuss, we are against matters such as heavy illegal drug usage (Cocaine and so on as an example) and we promote Life and Love, so we don't appreciate suicidal subjects in main chats or Voice chats, we have help channels for those in need, or staff on hand who are qualified to handle life matters for the most part.")
                .addField("**11. Don't uselessly ping or dm staff members**", "Unless there's something that immediately requires staff attention, don't ping or dm staff.")
                .addField("**12. Your username or nickname must be pingable**", "If it's not pingable you will be assigned a temporary name.")
                .addField("**13. Do not randomly friend request any staff member without interaction or activity on the server.**", "If you're not friends with the staff memebr or don't have any activity on the server just don't send them a friend request. It's kind of annoying and the request will be denied.")
                .addField("** **", "** **\nModerators can and will enforce these rules as they see fit, even if something isn’t expressly detailed in the above mentioned. If you feel you have been unjustly warned, kicked or banned, please submit a complaint via the form below and the issue will be reviewed by senior staff.")
                .setFooter("Talk to staff if you have any questions about rules or if you find a mistake in them.", "https://user-images.githubusercontent.com/39061940/50972668-e304e980-14ef-11e9-817f-cedabcf88313.png")
                .setColor("#9B59B6");
            message.edit(newEmbed);
        });

    }
    function info() {
        channel.fetchMessage("542032188389195806").then(message => {
            let newEmbed = new Discord.RichEmbed()
            // .setThumbnail("https://user-images.githubusercontent.com/39061940/50972501-77bb1780-14ef-11e9-9712-fcacf98014ad.png")
                .setAuthor("(`◕‿◕´)  Just some extra info", "https://user-images.githubusercontent.com/39061940/50972668-e304e980-14ef-11e9-817f-cedabcf88313.png")
                .addField("**1. Do you want to become a staff member?**", "Fill out this form: https://goo.gl/UhWfJh\n** **")
                .addField("**2. Do you have complaints or compliments for a staff member?**", "Fill out this form: https://goo.gl/wZcW8k\n** **")
                .addField("**3. Do you have a suggestion for the server?**", "Fill out this form: https://goo.gl/VYTgrH\n** **")
                .setFooter("If you have any further questions ask a staff member", "https://user-images.githubusercontent.com/39061940/50972668-e304e980-14ef-11e9-817f-cedabcf88313.png")
                .setColor("#9B59B6");
            message.edit(newEmbed);
        })
    }
    function roles1() {
        channel.fetchMessage("536218716694642689").then(message => {
            let newEmbed = new Discord.RichEmbed()
                .setThumbnail("https://user-images.githubusercontent.com/39061940/50972501-77bb1780-14ef-11e9-9712-fcacf98014ad.png")
                .setAuthor("(`◕‿◕´)  Staff Roles", "https://user-images.githubusercontent.com/39061940/50972668-e304e980-14ef-11e9-817f-cedabcf88313.png")
                .addField("**1. Misery Box** :pig: :package:", "Mr. Misery Box himself, Reducing misery by zero point zero!\n** **")
                .addField("**2. Admin Box** :muscle:", "Dedicated, highly experienced individuals that are the brains behind the channel. The Admin Box keeps the server running & resolve super sensitive situations. Basically, Misery's right hand.\n** **")
                .addField("**3. Mod Box** :100:", "Appointed by Admins or Misery, they decide who become Mods. Mods help Admins resolve any large issues the server may face. Mods appoint Helpers. Mods communicate closely with the community to gather feedback on what changes may improve the server experience for all.\nAs a Mod, expect to notify Admins about questionable situations or issues that arise, such as handing out mutes to people spamming, harassing, trolling, etc.\n** **")
                .addField("**4. Help Box** :angel:", "The 1st step in becoming a Mod in the server is being entered into this role as a test trial, to see if it's a good fit.\nHelpers are in charge of keeping a light-hearted ambience within the server by welcoming new members, reporting to Admins or Mods of any wrong-doings, negative hate/trolling, arguments between members and to be helpful to those who are new to Discord that need extra help figuring things out.\n** **")
                .addField("**5. YouTuber Box** :movie_camera:", "For YouTuber peeps, you need at minimum 1000 subs to get this role\n** **")
                .addField("**6. Art Box** :paintbrush:", "For all the great artists on this server, if you're an artist ask a mod or admin for the role\n** **")
                .setFooter("These are all the current staff roles, this list might change later.", "https://user-images.githubusercontent.com/39061940/50972668-e304e980-14ef-11e9-817f-cedabcf88313.png")
                .setColor("#9B59B6");
            message.edit(newEmbed);
        })
    }
    function roles2() {
        channel.fetchMessage("536218737494458371").then(message => {
            let newEmbed = new Discord.RichEmbed()
                .setThumbnail("https://user-images.githubusercontent.com/39061940/50972501-77bb1780-14ef-11e9-9712-fcacf98014ad.png")
                .setAuthor("(`◕‿◕´)  Level Roles", "https://user-images.githubusercontent.com/39061940/50972668-e304e980-14ef-11e9-817f-cedabcf88313.png")
                .addField("**1. Cheerful Box** :smile: ", "Achieved at Level 1")
                .addField("**2. Joyful Box** :smiley: ", "Achieved at Level 5")
                .addField("**3. Happy Box** :slight_smile: ", "Achieved at Level 10")
                .addField("**4. Apathetic Box** :neutral_face: ", "Achieved at Level 20")
                .addField("**5. Sad Box** :slight_frown: ", "Achieved at Level 30")
                .addField("**6. Gloomy Box** :frowning2: ", "Achieved at Level 40")
                .addField("**7. Miserable Box** :cry:", "Achieved at Level 60")
                .setFooter("We might add more level roles in the future, but for now this is the complete list", "https://user-images.githubusercontent.com/39061940/50972668-e304e980-14ef-11e9-817f-cedabcf88313.png")
                .setColor("#9B59B6");
            message.edit(newEmbed);
        })
    }
    function faq() {
        channel.fetchMessage("536218737494458371").then(message => {
            let newEmbed = new Discord.RichEmbed()
                .setThumbnail("https://user-images.githubusercontent.com/39061940/50972501-77bb1780-14ef-11e9-9712-fcacf98014ad.png")
                .setAuthor("(`◕‿◕´) Roles", "https://user-images.githubusercontent.com/39061940/50972668-e304e980-14ef-11e9-817f-cedabcf88313.png")
                .addField("**1. What are the requirements for the YouTuber role?**", "Your YouTube channel needs to be connected to your discord account and you need to have at least 10k subs")
                .addField("**2. What are the requirements for the Art Box role?**", "You need to be at least level 5, you need to be open to commissions and you need to have a system to handle them.")
                .setFooter("", "https://user-images.githubusercontent.com/39061940/50972668-e304e980-14ef-11e9-817f-cedabcf88313.png")
                .setColor("#9B59B6");
            message.edit(newEmbed);
        })
    }
    if(message.author.id === bot.config[message.guild.id].ownerID) {
        if(args[0] === "rules") {
            rules()
        }else if(args[0] === "info") {
            info()
        }else if(args[0] === "roles1") {
            roles1()
        }else if(args[0] === "roles2") {
            roles2()
        }
    }

};

module.exports.help = {
    name: "editEmbed",
    cat: "Dev",
    description: "Edit embeds in <#524064741543641108>",
    usage: "editEmbed [option]",
    examples: ["editEmbed rules"]
};

module.exports.conf = {
    enabled: true,
    aliases: [],
};
