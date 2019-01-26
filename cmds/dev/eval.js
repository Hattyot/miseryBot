module.exports.run = async (bot, message, args) => {
    if(message.author.id !== "436228721033216009") return
    try {
        const code = args.join(" ")
        let evaled = eval(code)

        if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled)

        message.channel.send(evaled, {code:"xl"});
    } catch (err) {
        message.channel.send(`Error fam`);
      }
}

module.exports.help = {
    name: "eval",
}

module.exports.conf = {
    enabled: true,
    aliases: [],
  };