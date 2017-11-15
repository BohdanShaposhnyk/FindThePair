/**
 * Created by bohdan on 15.11.2017.
 */
import './assets/styles/default.less'

document.addEventListener('DOMContentLoaded', () => {
    "use strict";
    const parent = document.getElementById('root');
    const testElem = document.createElement('h2');
    testElem.innerHTML = 'Test message';
    parent.appendChild(testElem);
});