/**
 * Created by bohdan on 18.11.2017.
 */
import Menu from './Menu'
import Component from './Component'
import Board from './Board'

const DEFAULT = {
    currentSize : 5,
    currentStyle : {name : 'qwe 1', id : 'style1'}
};

export default class Main extends Component{
    constructor(props) {
        super(props);
        const state = {
            parent : props.parent,
            stylesList : [
                {name : 'qwe 1', id : 'style1'},
                {name : 'qwe 2', id : 'style2'},
                {name : 'qwe 3', id : 'style3'}
                ],//TODO: load from local storage
            currentStyle : DEFAULT.currentStyle,
            sizesList : [5,8,10,12],//size = number of pairs, make 12-18-24-32
            currentSize : DEFAULT.currentSize,
            cards : new Array(DEFAULT.currentSize*2).fill(null)
        };
        this._setState(state);
    }

    onSizeChange(newSize) {
        const newState = {
            currentSize : newSize,
            cards :  new Array(newSize*2).fill(null)
        };
        this.update(newState);
    }

    onStyleChange(newStyle) {
        const newState = {
            currentStyle : newStyle,
        };
        this.update(newState);
    }

    onHighscoresClick() {
        console.log('highscores');
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
            cards : this.state.cards.slice(),
            currentSize : this.state.currentSize,
            currentStyle : this.state.currentStyle
        });
        const menuProps = {
            stylesList : this.state.stylesList.slice(),
            currentSize : this.state.currentSize,
            sizesList: this.state.sizesList.slice(),
            handlers : {
                onSizeChange : (newSize) => {this.onSizeChange(newSize);},
                onStyleChange : (newStyle) => {this.onStyleChange(newStyle);},
                highscores : () => {this.onHighscoresClick();}
            }
        };
        const res = document.createElement('div');
        res.id = 'app_container';
        res.appendChild(Menu(menuProps));
        res.appendChild(board.render());
        if (this.state.parent.firstChild) {
            this.state.parent.replaceChild(res,this.state.parent.firstChild);
        } else return res;
    }
}