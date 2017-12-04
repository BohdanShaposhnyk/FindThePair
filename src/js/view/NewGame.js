/**
 * Created by bohdan on 02.12.2017.
 */

import Component from 'View/Component'
import layout from 'Styles/new_game'
import IDs from 'View/IDs'


export default class NewGame extends Component {
    constructor(props, tag) {
        super(props, tag);
        this._applyStylesFromObj({layout : layout.modal_bg});
        this.children = this.initChildren();
        this.size = 0;
        window.onclick = (e) => {
            if (e.target == this.me) {
                this.hide();
            }
        };
    }

    addBtnList(parent) {
        let listValues = null;
        if (parent.id === IDs.modalInternals.sizes) {
            listValues = this.state.layout.sizes.map( (current) => {
                const elem = document.createElement('div');
                elem.innerHTML = `${current} PAIRS`;
                elem.value = current;
                elem.onclick = () => {this.state.handlers.changeSize(elem.value);};
                return elem;
            } );
        } else if (parent.id === IDs.modalInternals.skins) {
            listValues = Object.keys(this.state.layout.skins).map( (current) => {
                const elem = document.createElement('div');
                elem.innerHTML = current;
                elem.value = this.state.layout.skins[current];
                elem.onclick = () => {this.state.handlers.changeSkin(elem.value);};
                return elem;
            } );
        }
        listValues.forEach( (item) => {
            parent.appendChild(item);
        } );
    }

    initChildren() {
        const container = new Component({id : IDs.modalInternals.container, parent : this.me});
        container._applyStylesFromObj({layout : layout.modal_container});
        const containerChildren = {
            sizes : new Component({id : IDs.modalInternals.sizes, parent : container.me}),
            skins : new Component({id : IDs.modalInternals.skins, parent : container.me}),
            scoresBtn : new Component({id : IDs.modalInternals.scoresBtn, parent : container.me}),
            newGameBtn : new Component({id : IDs.modalInternals.newGameBtn, parent : container.me}),
        };
        containerChildren.sizes._applyStylesFromObj({layout : layout.sizes});
        containerChildren.skins._applyStylesFromObj({layout : layout.skins});
        containerChildren.sizes.me.innerHTML = 'SIZES<br><br>';
        containerChildren.skins.me.innerHTML = 'SKINS<br><br>';
        this.addBtnList(containerChildren.sizes.me);
        this.addBtnList(containerChildren.skins.me);
        containerChildren.scoresBtn._applyStylesFromObj({layout : layout.highscores});
        containerChildren.newGameBtn._applyStylesFromObj({layout : layout.new_btn});
        containerChildren.newGameBtn.me.onclick = this.state.handlers.newGameClick;
        containerChildren.newGameBtn.me.innerHTML = 'START';
        containerChildren.scoresBtn.me.innerHTML = 'HIGH SCORES';
        container.children = containerChildren;
        container.renderChildren();
        return {container : container};
    }

    show() {
        const hider = layout.hider;
        if (this.me.classList.contains(hider)) {
            this.me.classList.remove(hider);
        }
    }

    hide() {
        const hider = layout.hider;
        if (!this.me.classList.contains(hider)) {
            this.me.classList.add(hider);
        }
    }

    render() {
        this.renderChildren();
        this._insert();
    }
}