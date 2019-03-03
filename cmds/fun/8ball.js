const embedMaker = require("../../modules/embed.js")
const tools = require('../../modules/tools.js')
module.exports.run = async (bot, message, args) => {
    if(!args[0]) return embedMaker.command(message);

    let waitTime = tools.random(2000, 3000);
    let answers = [
		{color: 0x43B581, answer: "It is certain",},
        {color: 0x43B581, answer: "It is decidedly so",},
        {color: 0x43B581, answer: "Without a doubt",},
		{color: 0x43B581, answer: "Yes, definitely",},
		{color: 0x43B581, answer: "You may rely on it",},
		{color: 0x43B581, answer: "As I see it, yes",},
		{color: 0x43B581, answer: "Most likely",},
		{color: 0x43B581, answer: "Outlook good",},
		{color: 0x43B581, answer: "Yes",},
		{color: 0x43B581, answer: "Signs point to yes",},
		{color: 0xE55B0A, answer: "Reply hazy try again",},
		{color: 0xE55B0A, answer: "Ask again later",},
		{color: 0xE55B0A, answer: "Better not tell you now",},
		{color: 0xE55B0A, answer: "Cannot predict now",},
		{color: 0xE55B0A, answer: "Concentrate and ask again",},
		{color: 0xCC0F16, answer: "Don't count on it",},
		{color: 0xCC0F16, answer: "My reply is no",},
		{color: 0xCC0F16, answer: "My sources say no",},
		{color: 0xCC0F16, answer: "Outlook not so good",},
        {color: 0xCC0F16, answer: "Very doubtful",},
    ]
    
    embedMaker.message(message, "Asking 🎱 your question", {}, _message => {
        setTimeout(() => {
            let color = answers[Math.floor(Math.random()*answers.length)].color
            let answer = answers[Math.floor(Math.random()*answers.length)].answer
            let embed = embedMaker.embed(message, `🎱 Says "${answer}"`, {color: color})
            _message.edit(embed)
        }, waitTime)
    })
}

module.exports.help = {
    name: "8ball",
    cat: "Fun",
    description: "Ask the magical 8ball a question",
    usage: `8ball [question]`,
    examples: [`8ball Will I die tomorrow?`]
}
  
module.exports.conf = {
    enabled: true,
    aliases: [],
    cooldown: "3 Seconds",
};