/**
 * Created by bohdan on 18.11.2017.
 */
import Menu from './Menu'
import Component from './Component'
import Board from './Board'

export default class Main extends Component{
    constructor(props) {
        super(props);
        const state = {
            stylesList : ['qwe1','qwe2','qwe3'],//TODO: load from local storage
            currentStyle : 'qwe1',
            sizesList : [5,8,10,12],
            currentSize : 5
        };
        this._setState(state);
    }

    render() {
        const board = new Board();
        const menuProps = {
            stylesList : this.state.stylesList.slice(),
            currentSize : this.state.currentSize
        };
        return `
            <div id="app_container">
                ${Menu(menuProps)}
                ${board.render()}
            </div>
        `;
    }
}