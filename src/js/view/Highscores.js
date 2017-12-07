/**
 * Created by bohdan on 07.12.2017.
 */

import Component from 'View/Component'
import layout from 'Styles/highscores'
import IDs from 'View/IDs'


export default class Highscores extends Component {
    constructor(props, tag) {
        super(props, tag);
        this._applyStylesFromObj({layout : layout.modal_bg});
        this.children = this.initChildren();

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

    createScoreEntries() { //scores - [{player : playerName, score : score},{}...]
        return this.state.scores.map( (score) => {
            return `<div>${score.player} : ${score.score}</div>`
        } );
    }

    initChildren() {
        const container = new Component({
            parent : this.me,
            id : IDs.highscoresInternals.container
        });
        container._applyStylesFromObj({container : layout.container});
        container.render();
        return {container : container};
    }

    render() {
        this.children.container.me.innerHTML = '';
        const entries = this.createScoreEntries();
        entries.forEach( (entry) => {
            this.children.container.me.innerHTML += entry;
        } );
        this._insert();
    }
}