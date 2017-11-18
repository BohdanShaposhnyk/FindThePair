/**
 * Created by bohdan on 18.11.2017.
 */
import Menu from './Menu'

export default class Main {
    constructor() {
        this.state = {
            stylesList : ['qwe1','qwe2','qwe3'],
            currentStyle : 'qwe1',
            sizesList : [5,8,10,12],
            currentSize : 5
        };
        this.render = this.render.bind(this);
    }

    render() {
        const menuProps = {
            stylesList : this.state.stylesList.slice(),
            currentSize : this.state.currentSize
        };
        return `
            <div id="app_container">
                ${Menu(menuProps)}
            </div>
        `;
    }
}