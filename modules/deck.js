const { shuffle } = require('rand-utils');
const props = new WeakMap();

class Deck {
	constructor() {

        let suits = [ "spades", "hearts", "diamonds", "clubs" ];
        let ranks = [ "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K" ];

		let cards = [];

		suits.forEach((suit) => {
			ranks.forEach((rank) => {
				cards.push(new Card(suit, rank));
			});
		});

		props.set(this, {
			cards: new Set(cards),
			deck: cards.slice(),
			held: [ ],
		});

		cards.forEach((card) => {
			card.deck = this;
		});
	}
	draw(count = 1) {
		const { deck, held } = props.get(this);

		if (! deck.length) {
			throw new Error('Deck: Cannot draw from deck, no cards remaining');
		}

		if (count < 0) {
			return [ ];
		}

		const cards = deck.splice(0, count);

		held.push(...cards);

		return cards;
	}
	shuffleAll() {
		const { deck } = props.get(this);

        shuffleDeck(deck);
	}
}

class Card {
    constructor(suit, rank) {

        props.set(this, {
            deck: null
        });

        this.suit = suit;
        this.rank = rank;

        Object.freeze(this);
    }
}

function shuffleDeck(array) {
    shuffle(array, 'SIMPLE');
}


module.exports = Deck;
