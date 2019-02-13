const http = require("http")
const fs = require('fs');
module.exports = async (bot) => {
    console.log("Bot ready");
    bot.user.setActivity(`%help`)

    http.createServer((req, res) => {
        let responseCode = 404;
        let content = '404 Error';

        if (req.url === '/') {
            responseCode = 200;
            content = fs.readFileSync('../../index.html');
        }

        res.writeHead(responseCode, {
            'content-type': 'text/html;charset=utf-8',
        });

        res.write(content);
        res.end();
    })
        .listen(3000);
};
