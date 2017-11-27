/**
 * Created by bohdan on 20.11.2017.
 */
import Component from './Component'
import Card from './Card'
import Styles from 'Styles'

export default class Board extends Component{
    constructor(props) {
        super(props);
        this._setState(props);
    }

    _createCardsDOM() {
        const cardsDOM = [];
        for (let i = 0; i < this.state.cards.length; i++) {
            cardsDOM.push(Card({
                id : i,
                value : this.state.cards[i],
                onClick : () => {this.state.onClick(i)},
                styles : this._getClassesNeeded('card')
            }));
        }
        return cardsDOM;
    }

    _getClassesNeeded(cardOrBoard) {
        const styleFile = Styles[this.state.currentStyle.id];
        const sizeName = cardOrBoard + this.state.currentSize;
        return [
                Styles.board[cardOrBoard],
                Styles.sizes[sizeName],
                styleFile[cardOrBoard],
            ];
    }

    render() {
        const res = document.createElement('div');
        res.classList.add(...this._getClassesNeeded('board'));
        this._createCardsDOM().forEach(card => {res.appendChild(card);});
        return res;
    }
}
