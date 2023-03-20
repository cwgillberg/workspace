'use strict';

const clock = document.querySelector('#clock-counter');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const pageTitle = document.querySelector('title');
const audioPlayer = document.querySelector('#player');
const settings = document.getElementById('settings');


startBtn.addEventListener('click', () => startClock());
stopBtn.addEventListener('click', () => stopClock());
resetBtn.addEventListener('click',() => resetClock());
settings.addEventListener('click', () => {
    if(document.querySelector('form').style.display === 'grid') {
        document.querySelector('form').style.display = 'none';
    } else {
        document.querySelector('form').style.display = 'grid';
    }
})

let timer;
let deadline = 1;
let secs = 20;
let stopped = false;


function startClock() {
    let initialDecrement = true;

    timer = setInterval(() => {
        if(initialDecrement && !stopped) {
            deadline--;
            initialDecrement = false;
        }

        secs--;

        if(secs >= 10 && deadline >= 10) {
            clock.innerHTML = `${deadline}:${secs}`;
            pageTitle.innerHTML = `${deadline}:${secs} - Workspace`;
        } else if(secs >= 10 && deadline < 10) {
            clock.innerHTML = `0${deadline}:${secs}`;
            pageTitle.innerHTML = `0${deadline}:${secs} - Workspace`;
        } else if(secs < 10 && deadline >= 10) {
            clock.innerHTML = `${deadline}:0${secs}`;
            pageTitle.innerHTML = `${deadline}:0${secs} - Workspace`;
        } else if(secs < 10 && deadline < 10) {
            clock.innerHTML = `0${deadline}:0${secs}`;
            pageTitle.innerHTML = `0${deadline}:0${secs} - Workspace`;
        }

        if(secs === 0) {
            deadline--;
            secs = 60;
        }

      if(deadline < 0) {
        audioPlayer.play();
        clearInterval(timer);
      }
    }, 1000);
}

function stopClock() {
    clearInterval(timer);
    stopped = true;
}

function resetClock() {
    clearInterval(timer);
    stopped = false;
    deadline = 20;
    secs = 60;
    clock.innerHTML = `${deadline}:00`;
    pageTitle.innerHTML = `Workspace`;
}

