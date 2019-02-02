const cards = require("cards");
let blackjack = class Blackjack {
    constructor(player) {
        this.player = player;
        this.deck = new cards.decks.StandardDeck({jokers: 0}).shuffleAll();
        this.playerHand = this.deck.draw(2);
        this.dealerHand = this.deck.draw(1);
    }

    hit() {
        this.calculateTotal()
    }

    calculateTotal() {
        let sum = 0;
        let ace = [];
        for (let i = 0; i < hand.length; i++) {
            let rank = hand[i][0].rank.shortName;
            if (["K", "Q", "J", "10"].includes(rank)) {
                sum += 10;
            } else if (rank === "A") {
                ace.push(i);
            } else {
                sum += parseInt(rank);
            }
        }
        for (let j = 0; j < ace.length; j++) {
            if (sum > 10) {
                sum++;
            } else {
                sum += 11;
            }
        }
        if (sum > 21) {
            return "Bust";
        } else if (sum === 21 && hand.length === 2) {
            return "Blackjack";
        } else {
            return sum;
        }
    }

}
module.exports = {
};