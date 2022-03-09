import {
    createImage,
    clearApp,
    viewApp
} from "./function";
import { LevelPictures, LevelArtists } from "./levels";
import {scoreRender} from "./score";
import { arrAudio } from "..";

const Categories = class {
    constructor(type) {
        this.type = type;
        this.arrPic = [];
    }

    async getImg () {
        const arrSrc = [];
        const n = this.type === 1 ? 120 : 240;
        for (let i = n === 120 ? 0 : 120; i < n; i += 10) {
            const imgSrc = (await import(`../images/img/${i}.jpg`)).default;
            arrSrc.push(imgSrc);
        }
        for (const item of arrSrc) {
            const img = await createImage(item);
            this.arrPic.push(img);
        }
    }

    async render(app) {
        const arrImg = this.arrPic;
        await clearApp(app);
        const title = this.type === 1 ? 'Artists Quiz': 'Pictures Quiz';
        const strClass = this.type === 1 ? '': 'pic';
        app.innerHTML = `<div class="categr">
        <div class="categr-top">
        <img src="./images/imgUI/logo.svg" alt="quiz" class="categr-logo">
        <button class="home"><img class="home__img" src="./images/imgUI/home.svg" alt="home">home</button>
    </div>
    <h2 class="categr-title ${strClass}">${title}</h2>
    <div class="grid-container">
    </div>
    </div>`;
        const gritContainer = document.querySelector('.grid-container');
        arrImg.forEach((item, i) => {
            const num = this.type === 1?i:i+12;
            const objScore = JSON.parse(localStorage.getItem('score'));
            const categrItem = document.createElement('div');
            categrItem.classList.add('categr-item');
            categrItem.innerHTML = `<div class="categr-item__top">
            <h3 class="categr-item__title">${i+1}</h3>
            <button class="categr-item__score"></button>
            </div>`;
            const btnScore = categrItem.querySelector(`.categr-item__score`);
            item.classList.add('categr-item__img');
            if (objScore && num in objScore) {
                item.classList.add('categr-item__img-active');
                btnScore.textContent = `Score ${objScore[num]}/10`;
                btnScore.classList.add(`categr-item__score-active`);
                if (this.type === 2) {
                    btnScore.classList.add(`pic`, 'categr-item__score-active-pic');
                }
                btnScore.addEventListener('click', e =>{
                    e.stopPropagation();
                    arrAudio[0].play();
                    scoreRender(app, num, this.type);
                });
            }
            categrItem.append(item);
            categrItem.addEventListener('click', e => {
                arrAudio[0].play();
                this.newLevel = this.type === 1 ? new LevelArtists(i) :new LevelPictures(i);
                this.newLevel.render(app);
            });
            gritContainer.append(categrItem);
        });
        await viewApp(app);
    }
};

export {
    Categories
};