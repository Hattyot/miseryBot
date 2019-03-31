const cards = require("cards");
const Discord = require("discord.js");
let blackjack = class Blackjack {
    constructor() {
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
}

let games = {}
let roulette = class Roulette {
	constructor(guildID, redBlack, spaces) {
        this.guildID = guildID
        this.redBlack = redBlack
        this.spaces = spaces
		this.bets = [];
		this.winSpaces = this.generateSpaces();

        games[this.guildID] = this;
	}

	addBet(user, bet, space) {
		const multiplier = this.winSpaces.includes(space)
			? this.spaces.find(spc => spc.values.includes(space)).multiplier
            : 0;
        this.bets.push({
            user: user,
            winnings: bet * multiplier
        })

        games[this.guildID] = this;
	}

	awaitPlayers(time) {
		return new Promise((resolve) => {
			setTimeout(() => {
				games.delete(this.guildID);
				return resolve(this.players);
			}, time);
		});
    }
    
    generateSpaces() {
        const winNumber = Math.floor(Math.random() * 37);
    
        return [
            winNumber.toString(),
            this.getColor(winNumber),
            this.getRange(winNumber, 'dozens'),
            this.getColumn(winNumber),
            this.getRange(winNumber, 'halves'),
            this.getParity(winNumber)
        ];
    }

    setEmbedMessage(embedMessage) {
        this.embedMessage = embedMessage
    }

    getColor(number) {
        if (number === 0) return "green";
    
        return this.redBlack.red.includes(number) ? 'red' : 'black';
    }
    
    getRange(number, size) {
        if (number === 0) return null;
    
        return this.spaces.get(size).values.find(value => {
            const min = parseInt(value.split('-')[0]);
            const max = parseInt(value.split('-')[1]);
    
            return number >= min && number <= max;
        });
    }
    
    getColumn(number) {
        if (number === 0) return null;
    
        return this.spaces.get('columns').values[(number - 1) % 3];
    }
    
    getParity(number) {
        if (number === 0) return null;
    
        return this.spaces.get('parity').values[number % 2];
    }
	static findGame(guildID) {
		return games[guildID] || null;
    }
    endGame(guildID) {
        delete games[guildID]
    }
}

module.exports = {
    blackjack: blackjack,
    roulette: roulette
};