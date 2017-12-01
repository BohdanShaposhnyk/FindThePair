/**
 * Created by bohdan on 30.11.2017.
 */
import Component from 'View/Component'
import timer from 'Styles/timer.less'

export default class Timer extends Component {
    constructor(props) {
        super(props);
        this.me = this.initDOM();
        this.screen = this.getTimerStructure();
        this.time = new Date();
        this.reset();
        this.timer = null;
    }

    getTimerStructure() {
        return {
            display : this.me.querySelector('#timerDisplay'),
            m1 : this.me.querySelector('#m1'),
            m2 : this.me.querySelector('#m2'),
            s1 : this.me.querySelector('#s1'),
            s2 : this.me.querySelector('#s2')
        }
    }

    reset() {
        this.time.setTime(0);
        this.drawTime();
    }

    updateTime() {
        this.time.setTime(this.time.getTime() + 1000);
        this.drawTime(this.time);
    }

    drawTime() {
        this.screen.s2.innerHTML = this.time.getSeconds()%10;
        this.screen.s1.innerHTML = Math.floor(this.time.getSeconds()/10);
        this.screen.m2.innerHTML = this.time.getMinutes()%10;
        this.screen.m1.innerHTML = Math.floor(this.time.getMinutes()/10);
    }

    start() {
        clearInterval(this.timer);
        this.timer = setInterval( () => {this.updateTime();}, 1000 );
    }

    initDOM() {
        // const markup = `
        //             <div id="timerContainer" class="${timer.timerContainer}">
        //                 <div id="timerScreen">
        //                     <div id="timerDisplay" class='${timer.display}'>
        //                         <div id='m1' class='${timer.col} ${timer.m1}'>
        //                         </div>
        //                         <div id='m2' class='${timer.col} ${timer.m2}'>
        //                          </div>
        //                          <div class='col colon'>
        //                          </div>
        //                          <div id='s1' class='${timer.col} ${timer.s1}'>
        //                          </div>
        //                          <div id='s2' class='${timer.col} ${timer.s2}'>
        //                          </div>
        //                     </div>
        //                 </div>
        //                 <div id="timerButtonPanel">
        //                     <div id="play_pause">
        //                     </div>
        //                     <div id="restart">
        //                     </div>
        //                 </div>
        //             </div>
        //         `;
        const markup = `
                            <div id="timerDisplay" class='${timer.display}'>
                                <div id='m1' class='${timer.col} ${timer.m1}'>
                                </div>
                                <div id='m2' class='${timer.col} ${timer.m2}'>
                                 </div>
                                 <div class='${timer.col} ${timer.colon}'>:
                                 </div>
                                 <div id='s1' class='${timer.col} ${timer.s1}'>
                                 </div>
                                 <div id='s2' class='${timer.col} ${timer.s2}'>
                                 </div>
                            </div>
                `;
        const template = document.createElement('template'); //is not supported by IE
        template.innerHTML = markup;
    //    const me = document.importNode(template.content, true);
//        console.log(me.firstElementChild.id);
        const me = template.content.firstElementChild;
        return me;
    };

    render() {
      //  console.log('timer ' + this.me.id);
      //   console.log();
      //   if (this.me.id != 'undefined') {
      //       this._insert(this.me);
      //   }
        this._insert(this.me);
    }
}

