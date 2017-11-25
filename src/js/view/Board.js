/**
 * Created by bohdan on 20.11.2017.
 */
import Component from './Component'
import Card from './Card'
//import style_base from 'Styles/board.less'
//import style_style1 from 'Styles/style1.less'
//import style_sizes from 'Styles/sizes.less'
import Styles from 'Styles'

export default class Board extends Component{
    constructor(props) {
        super(props);
        this._setState(props);
    }

    render() {
        const styleFile = Styles[this.state.currentStyle.id];
        const cardStyles = `
                ${Styles.board.card} 
                ${Styles.sizes[`card${this.state.currentSize}`]} 
                ${styleFile.card}
            `;
        let cardsDOM = [];
        for (let i = 0; i < this.state.cards.length; i++) {

            cardsDOM.push(Card({
                        id : i,
                        value : this.state.cards[i],
                        onClick : () => {this.state.onClick(i)},
                        styles : cardStyles
                    }));
        }
        const res = document.createElement('div');
        res.classList.add(Styles.board.board);
        res.classList.add(Styles.sizes[`board${this.state.currentSize}`]);
        res.classList.add(styleFile.board);
        cardsDOM.forEach(card => {res.appendChild(card);});
        return res;
    }
}
