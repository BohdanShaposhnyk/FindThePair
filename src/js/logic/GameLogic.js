/**
 * Created by bohdan on 27.11.2017.
 */
import STATES from './GAME_STATES'

export default class GameLogic {
    constructor(deckSize) {
        this.deckSize = deckSize;
        this.deck = this._initDeck();
        this.state = STATES.NEW_GAME;
        this.mistakes = 0;
    }

    getProbability() {
        const size = this.deckSize;
        return size/this.getCombinations(size);    // probability
    }

    getCombinations(number) {
        let combinations = 0;
        for (let i = 1; i < number; i++) {
            combinations += i;
        }
        return combinations;
    }

    _initDeck() {
        const size = this.deckSize;
        const deck = new Array(size).fill(null);
        for (let i = 0, j = 0; i < size; i +=2, j++) {
            deck[i] = j;
            deck[i+1] = j;
        }
        deck.sort( (a, b) => {
            return 0.5 - Math.random();
        } );
        deck.sort( (a, b) => {
            return 0.5 - Math.random();
        } );
        return deck;
    }

    calculateScore(time) {
        const prob = this.getProbability();
        time/=1000;
        return Math.round(10000000/(prob * prob * ((time + 3 * this.mistakes) * this.getCombinations(24))));
    }

    makeMove(i1, i2) {
        if (this.deck[i1] !==null && this.deck[i1] == this.deck[i2] && i1 !== i2) {
            this.deck[i2] = this.deck[i1] = null;
            if (this.deck.every( card => { return card === null; } )) {
                this.state = STATES.GAME_FINISHED;
            } else this.state = STATES.WIN;
        } else {
            this.state = STATES.LOSE;
            this.mistakes++;
        }
    }
}