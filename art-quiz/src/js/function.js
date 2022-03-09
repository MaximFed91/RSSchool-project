const getImageSrc = (src) => new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => res(src);
    img.onerror = rej;
    img.src = src;
});

const createImage = (src) => new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = src;
});

const clearApp = (app) => new Promise((res, rej) => {
    app.classList.add('hide');
    setTimeout(res, 700);
});
const viewApp = (app) => new Promise((res, rej) => {
    app.classList.remove('hide');
    setTimeout(res, 700);
});

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

const shuffle =  (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

const getImgGit = (num) => new Promise((res, rej) => {
    const img = new Image();
    const src = `https://raw.githubusercontent.com/MaximFed91/image-data/master/img/${num}.jpg`;
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = src;
});

const settingAudio = (arrSounds, objSet) => {
    arrSounds.forEach((item) => {
        item.muted = objSet.muteAudio;
        item.volume = objSet.volValue / 100;
    });
};

export {getImageSrc, clearApp, createImage, viewApp, getRandomInt, getImgGit, shuffle, settingAudio};