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

    createScoreEntries() {
        const title = `<div class="${layout.entry}">
                        <div>&#8470;</div>
                        <div>PLAYER</div>
                        <div>SCORE</div>
                        <div>LVL</div>
                    </div>`;
        const entries = this.state.scores.map( (score, i) => {
            return `<div class="${layout.entry}">
                        <div>${i+1}</div>
                        <div>${score.player}</div>
                        <div>${score.score}</div>
                        <div>${score.size}</div>
                    </div>`
        } );
        entries.unshift(title);
        return entries;
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
        this.children.container.me.innerHTML = 'TOP 20';
        const entries = this.createScoreEntries();
        entries.forEach( (entry) => {
            this.children.container.me.innerHTML += entry;
        } );
        this._insert();
    }
}