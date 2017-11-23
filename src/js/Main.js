/**
 * Created by bohdan on 18.11.2017.
 */
import Menu from './Menu'
import Component from './Component'
import Board from './Board'

const DEFAULT = {
    currentSize : 5,
    currentStyle : 'qwe1'
};

export default class Main extends Component{
    constructor(props) {
        super(props);
        const state = {
            stylesList : ['qwe1','qwe2','qwe3'],//TODO: load from local storage
            currentStyle : DEFAULT.currentStyle,
            sizesList : [5,8,10,12],//size = number of pairs
            currentSize : DEFAULT.currentSize,
            cards : new Array(DEFAULT.currentSize*2).fill(null)
        };
        this._setState(state);
    }

    onCardClick(index) {
        console.log(`clicked ${index} button`);
        const cards = this.state.cards.slice();
        cards[index] = index;
        const newState = {
            cards : cards
        };
        this.update(newState);
    }

    render() {
        console.log(this.state.cards);
        const board = new Board({
            onClick: (index) => {this.onCardClick(index);},
            cards : this.state.cards.slice()
        });
        const menuProps = {
            stylesList : this.state.stylesList.slice(),
            currentSize : this.state.currentSize,
            sizesList: this.state.sizesList.slice()
        };
        const res = document.createElement('div');
        res.id = 'app_container';
        res.appendChild(Menu(menuProps));
        res.appendChild(board.render());
        return res;
    }
}