import picInfo from '../picInfo.json';
import {
    getRandomInt,
    getImgGit,
    shuffle
} from './function';
import {
    clearApp,
    viewApp
} from './function';
import {
    artistQuiz, picturesQuiz, arrAudio
} from '..';
import svgCorrect from '../images/imgUI/correct.svg';
import svgUncorrect from '../images/imgUI/uncorrect.svg';

const LevelPictures = class {
    constructor(number) {
        this.levelNum = number + 12;
        this.number = (number * 10) + 120;
        this.dots = [];
        this.round = 0;
        this.total = 0;
        const objSet = JSON.parse(localStorage.getItem('settings'));
        if (objSet) {
            this.timeGame = objSet.timeGame;
            this.timeSet = objSet.timeValue;
            this.timerValue = objSet.timeValue;
        }
    }

    timerGame(element) {
        element.textContent = this.timerValue;
        this.timerValue --;
        if (this.timerValue >= 0) {
           this.timer = setTimeout((el) => {
               this.timerGame(el);
           }, 1000, element);
        } else {
            this.timerValue = this.timeSet;
            this.wrongAnswer.dispatchEvent(new Event('click'));
        }
        
    }

    async render(app) {
        await clearApp(app);
        const ansversArr = [this.number];
        const author = picInfo[this.number].author;
        const authorArr = [author];
        const imgArr = [];
        while (ansversArr.length < 4) {
            const randomNum = getRandomInt(0, 241);
            if (!authorArr.includes(picInfo[randomNum].author)) {
                ansversArr.push(randomNum);
                authorArr.push(picInfo[randomNum].author);
            }
        }
        shuffle(ansversArr);
        for (const n of ansversArr) {
            imgArr.push((await getImgGit(n)));
        }
        app.innerHTML = `<div class="level__wrapper">
        <div class="level-top">
            <button class="back"><img class="back__img" src="./images/imgUI/arrow.svg" alt="back">back</button>
            <p class="timer"></p>
            <button class="home"><img class="home__img" src="./images/imgUI/home.svg" alt="home">home</button>
        </div>
        <p class="question pic">Which is ${author} picture?</p>
        <div class="ansvers__container ansvers-pictires__container">
        </div>
        <ul class="dots">
            <li class="dots__item"></li>
            <li class="dots__item"></li>
            <li class="dots__item"></li>
            <li class="dots__item"></li>
            <li class="dots__item"></li>
            <li class="dots__item"></li>
            <li class="dots__item"></li>
            <li class="dots__item"></li>
            <li class="dots__item"></li>
            <li class="dots__item"></li>
        </ul>
            <div class="popup__container">
                <div class="popup">
                    <img src="./images/imgUI/correct.svg" alt="" class="popup__check">
                    <h3 class="popup__title">${picInfo[this.number].name}</h3>
                    <p class="popup__author">${author}, ${picInfo[this.number].year}</p>
                    <button class="popup__next popup__next-pic">Next</button>
                </div>
            </div>
        </div>`;
        const timerElement = document.querySelector('.timer');
        if (this.timeGame) {
            timerElement.classList.add('timer-active');
            this.timerGame(timerElement);
        }
        const popupContainer = document.querySelector('.popup__container');
        const dotItems = document.querySelectorAll('.dots__item');
        this.dots.forEach((item, i) => {
            dotItems[i].classList.add(item === 0 ? 'dots__item-uncorr' : 'dots__item-corr');
        });
        const backBtn = document.querySelector('.back');
        backBtn.addEventListener('click', e => {
            arrAudio[0].play();
            clearTimeout(this.timer);
            picturesQuiz.render(app);
        });
        const ansversContainer = document.querySelector('.ansvers-pictires__container');
        imgArr.forEach((item, i) => {
            const ansverItem = document.createElement('div');
            if (ansversArr[i] != this.number) {
                this.wrongAnswer = ansverItem;
            }
            ansverItem.addEventListener('click', async e => {
                arrAudio[0].play();
                clearTimeout(this.timer);
                this.timerValue = this.timeSet;
                const check = document.querySelector('.popup__check');
                const popup = document.querySelector('.popup');
                const img = await getImgGit(this.number);
                img.classList.add('popup__img');
                popup.prepend(img);
                if (ansversArr[i] === this.number) {
                    check.src = svgCorrect;
                    this.dots.push(1);
                    this.total++;
                    arrAudio[1].play();
                } else {
                    check.src = svgUncorrect;
                    this.dots.push(0);
                    arrAudio[2].play();
                }
                popupContainer.classList.add('popup-active');

            });
            ansverItem.classList.add('ansvers-pictires', 'ansvers__item');
            ansverItem.append(item);
            ansversContainer.append(ansverItem);
        });
        await viewApp(app);
        const nextBtn = document.querySelector('.popup__next');
        nextBtn.addEventListener('click', e => {
            arrAudio[0].play();
            this.number++;
            this.round++;
            if (this.round < 10) {
                this.render(app);
            } else {
                arrAudio[3].play();
                this.renderScore(app, this.total);
            }
        });
    }
    async renderScore(app, total) {
        await clearApp(app);
        app.innerHTML = `<div class="total">
        <p class="total__title">Your score:</p>
        <p class="total__num pic">${total}/10</p>
        <p class="total__mess pic">Try again!</p>
        <div class="total__btn">
            <button class="back"><img class="back__img" src="./images/imgUI/arrow.svg" alt="back">back</button>
            <button class="home"><img class="home__img" src="./images/imgUI/home.svg" alt="home">home</button>
        </div>
         </div>`;
        document.querySelector('.back').addEventListener('click', e => {
            arrAudio[0].play();
            picturesQuiz.render(app);
        });
        await viewApp(app);
        let objScore = {};
        let objResult = {};
        if (localStorage.getItem('score')) {
             objScore = JSON.parse(localStorage.getItem('score'));
             objResult = JSON.parse(localStorage.getItem('result'));
        } 
        objScore[this.levelNum] = total;
        objResult[this.levelNum] = this.dots;
        localStorage.setItem('score', JSON.stringify(objScore));
        localStorage.setItem('result', JSON.stringify(objResult));
    }
};

