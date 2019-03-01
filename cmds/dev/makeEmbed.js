const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    function rules() {
        let newEmbed = new Discord.RichEmbed()
            .setThumbnail("https://user-images.githubusercontent.com/39061940/50972501-77bb1780-14ef-11e9-9712-fcacf98014ad.png")
            .setAuthor("(`◕‿◕´)  Welcome to Misery's Box", "https://user-images.githubusercontent.com/39061940/50972668-e304e980-14ef-11e9-817f-cedabcf88313.png")
            .setDescription(`** **\nLet's be a fun, loving and positive community that supports one another regardless of race, religion or social/political views.\n** **`)
            .addField("**1. Be respectful and courteous**", "You don't know what perspective others are coming from. Keep in mind that your experience is not the same as everyone else’s. What may seem obvious to you may not be clear to someone else. If you're making somebody uncomfortable and they ask you to stop, you stop; toxicity and trolling are not tolerated. Do not belittle others that are asking for advice or giving advice.\n** **")
            .addField("**2. No NSFW content outside NSFW channels**", "No questions, there is an age restriction on these channels of 18 years, if you are below this age and you enter the NSFW channel and we find out you're under the age of 18, This is grounds for a Warning and a temp Mute, also gore and scat are still not allowed, even in NSFW.\n** **")
            .addField("**3. Post relevant content in its appropriate channel.**", "Make sure to keep discussion relevant to each channel. This includes not posting random images or videos that clog up the chats and disrupt conversation. If you would really like to post these things in the main channel, start a conversation about it first. Each channel is designed so people can find discussions on particular topics, it is important that this remains the case.\n** **")
            .addField("**4. No Spamming.**", "Do not spam outside of the memes channel. This includes the excessive use of caps. Make note that most spamming is a muteable offence and will be dealt with as such.\n** **")
            .addField("**5. Listen to the Staff.**", "Staff members enforce the rules and make sure the community runs smoothly for everyone. As such we expect you to listen to them, if they give you a temporary instruction - do it.\n** **")
            .addField("**6. Do not impersonate others or create fake accounts.**", "We reserve the rights to rename, mute and/or remove a user we found to be impersonating at our own discretion.\n** **")
            .addField("**7. Do not raid any other servers ever.**", "If we find out that you plan to raid or have raided other communities, we will have to mute or ban you.")
            .addField("**8. No self-promotion or advertising outside the self-promoting channel.**", "If you do feel like advertising of self-promoting do it in <#524024786637160458>.")
            .addField("**9. No doxing or exposing of private information of other members**", " Doxing members will result in a permanent ban, we do not care about your ex/friend and what he did wrong.")
            .setFooter("Talk to staff if you have any questions about rules or if you find a mistake in them.", "https://user-images.githubusercontent.com/39061940/50972668-e304e980-14ef-11e9-817f-cedabcf88313.png")
            .setColor("#9B59B6");
        message.channel.send(newEmbed);
    }
    function info() {
        let newEmbed = new Discord.RichEmbed()
        // .setThumbnail("https://user-images.githubusercontent.com/39061940/50972501-77bb1780-14ef-11e9-9712-fcacf98014ad.png")
            .setAuthor("(`◕‿◕´)  Just some extra info", "https://user-images.githubusercontent.com/39061940/50972668-e304e980-14ef-11e9-817f-cedabcf88313.png")
            .addField("**1. Do you want to become a staff member?**", "Fill out this form: https://goo.gl/7L5JTo\n** **")
            .addField("**2. Do you have complaints or compliments for a staff member?**", "Fill out this form: https://goo.gl/wZcW8k\n** **")
            .addField("**3. Do you have a suggestion for the server?**", "Fill out this form: https://goo.gl/VYTgrH\n** **")
            .setFooter("If you have any further questions ask a staff member", "https://user-images.githubusercontent.com/39061940/50972668-e304e980-14ef-11e9-817f-cedabcf88313.png")
            .setColor("#9B59B6");
        message.channel.send(newEmbed);
    }
    function roles1() {
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
        message.channel.send(newEmbed);
    }
    function roles2() {
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
        message.channel.send(newEmbed);
    }
    function join() {
        let newEmbed = new Discord.RichEmbed()
            .setAuthor("Welcome!", "https://user-images.githubusercontent.com/39061940/50972668-e304e980-14ef-11e9-817f-cedabcf88313.png")
            .setDescription(`**Please type \`${bot.config[message.guild.id].prefix}age [your age]\` to get access to the rest of the chats.\ne.g. \`%age 17\`**`)
            .setFooter(`If you're having troubles please contact a staff member`)
            .setColor("#9B59B6");
        message.channel.send(newEmbed);
    }
    function faq() {
        channel.fetchMessage("536218737494458371").then(message => {
            let newEmbed = new Discord.RichEmbed()
                .setThumbnail("https://user-images.githubusercontent.com/39061940/50972501-77bb1780-14ef-11e9-9712-fcacf98014ad.png")
                .setAuthor("(`◕‿◕´)  Level Roles", "https://user-images.githubusercontent.com/39061940/50972668-e304e980-14ef-11e9-817f-cedabcf88313.png")
                .addField("**1. How do I get the youtube role?**", "1st make sure your youtube channel is connected to your discord account.\n2nd You have to have 10k subs\n3rd if 1st and 2nd are done dm a staff member.")
                .addField("**2. How do I get the art box role?**", "1. You need to be actively open for commissions\n2.You need to be level 5+")
                .setFooter("", "https://user-images.githubusercontent.com/39061940/50972668-e304e980-14ef-11e9-817f-cedabcf88313.png")
                .setColor("#9B59B6");
            message.edit(newEmbed);
        })
    }
    if(message.author.id === bot.config[message.guild.id].ownerID) {
        switch (args[0]) {
            case "rules":
                return rules()
            case "info":
                return info()
            case "roles1":
                return roles1()
            case "roles2":
                return roles2()
            case "join":
                return join()
            case "faq":
                return faq()
            
        }
    }
};

module.exports.help = {
    name: "makeEmbed",
    cat: "Dev",
    description: "Send new embed in <#524064741543641108>",
    usage: "makeEmbed [option]",
    examples: ["makeEmbed roles1"]
};

module.exports.conf = {
    enabled: true,
    aliases: [],
};
