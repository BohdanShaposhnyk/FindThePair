/**
 * Created by bohdan on 01.12.2017.
 */

import Component from 'View/Component'
import layout from 'Styles/timer.less'
import IDs from 'View/IDs'

export default class Timer extends Component {
    constructor(props, tag) {
        super(props, tag);
        this._applyStylesFromObj({timer : layout.timer});
        this.children = this.initChildren();
        this.screen = this.getTimerStructure();
        this.time = new Date();
        this.reset();
        this.timer = null;

    }

    getTimerStructure() {
        return {
            display : this.children.display.me,
            m1 : this.children.display.children.m1.me,
            m2 : this.children.display.children.m2.me,
            s1 : this.children.display.children.s1.me,
            s2 : this.children.display.children.s2.me
        }
    }

    drawTime() {
        this.screen.s2.innerHTML = this.time.getSeconds()%10;
        this.screen.s1.innerHTML = Math.floor(this.time.getSeconds()/10);
        this.screen.m2.innerHTML = this.time.getMinutes()%10;
        this.screen.m1.innerHTML = Math.floor(this.time.getMinutes()/10);
    }

    updateTime() {
        this.time.setTime(this.time.getTime() + 1000);
        this.drawTime(this.time);
    }

    start() {
        clearInterval(this.timer);
        this.timer = setInterval( () => {this.updateTime();}, 1000 );
    }

    stop() {
        clearInterval(this.timer);
    }


    reset() {
        this.time.setTime(0);
        this.drawTime();
    }

    initChildren() {
        const display = new Component({id : IDs.timerInner.display, parent : this.me});
        const pause = new Component({id : IDs.timerInner.pause, parent : this.me});
        const replay = new Component({id : IDs.timerInner.replay, parent : this.me});
        const displayChildren = {
            m1 : new Component({id : IDs.timerInner.m1, parent : display.me}),
            m2 : new Component({id : IDs.timerInner.m2, parent : display.me}),
            colon : new Component({id : IDs.timerInner.colon, parent : display.me}),
            s1 : new Component({id : IDs.timerInner.s1, parent : display.me}),
            s2 : new Component({id : IDs.timerInner.s2, parent : display.me})
        };
        displayChildren.colon.me.innerHTML = ':';
        for (let child in displayChildren) {
            displayChildren[child]._applyStylesFromObj({col : layout.col, name : layout[child]}); //weak part! className has to be equal to ID
        }
        display.children = displayChildren;
        display.renderChildren();
        const children = {
            pause : pause,
            display : display,
            replay : replay
        };
        for (let child in children) {
            children[child]._applyStylesFromObj({col : layout.timer_part, name : layout[child]}); //weak part! className has to be equal to ID
        }
        return children;
    }

    render() {
        this.renderChildren();
        this._insert();
    }
}