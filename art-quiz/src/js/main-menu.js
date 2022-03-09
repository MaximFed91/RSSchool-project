import img1 from '../images/img/30.jpg';
import img2 from '../images/img/200.jpg';
import { getImageSrc } from './function';




async function renderMain(app) {
    const srcImg1 = await getImageSrc(img1);
    const srcImg2 = await getImageSrc(img2);
    app.innerHTML = `<main class="main-menu">
            <button class="setting-main"></button>
            <img src="images/imgUI/logo.svg" alt="logo" class="logo">
            <div class="inner-main">
                <button class="btn-artists" style="background-image: url(${srcImg1});"><span>artists quiz</span></button>
                <button class="btn-pictures" style="background-image: url(${srcImg2});"><span class="span-pic">pictures quiz</span></button>
            </div>
        </main>`;
    app.classList.remove('hide');
}


export {renderMain};
