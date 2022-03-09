import {clearApp, viewApp, settingAudio} from "./function";
import {renderMain} from "./main-menu";
import {arrAudio} from "..";

let mute = false;
function toggleVolume(btn) {
    if (mute) {
        mute = false;
        btn.classList.remove('volume__btn-mute');
    } else {
        mute = true;
        btn.classList.add('volume__btn-mute');
    }
}

async function renderSetting(app) {
    await clearApp(app);
    app.innerHTML = `<div class="settings">
    <div class="settings-top">
        <button class="back"><img class="back__img" src="./images/imgUI/arrow.svg" alt="back">back</button>
        <h2 class="settings__title">Settings</h2>
    </div>
    <p class="volume__title settings-label">Volume</p>
    <div class="volume">
        <button class="volume__btn"></button>
        <input type="range" class="volume__input" value="100" max="100" min="0">
    </div>
    <div class="time-game">
        <p class="time-game__label settings-label">Time game</p>
        <label class="switch">
            <input type="checkbox" class="time-check">
            <span class="slider"></span>
          </label>
    </div>
    <div class="time-answer">
        <p class="time-answer__label settings-label">Time to answer</p>
        <div class="time-answer__box">
            <button class="time-answer__btn minus"><span></span></button>
            <input type="number" class="time-answer__input" value="30">
            <button class="time-answer__btn plus">+</button>
        </div>
    </div>
    <button class="settings__save">Save</button>
</div>`;
    document.querySelector('.back').addEventListener('click', async e => {
        arrAudio[0].play();
        await clearApp(app);
        renderMain(app);
    });
     const volumeBtn = document.querySelector('.volume__btn');
     const volumeInput = document.querySelector('.volume__input');
     const timeCheck = document.querySelector('.time-check');
     const timeInput = document.querySelector('.time-answer__input');
     const minus = document.querySelector('.minus');
     const plus = document.querySelector('.plus');
     const saveBtn = document.querySelector('.settings__save');
     let objSettings = JSON.parse(localStorage.getItem('settings'));
    
     volumeBtn.addEventListener('click', e=> {
         arrAudio[0].play();
        toggleVolume(volumeBtn);
     });
    minus.addEventListener('click', e=> {
        if (timeInput.value >5) {
            timeInput.value -= 5;
        }
    });
    plus.addEventListener('click', e=> {
        if (timeInput.value < 30) {
            timeInput.value = +timeInput.value + 5;
        }
    });

     if (objSettings) {
        if (objSettings.muteAudio) {
            volumeBtn.classList.add('volume__btn-mute');
        }
        volumeInput.value = objSettings.volValue;
        timeCheck.checked = objSettings.timeGame;
        timeInput.value = objSettings.timeValue;
     } else {
        objSettings = {};
     }
     await viewApp(app);

    saveBtn.addEventListener('click', async e => {
        arrAudio[0].play();
        objSettings['muteAudio'] = mute;
        objSettings['volValue'] = volumeInput.value;
        objSettings['timeGame'] = timeCheck.checked; 
        objSettings['timeValue'] = timeInput.value;
        settingAudio(arrAudio, objSettings);
        localStorage.setItem('settings', JSON.stringify(objSettings));
        await clearApp(app);
        renderMain(app);
    });
}

export {renderSetting};