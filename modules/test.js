const { decks } = require('cards');
let blackjack = class Blackjack {
    constructor() {
        this.deck = new decks.StandardDeck({jokers: 0}).shuffleAll();
        this.playerHand = this.deck.draw()
        this.dealerHand = this.deck.draw();
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