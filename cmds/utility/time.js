const request = require("request");
module.exports.run = async (bot, message, args) => {
    let search = args.join("");

    request(`https://time.is/${search}`, (error, response) => {
        if(error) throw error;
        let date = response.headers.expires;
        let dateRegex = /([0-9]+:)+([0-9]+)/;
        let timezoneRegex = /(\+|-)([0-9]{2})/g;

        message.channel.send(`${date.match(dateRegex)[0]} UTC ${date.match(timezoneRegex)[0]}:00`)
    })
};

module.exports.help = {
    name: "time",
};

module.exports.conf = {
    enabled: true,
    aliases: [],
    cat: "Utility"
};