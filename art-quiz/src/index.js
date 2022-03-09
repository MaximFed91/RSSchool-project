import styles from './styles/style.scss';
import {
    renderMain
} from './js/main-menu';
import {
    Categories
} from './js/categrs';
import {
    clearApp, settingAudio
} from './js/function';
import {
    renderSetting
} from './js/setting';
import audioSrc1 from './audio/click.wav';
import audioSrc2 from './audio/correctanswer.mp3';
import audioSrc3 from './audio/wronganswer.mp3';
import audioSrc4 from './audio/endround.mp3';

const objSettings = JSON.parse(localStorage.getItem('settings'));
const arrSrc = [audioSrc1, audioSrc2, audioSrc3, audioSrc4];
const arrAudio = [];

arrSrc.forEach((item) => {
    const audio = document.createElement('audio');
    audio.src = item;
    arrAudio.push(audio);
});


const app = document.querySelector('.application');
const artistQuiz = new Categories(1);
const picturesQuiz = new Categories(2);


document.body.addEventListener('click', async e => {
    const target = e.target;
    if (target && target.matches('.btn-artists')) {
        arrAudio[0].play();
        artistQuiz.render(app);
    }
    if (target && target.matches('.btn-pictures')) {
        arrAudio[0].play();
        picturesQuiz.render(app);
    }
    if (target && target.matches('.home')) {
        arrAudio[0].play();
        if (artistQuiz.newLevel && artistQuiz.newLevel.timer){
            clearTimeout(artistQuiz.newLevel.timer);
        }
        if (picturesQuiz.newLevel && picturesQuiz.newLevel.timer){
            clearTimeout(picturesQuiz.newLevel.timer);
        }
        await clearApp(app);
        renderMain(app);
    }
    if (target && target.matches('.setting-main')) {
        arrAudio[0].play();
        renderSetting(app);
    }
});
renderMain(app);

if (objSettings) {
    settingAudio(arrAudio, objSettings);
}
artistQuiz.getImg();
picturesQuiz.getImg();


export {
    artistQuiz,
    picturesQuiz,
    arrAudio
};