const cards = require("cards");
let blackjack = class Blackjack {
    constructor(bet) {
        this.bet = bet
        this.deck = new cards.decks.StandardDeck({jokers: 0})
        this.deck.shuffleAll();
    }

    setEmbedMessage(_embedMessage) {
        this.embedMessage = _embedMessage
    }

    deal() {
        this.playerHand = this.deck.draw(2);
        this.dealerHand = this.deck.draw(1);
    }

    hit(hand) {
        if(hand === "player") {
            this.playerHand.push(...this.deck.draw());
        }else {
            this.dealerHand.push(...this.deck.draw());
        }
    }

    get playerTotal() {
        return this.calculateTotal(this.playerHand)
    }
    get dealerTotal() {
        return this.calculateTotal(this.dealerHand)
    }

    calculateTotal(hand) {
        let sum = 0;
        let ace = [];
        for (let i = 0; i < hand.length; i++) {
            let rank = hand[i].rank.shortName;
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

    dealerMachine() {
        let dealerTotal = this.dealerTotal;
        let playerTotal = this.playerTotal;
        if(dealerTotal === "Bust") {
            return "Dealer Bust"
        }
        if(dealerTotal > 16 || dealerTotal === 0) {
            if(dealerTotal === playerTotal) {
                return "Draw"
            }else if(dealerTotal > playerTotal || dealerTotal === "Blackjack") {
                return "Dealer Win"
            }else if(dealerTotal < playerTotal) {
                return "Player Win"
            }
        }else {
            this.hit("dealer");
            this.dealerMachine();
        }
    }
}
module.exports = {
    blackjack: blackjack
};