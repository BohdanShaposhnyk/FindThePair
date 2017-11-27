/**
 * Created by bohdan on 18.11.2017.
 */
import Component from './Component'
import Board from 'View/Board'
import Menu from 'View/Menu'



export default class GameView extends Component{
    constructor(props) {
        super(props);
        this._setState(props);
        this.board = new Board({
            layout: this.state.layout,
            deck: this.state.deck,
            onClick : (index) => {this.state.handlers.cardClickHandler(index);}
        });
        this.menu = Menu;
    }

    getMenuProps(parent) {
        return {
            parent: parent,
            stylesList : Object.keys(this.state.layout.skins),
            currentSize : this.state.layout.currentSize,
            sizesList: this.state.layout.sizes.slice(),
            handlers : {
                onSizeChange : (newSize) => {this.state.handlers.changeSizeHandler(newSize);},
                onStyleChange : (newStyle) => {this.state.handlers.changeSkinHandler(newStyle);},
                highscores : () => {this.state.handlers.highscoresClickHandler();}
            }
        };
    }

    render() {
        const me = document.createElement('div');
        me.id = 'app_container';
        this.menu(this.getMenuProps(me));
        this.board.state.parent = me;
        this.board.render();
        this._insert(me);
    }
}