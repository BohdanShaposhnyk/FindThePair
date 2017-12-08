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
        this.size = 5;
    }

    addBtnList(parent) {
        let listValues = null;
        parent.children = {};
        parent.children.sizes = [];
        parent.children.skins = [];
        if (parent.me.id === IDs.modalInternals.sizes) {
            listValues = this.state.layout.sizes.map( (current) => {
                const elem = document.createElement('div');
                elem.innerHTML = `${current} PAIRS`;
                elem.value = current;
                elem.onclick = () => {this.state.handlers.changeSize(elem.value);};
                parent.children.sizes.push(elem);
                return elem;
            } );
        } else if (parent.me.id === IDs.modalInternals.skins) {
            listValues = Object.keys(this.state.layout.skins).map( (current) => {
                const elem = document.createElement('div');
                elem.innerHTML = current;
                elem.value = current;
                elem.onclick = () => {
                    this.state.handlers.changeSkin(this.state.layout.skins[current]);
                };
                parent.children.skins.push(elem);
                return elem;
            } );
        }
        listValues.forEach( (item) => {
            parent.me.appendChild(item);
        } );
    }

    initChildren() {
        const container = new Component({id : IDs.modalInternals.container, parent : this.me});
        container._applyStylesFromObj({layout : layout.modal_container});
        const containerChildren = {
            sizes : new Component({
                id : IDs.modalInternals.sizes,
                parent : container.me,
                size : this.state.layout.currentSize
            }),
            skins : new Component({
                id : IDs.modalInternals.skins,
                parent : container.me,
                skinsList : this.state.layout.skins
            }),
            scoresBtn : new Component({id : IDs.modalInternals.scoresBtn, parent : container.me}),
            newGameBtn : new Component({id : IDs.modalInternals.newGameBtn, parent : container.me}),
        };
        containerChildren.sizes._applyStylesFromObj({layout : layout.sizes});
        containerChildren.skins._applyStylesFromObj({layout : layout.skins});
        containerChildren.sizes.me.innerHTML = 'SIZES<br><br>';
        containerChildren.skins.me.innerHTML = 'SKINS<br><br>';
        this.addBtnList(containerChildren.sizes);
        this.addBtnList(containerChildren.skins);
        containerChildren.scoresBtn._applyStylesFromObj({layout : layout.highscores});
        containerChildren.newGameBtn._applyStylesFromObj({layout : layout.new_btn});
        containerChildren.newGameBtn.me.onclick = this.state.handlers.newGameClick;
        containerChildren.newGameBtn.me.innerHTML = 'START';
        containerChildren.scoresBtn.me.innerHTML = 'HIGH SCORES';
        containerChildren.scoresBtn.me.onclick = this.state.handlers.showHighscores;
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

    _setHighlight() {
        const sizes = this.children.container.children.sizes.children.sizes;
        const skins = this.children.container.children.skins.children.skins;
        sizes.forEach((size, index) => {
            if (size.value == this.size) {
                if (!size.classList.contains(layout.highlight)) {
                    sizes[index].classList.add(layout.highlight);
                }
            } else if (size.classList.contains(layout.highlight)) {
                sizes[index].classList.remove(layout.highlight);
            }
        });

        skins.forEach( (skin, index) => {
            if (this.state.layout.skins[skin.value] == this.state.layout.currentSkin) {
                if (!skin.classList.contains(layout.highlight)) {
                    skins[index].classList.add(layout.highlight);
                }
            } else if (skin.classList.contains(layout.highlight)) {
                skins[index].classList.remove(layout.highlight);
            }
        } );
    }

    render() {
        this.renderChildren();

        this._setHighlight();
        this._insert();
    }
}