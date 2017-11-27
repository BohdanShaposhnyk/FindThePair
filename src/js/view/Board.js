
/**
 * Created by bohdan on 20.11.2017.
 */
import Component from './Component'
import Card from 'View/Card'
import Styles from 'Styles'

export default class Board extends Component{
    constructor(props) {
        super(props);
        this._setState(props);
    }

    _createCardsDOM() {
        const cardsDOM = [];
        for (let i = 0; i < this.state.deck.length; i++) {
            cardsDOM.push(Card({
                id : i,
                value : this.state.deck[i],
                onClick : () => {this.state.onClick(i)},
                layout : this._getClassesNeeded('card')
            }));
        }
        return cardsDOM;
    }

    _getClassesNeeded(cardOrBoard) {
        const sizeName = cardOrBoard + this.state.layout.currentSize;
        return [
            Styles.board[cardOrBoard],
            Styles.sizes[sizeName],
            this.state.layout.currentSkin[cardOrBoard],
        ];
    }

    render() {
        const me = document.createElement('div');
        me.id = 'board';
        me.classList.add(...this._getClassesNeeded('board'));
        this._createCardsDOM().forEach(card => {me.appendChild(card);});
        this._insert(me);
    }
}
