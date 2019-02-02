const cards = require("cards");
let blackjack = class Blackjack {
    constructor() {
        this.deck = new cards.decks.StandardDeck({jokers: 0}).shuffleAll();
        this.playerHand = this.deck.draw(2);
        this.dealerHand = this.deck.draw(1);
    }

    hit(hand) {
        this.calculateTotal(hand)
    }

    calculateTotal(hand) {
        console.log(hand)
    }

}
module.exports = {
    blackjack: blackjack
};