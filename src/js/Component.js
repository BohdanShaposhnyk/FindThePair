/**
 * Created by bohdan on 20.11.2017.
 */

export default class Component {
    constructor(props) {
        this.state = {};
        this.render = this.render.bind(this);
        this.update = this.update.bind(this);
        this._setState = this._setState.bind(this);
        if (typeof props !== 'undefined') this._setState(props);

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

    render() {}
}