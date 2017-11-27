/**
 * Created by bohdan on 18.11.2017.
 */
import Component from './Component'
import Board from 'View/Board2'



export default class GameView extends Component{
    constructor(props) {
        super(props);
        this._setState(props);
        this.board = new Board({
            layout: this.state.layout,
            deck: this.state.deck,
            onClick : (index) => {this.state.handlers.cardClickHandler(index);}
        });
    }

    render() {
        const me = document.createElement('div');
        me.id = 'app_container';
        this.board.state.parent = me;
        this.board.render();
        this._insert(me);
    }
}