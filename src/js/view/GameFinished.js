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
                id : IDs.gameFinishedModalInternals.message,
                parent : container.me
            }),
            textInput : new Component({
                id : IDs.gameFinishedModalInternals.textInput,
                parent : container.me
            }, 'INPUT'),
            restart : new Component({
                id : IDs.gameFinishedModalInternals.restart,
                parent : container.me
            }),
            newGame : new Component({
                id : IDs.gameFinishedModalInternals.newGame,
                parent : container.me
            })
        };
        containerChildren.textInput.me.setAttribute("type", "text");
      //  containerChildren.textInput.me.placeholder = 'Enter your name...';
        containerChildren.textInput.me.value = 'anon';
        containerChildren.textInput.me.size = 13;
        containerChildren.textInput.me.maxLength = 12;
        containerChildren.textInput.me.onfocus = () => {containerChildren.textInput.me.value ='';};
        containerChildren.restart._applyStylesFromObj({restart : layout.restart});
        containerChildren.newGame._applyStylesFromObj({newGame : layout.new_game});
        containerChildren.restart.me.onclick = () => {
            this.hide();
            this.state.handlers.restartGame();
        };
        containerChildren.newGame.me.onclick = () => {
            this.hide();
            this.state.handlers.newGame();
        };
        containerChildren.restart.me.innerHTML = '&#8635;';
        containerChildren.newGame.me.innerHTML = 'NEW GAME';
        containerChildren.textInput._applyStylesFromObj({input : layout.text_field});
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
        this.state.handlers.addHighscore();
    }

    render() {
        this.renderChildren();
        this.drawOutput();
        this._insert();
    }
}