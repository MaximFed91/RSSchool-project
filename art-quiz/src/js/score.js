import correctImg from "../images/imgUI/correct-answer.svg";
import wrongImg from "../images/imgUI/wrong-answer.svg";
import {
    clearApp,
    viewApp,
    getImgGit
} from './function';
import picInfo from '../picInfo.json';
import {artistQuiz, picturesQuiz} from '../index';
import {arrAudio} from '..';


async function scoreRender(app, number, typeQuiz) {
    const picNumArr = [];
    const imgNum = number * 10;
    const imgArr = [];
    const arrResult = JSON.parse(localStorage.getItem('result'))[number];
    const strClass = typeQuiz === 1 ? '': ' pic';
    await clearApp(app);
    for (let i = imgNum; i < (imgNum + 10); i++) {
        picNumArr.push(i);
        imgArr.push((await getImgGit(i)));
    }
    app.innerHTML = `<div class="score">
    <div class="level-top">
        <button class="back"><img class="back__img" src="./images/imgUI/arrow.svg" alt="back">back</button>
        <button class="home"><img class="home__img" src="./images/imgUI/home.svg" alt="home">home</button>
    </div>
    <h3 class="score__title${strClass}">score</h3>
    <div class="score__grid">
        
        </div>
    </div>`;
    const scoreGrid = document.querySelector('.score__grid');
    imgArr.forEach((item, i) => {
        const scoreItem = document.createElement('div');
        scoreItem.classList.add('score__item');
        scoreItem.innerHTML = `<div class="score__item-top">
        <h4 class="score__item-title${strClass}">${i+1}</h4> 
        <img src="./images/imgUI/correct-answer.svg" alt="" class="score__item-check">
     </div>`;
        if (arrResult[i] === 1) {
            scoreItem.querySelector('.score__item-check').src = correctImg;
            item.classList.add('score__img', 'score__img-correct');
        } else {
            scoreItem.querySelector('.score__item-check').src = wrongImg;
            item.classList.add('score__img');
        }
        scoreItem.append(item);
        scoreItem.insertAdjacentHTML('beforeend', `<div class="score__item-desc">
        <p>${picInfo[picNumArr[i]].name}</p>
        <p>${picInfo[picNumArr[i]].author}</p>
        <p>${picInfo[picNumArr[i]].year}</p>
        </div>`);
        scoreItem.addEventListener('click', e=> {
            arrAudio[0].play();
            scoreItem.querySelector('.score__item-desc').classList.toggle('score__item-desc--active');
        });
        scoreGrid.append(scoreItem);
    });
    document.querySelector('.back').addEventListener('click', e => {
        arrAudio[0].play();
        typeQuiz===1?artistQuiz.render(app):picturesQuiz.render(app);
    });
    await viewApp(app);
}

export {scoreRender};