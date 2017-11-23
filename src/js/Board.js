/**
 * Created by bohdan on 20.11.2017.
 */
import Component from './Component'
import Card from './Card'
import style from 'Styles/board.less'

export default class Board extends Component{
    constructor(props) {
        super(props);
        this._setState(props);
    }

    render() {
        let cardsDOM = [];
        for (let i = 0; i < this.state.cards.length; i++) {
            cardsDOM.push(Card({
                        id : i,
                        value : this.state.cards[i],
                        onClick : () => {this.state.onClick(i)}
                    }));
        }
        const res = document.createElement('div');
        res.className = style.board;
        cardsDOM.forEach(card => {res.appendChild(card)});
        return res;
    }
}
