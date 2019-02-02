const blackjack = require("../modules/test.js").blackjack;
module.exports = async (bot) => {
    let blackjackGame = new blackjack()
    blackjackGame.hit()
    console.log("Bot ready");
    bot.user.setActivity(`%help`)
};
