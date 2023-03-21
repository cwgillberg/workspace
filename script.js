'use strict';

//global DOM elements
const clock = document.querySelector('#clock-counter');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const pageTitle = document.querySelector('title');
const audioPlayer = document.querySelector('#player');

//global variables
const focusDefault = 25;
const breakDefault = 5;

let timer;
let focusDuration = focusDefault;
let breakDuration = breakDefault;
let preferredFocus = focusDefault;
let preferredBreak = breakDefault;
let secs = 60;
let isStopped = false;
let isStarted = false;

window.addEventListener('load', () => {
    updateClockAndTitle(focusDefault, 0);
});


startBtn.addEventListener('click', () => startFocus());

stopBtn.addEventListener('click', () => stopClock());

resetBtn.addEventListener('click',() => resetClock());

document.getElementById('settings').addEventListener('click', () => {
    if(document.querySelector('form').style.display === 'grid') {
        toggleSettings('off');
    } else {
        toggleSettings('on');
    }
});


document.getElementById('save-button').addEventListener('click', () => {
    saveSettings();
    toggleSettings('off');
    
});


function startFocus() {
    let initialDecrement = true;
    isStarted = true;

    timer = setInterval(() => {
        if(initialDecrement && !isStopped) {
            focusDuration--;
            initialDecrement = false;
        }

        secs--;

        updateClockAndTitle(focusDuration, secs);

        if(secs === 0) {
            focusDuration--;
            secs = 60;
        }

        if(focusDuration < 0) {
            try {
                audioPlayer.play();
            } catch(error) {
                console.log('failed to play audio', error);
            }
            clearInterval(timer);
            isStarted = false;
        }
    }, 1000);
}

function stopClock() {
    clearInterval(timer);
    isStopped = true;
}

function resetClock() {
    clearInterval(timer);
    isStopped = false;
    if(focusDefault === preferredBreak) {
        focusDuration = focusDefault;
    } else {
        focusDuration = preferredFocus;
    }
    secs = 60;
    clock.innerHTML = `${focusDuration}:00`;
    pageTitle.innerHTML = `Workspace`;
}

function updateClockAndTitle(mins, secs) {
    const paddedMinutes = mins.toString().padStart(2, '0');
    const paddedSeconds = secs.toString().padStart(2, '0');

    clock.innerHTML = `${paddedMinutes}:${paddedSeconds}`;
    pageTitle.innerHTML = `${paddedMinutes}:${paddedSeconds} - Workspace`;
}

function toggleSettings(state) {    
    if(state === 'on') {
        document.querySelector('form').style.display = 'grid';
        document.getElementById('focus-duration').value = preferredFocus;
        document.getElementById('break-duration').value = preferredBreak;
    } else {
        document.querySelector('form').style.display = 'none';
    }

}

function saveSettings() {
    if(!isStarted) {
        preferredFocus = document.getElementById('focus-duration').value;
        preferredBreak = document.getElementById('break-duration').value;
     
        focusDuration = preferredFocus;
        breakDuration = preferredBreak;

        document.querySelector('form').reset;
        updateClockAndTitle(focusDuration, 0);

        document.querySelector('form').reset;


    } else {
        if(confirm('You are about to reset your focus, are you sure?')) {
            preferredFocus = document.getElementById('focus-duration').value;
            preferredBreak = document.getElementById('break-duration').value;
                    
            focusDuration = preferredFocus;
            breakDuration = preferredBreak;
    
            updateClockAndTitle(focusDuration, 0);

            document.querySelector('form').reset;

            resetClock();
        }
    }

}
