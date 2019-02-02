const { decks } = require('cards');
let blackjack = class Blackjack {
    constructor() {
        let deck = new decks.StandardDeck({jokers: 0})
        deck.shuffleAll();
        console.log(deck)
        this.playerHand = deck.draw()
        this.dealerHand = deck.draw();
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