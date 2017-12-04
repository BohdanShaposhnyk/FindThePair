/**
 * Created by bohdan on 01.12.2017.
 */

import Component from 'View/Component'
import layout from 'Styles/menu'
import IDs from 'View/IDs'
import childLayout from 'Styles/menu_internals'

export default class Menu extends Component {
    constructor(props, tag) {
        super(props, tag);
        this._applyStylesFromObj({menu : layout.menu});
        this.children = this.initChildren();
    }

    updateChildren() {

    }

    initChildren() {
        const children = {
            logo : new Component({id : IDs.menuElems.logo, parent : this.me}),
            newGame : new Component({id : IDs.menuElems.newGame, parent : this.me}),
            timer : new Component({id : IDs.menuElems.timer, parent : this.me}),
            skinChange : new Component({id : IDs.menuElems.skinChange, parent : this.me}),
            highscores : new Component({id : IDs.menuElems.highscores, parent : this.me}),
        };
        children.newGame.me.innerHTML = 'NEW GAME';
        children.newGame.me.onclick = this.state.handlers.newGameMenuClick;
        children.highscores.me.innerHTML = 'HIGH SCORES';
        children.skinChange.me.innerHTML = 'LAYOUT';
        for (let child in children) {
            children[child]._applyStylesFromObj({name : childLayout[IDs.menuElems[child]]}); //weak part! className has to be equal to ID
        }
        return children;
    }

    render() {
        this.renderChildren();
        this._insert();
    }
}