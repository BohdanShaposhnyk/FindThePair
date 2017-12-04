/**
 * Created by bohdan on 20.11.2017.
 */

export default class Component {
    constructor(props, tag='div') {
        this.me = document.createElement(tag);
        this.state = {};
        this.render = this.render.bind(this);
        this.update = this.update.bind(this);
        this._setState = this._setState.bind(this);
        this._insert = this._insert.bind(this);
        this._applyStylesFromObj = this._applyStylesFromObj.bind(this);
        this.initChildren = this.initChildren.bind(this);
        this.renderChildren = this.renderChildren.bind(this);
        if (typeof props !== 'undefined') this._setState(props);
        this.me.id = this.state.id;
    }

    _insert() {
        const inDOM = this.state.parent.querySelector(`#${this.me.id}`);
        if (inDOM) {
            this.state.parent.replaceChild(this.me,inDOM);
        } else this.state.parent.appendChild(this.me);
    }

    //protected method without render() call
    _setState(props) {

        for (let key in props) {
            if (props.hasOwnProperty(key)) {
                this.state[key] = props[key];
            }
        }
    }

    update(props) {
        this._setState(props);
        this.render();
    }

    _applyStylesFromObj(styles) {
        this.me.classList.add(...Object.values(styles));
    }

    renderChildren() {
        if (!this.children) return false;
        for (let child in this.children) {
            this.children[child].render();
        }
    }

    initChildren() {};

    render() {
        this._insert();
    }
}