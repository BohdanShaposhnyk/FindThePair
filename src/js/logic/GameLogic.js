/**
 * Created by bohdan on 27.11.2017.
 */
import STATES from './GAME_STATES'

export default class GameLogic {
    constructor(deckSize) {
        this.deckSize = deckSize;
        this.deck = this._initDeck();
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

    makeMove(i1, i2) {
        if (this.deck[i1] !==null && this.deck[i1] == this.deck[i2] && i1 !== i2) {
            this.deck[i2] = this.deck[i1] = null;
            console.log('success');
            return STATES.WIN;
        } else {
            console.log('failure');
            return STATES.LOSE;
        }
    }

}