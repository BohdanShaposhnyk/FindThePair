/**
 * Created by bohdan on 07.12.2017.
 */

export default class HighscoresStorage {
    constructor() {
        this.scores = [];
        if (!localStorage.getItem('scores') ) {
            localStorage.setItem('scores', JSON.stringify(this.scores));
        } else this.scores = JSON.parse(localStorage.getItem('scores'));
    }

    getAll() {
        this.scores = JSON.parse(localStorage.getItem('scores'));
        return this.scores;
    }

    addOne(entry) {
        const scores = this.scores.slice();
        scores.push(entry);
        if (scores.length > 0) {
            scores.sort( (a, b) => { return b.score - a.score;} );
            if (scores.length > 20) scores.pop();
        }
        this.scores = scores;
        localStorage.setItem('scores',  JSON.stringify(this.scores));
    }
}