const LevelArtists = class {
    constructor(number) {
        this.levelNum = number;
        this.number = (number * 10);
        this.dots = [];
        this.round = 0;
        this.total = 0;
        const objSet = JSON.parse(localStorage.getItem('settings'));
        if (objSet) {
            this.timeGame = objSet.timeGame;
            this.timeSet = objSet.timeValue;
            this.timerValue = objSet.timeValue;
        }
    }

    timerGame(element) {
        element.textContent = this.timerValue;
        this.timerValue --;
        if (this.timerValue >= 0) {
           this.timer = setTimeout((el) => {
               this.timerGame(el);
           }, 1000, element);
        } else {
            this.timerValue = this.timeSet;
            this.wrongAnswer.dispatchEvent(new Event('click'));
        }
        
    }

    async render(app) {
        await clearApp(app);
        const ansversArr = [this.number];
        const author = picInfo[this.number].author;
        const authorArr = [author];
        const imgQuestion = await getImgGit(this.number);
        while (ansversArr.length < 4) {
            const randomNum = getRandomInt(0, 241);
            if (!authorArr.includes(picInfo[randomNum].author)) {
                ansversArr.push(randomNum);
                authorArr.push(picInfo[randomNum].author);
            }
        }
        shuffle(ansversArr);
        app.innerHTML = `<div class="level__wrapper">
        <div class="level-top">
            <button class="back"><img class="back__img" src="./images/imgUI/arrow.svg" alt="back">back</button>
            <p class="timer"></p>
            <button class="home"><img class="home__img" src="./images/imgUI/home.svg" alt="home">home</button>
        </div>
        <p class="question">Who is the author of this picture?</p>
        <div class="question-img__inner">
            
        </div>
        <ul class="dots">
            <li class="dots__item"></li>
            <li class="dots__item"></li>
            <li class="dots__item"></li>
            <li class="dots__item"></li>
            <li class="dots__item"></li>
            <li class="dots__item"></li>
            <li class="dots__item"></li>
            <li class="dots__item"></li>
            <li class="dots__item"></li>
            <li class="dots__item"></li>
        </ul>
        <div class="ansvers__container">
        </div>
            <div class="popup__container">
                <div class="popup">
                    <img src="./images/imgUI/correct.svg" alt="" class="popup__check">
                    <h3 class="popup__title">${picInfo[this.number].name}</h3>
                    <p class="popup__author">${author}, ${picInfo[this.number].year}</p>
                    <button class="popup__next">Next</button>
                </div>
            </div>
        </div>`;
        const timerElement = document.querySelector('.timer');
        if (this.timeGame) {
            timerElement.classList.add('timer-active');
            this.timerGame(timerElement);
        }
        imgQuestion.classList.add('question-img');
        document.querySelector('.question-img__inner').append(imgQuestion);
        const popupContainer = document.querySelector('.popup__container');
        const dotItems = document.querySelectorAll('.dots__item');
        this.dots.forEach((item, i) => {
            dotItems[i].classList.add(item === 0 ? 'dots__item-uncorr' : 'dots__item-corr');
        });
        const backBtn = document.querySelector('.back');
        backBtn.addEventListener('click', e => {
            arrAudio[0].play();
            clearTimeout(this.timer);
            artistQuiz.render(app);
        });
        const ansversContainer = document.querySelector('.ansvers__container');
        ansversArr.forEach((item, i) => {
            const ansverItem = document.createElement('div');
            if (ansversArr[i] != this.number) {
                this.wrongAnswer = ansverItem;
            }
            ansverItem.addEventListener('click', async e => {
                arrAudio[0].play();
                clearTimeout(this.timer);
                this.timerValue = this.timeSet;
                const check = document.querySelector('.popup__check');
                const popup = document.querySelector('.popup');
                const img = await getImgGit(this.number);
                img.classList.add('popup__img');
                popup.prepend(img);
                if (ansversArr[i] === this.number) {
                    check.src = svgCorrect;
                    this.dots.push(1);
                    this.total++;
                    arrAudio[1].play();
                } else {
                    check.src = svgUncorrect;
                    this.dots.push(0);
                    arrAudio[2].play();
                }
                popupContainer.classList.add('popup-active');

            });
            ansverItem.classList.add('ansvers__item');
            const pAnsver = document.createElement('p');
            pAnsver.textContent = picInfo[item].author;
            ansverItem.append(pAnsver);
            ansversContainer.append(ansverItem);
        });
        await viewApp(app);
        const nextBtn = document.querySelector('.popup__next');
        nextBtn.addEventListener('click', e => {
            arrAudio[0].play();
            this.number++;
            this.round++;
            if (this.round < 10) {
                this.render(app);
            } else {
                arrAudio[3].play();
                this.renderScore(app, this.total);
            }
        });
    }
    async renderScore(app, total) {
        await clearApp(app);
        app.innerHTML = `<div class="total">
        <p class="total__title">Your score:</p>
        <p class="total__num">${total}/10</p>
        <p class="total__mess">Try again!</p>
        <div class="total__btn">
            <button class="back"><img class="back__img" src="./images/imgUI/arrow.svg" alt="back">back</button>
            <button class="home"><img class="home__img" src="./images/imgUI/home.svg" alt="home">home</button>
        </div>
         </div>`;
        document.querySelector('.back').addEventListener('click', e => {
            arrAudio[0].play();
            artistQuiz.render(app);
        });
        await viewApp(app);
        let objScore = {};
        let objResult = {};
        if (localStorage.getItem('score')) {
             objScore = JSON.parse(localStorage.getItem('score'));
             objResult = JSON.parse(localStorage.getItem('result'));
        } 
        objScore[this.levelNum] = total;
        objResult[this.levelNum] = this.dots;
        localStorage.setItem('score', JSON.stringify(objScore));
        localStorage.setItem('result', JSON.stringify(objResult));
    }
};

export {
    LevelPictures, LevelArtists
};