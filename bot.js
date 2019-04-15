const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const mongoose = require("mongoose");

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection()
bot.config = require("./data/data.json");
bot.icons = {};
bot.games = {
    blackjackLimiter: {},
}
bot.cooldownTimes = {
    blackjack: {},
    roulette: {},
    work: {},
    rob: {}
}
bot.playing = {}

mongoose.connect(`mongodb://0I1n83q42L:tdAF9o68x1x8@ds213255.mlab.com:13255/heroku_6ml2f2jr`, {
    useNewUrlParser: true
});

fs.readdir("./cmds/", (err, files) => {
    if (err) console.log(err);
    let folders = files.filter(f => f.split(".").pop() !== "js");
    folders.forEach(folder => {
        if (folder === "not for use") {
            return
        }
        fs.readdir(`./cmds/${folder}`, (err, files) => {
            let jsfiles1 = files.filter(f => f.split(".").pop() === "js");
            if (jsfiles1.length <= 0) {
                return console.log("No commands to load")
            }
            console.log(`Loading ${jsfiles1.length} commands in ${folder}`);
            jsfiles1.forEach((f, i) => {
                let props = require(`./cmds/${folder}/${f}`);
                console.log(`  ${i + 1}: ${f} loaded`);
                bot.commands.set(props.help.name.toLowerCase(), props)
                if(props.conf.aliases.length > 0) {
                    props.conf.aliases.forEach(alias => {
                        bot.aliases.set(alias, props.help.name.toLowerCase())
                    })
                }
            })
        })
    })
});
fs.readdir('./events/', (err, files) => {
    let events = files.filter(f => f.split(".").pop() === "js");
    console.log(`Loading ${events.length} events`);
    events.forEach((f, i) => {
        const eventName = f.split(".")[0];
        const event = require(`./events/${f}`);
        console.log(`${i + 1}: ${f} loaded`);
        bot.on(eventName, event.bind(null, bot));
        delete require.cache[require.resolve(`./events/${f}`)];
    });
});

bot.login(`NTEwNDMyODAxODg4MjcyMzg3.Dy4OVg.dJlo4x4P-_XKkHbMZpleG7EORyQ`);

module.exports = bot;
