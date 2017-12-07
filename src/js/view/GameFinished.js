/**
 * Created by bohdan on 06.12.2017.
 */
import Component from 'View/Component'
import layout from 'Styles/game_finished'
import IDs from 'View/IDs'

export default class GameFinished extends Component {
    constructor(props, tag) {
        super(props, tag);
        this._applyStylesFromObj({bg : layout.modal_bg});
        this.children = this.initChildren();
    }

    initChildren() {
        const container = new Component({
            parent : this.me,
            id : IDs.gameFinishedModalInternals.container
        });
        container._applyStylesFromObj({container : layout.container});
        const containerChildren = {
            message : new Component({
                id : IDs.modalInternals.sizes,
                parent : container.me
            }),
        };
        containerChildren.message._applyStylesFromObj({message : layout.message});
        container.children = containerChildren;
        container.renderChildren();
        return {container : container};
    }

    drawOutput() {
        this.children.container.children.message.me.innerHTML = `Your score: 
${this.state.score}`;
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
        this.drawOutput();
        this._insert();
    }
}