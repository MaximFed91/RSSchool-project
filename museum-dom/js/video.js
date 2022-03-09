const video = document.querySelector('video'),
    btnPlay = document.querySelector('.video__play'),
    btnCntlPlay = document.querySelector('.video__control--play'),
    btnCntlVolume = document.querySelector('.video__control--volume'),
    rangeVolume = document.querySelector('.video__volume'),
    progressVideo = document.querySelector('.video__progres'),
    btnFull = document.querySelector('.video__control--full'),
    controlPanel = document.querySelector('.video__control'),
    full = document.querySelector('.video__full'),
    iframes = document.querySelectorAll('iframe'),
    section = document.querySelector('.video'),
    topS = section.offsetTop,
    bottomS = section.offsetTop + section.offsetHeight;


let vol = 0,
    volB = true,
    mouseClick = false,
    pressed = new Set();


function updateRange(input) {
    input.style.background = `linear-gradient(to right, #710707 0%, #710707 ${input.value}%, #c4c4c4 ${input.value}%, #c4c4c4 100%)`;
}

function togglePlay() {
    if (video.paused) {
        video.play();
        btnPlay.style.display = 'none';
        btnCntlPlay.classList.replace('video__control--play', 'video__control--pause');
        pauseIframe();
    } else {
        video.pause();
        btnPlay.style.display = 'block';
        btnCntlPlay.classList.replace('video__control--pause', 'video__control--play');
    }
}

function toggleVolume() {
    if (video.muted) {
        video.muted = false;
        btnCntlVolume.classList.replace('video__control--mute', 'video__control--volume');
        if (video.volume === 0) {
            video.volume = 0.1;
            rangeVolume.value = 10;
            updateRange(rangeVolume);
            volB = false;
        }
    } else {
        video.muted = true;
        btnCntlVolume.classList.replace('video__control--volume', 'video__control--mute');
    }
    if (volB) {
        if (vol > 0) {
            rangeVolume.value = vol;
            updateRange(rangeVolume);
            vol = 0;
        } else {
            vol = +rangeVolume.value;
            rangeVolume.value = 0;
            updateRange(rangeVolume);
        }
    } else {
        volB = true;
    }
}

function toggleFull() {
    if (document.fullscreenElement === null) {
        full.requestFullscreen();
        btnFull.classList.replace('video__control--full', 'video__control--full-ex');
    } else {
        document.exitFullscreen();
        btnFull.classList.replace('video__control--full-ex', 'video__control--full');
    }
}

function speedPlay(str) {
    const span = document.createElement('span');
    span.classList.add('video__speed');
    if (str === '-') {
        video.playbackRate -= 0.25;
        if (video.playbackRate < 0.25) {
            video.playbackRate = 0.25;
        }
    }
    if (str === '+') {
        video.playbackRate += 0.25;
        if (video.playbackRate > 2) {
            video.playbackRate = 2;
        }
    }
    span.textContent = `x${video.playbackRate}`;
    full.appendChild(span);
    setTimeout(() => span.remove(), 700);
}

function pauseIframe() {
    iframes.forEach(item => {
        item.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    });
}

document.querySelectorAll('.video__control input').forEach(item => {
    item.addEventListener('input', function () {
        updateRange(this);
    });
});
rangeVolume.addEventListener('input', () => {
    if (+rangeVolume.value === 0) {
        toggleVolume();
    }
    if (+rangeVolume.value > 0 && btnCntlVolume.matches('.video__control--mute')) {
        toggleVolume();
    }
});
document.querySelector('.video').addEventListener('click', e => {
    if (e.target && (e.target == btnPlay || e.target == video || e.target == btnCntlPlay)) {
        togglePlay();
    }
    if (e.target && e.target == btnCntlVolume) {
        toggleVolume();
    }
    if (e.target && e.target == btnFull) {
        toggleFull();
    }
    if (e.target && e.target == progressVideo) {
        video.currentTime = (+progressVideo.value / 100) * video.duration;
    }

});
video.addEventListener('timeupdate', () => {
    if (video.ended) {
        btnPlay.style.display = 'block';
        btnCntlPlay.classList.replace('video__control--pause', 'video__control--play');
    }
    if (!video.paused) {
        progressVideo.value = (video.currentTime / video.duration) * 100;
        updateRange(progressVideo);
    }
});
controlPanel.addEventListener('mousemove', e => {
    if (e.target && e.target == rangeVolume) {
        video.volume = +rangeVolume.value / 100;
    }
    if (e.target && e.target == progressVideo && mouseClick) {
        video.currentTime = (+progressVideo.value / 100) * video.duration;
    }
});
progressVideo.addEventListener('mousedown', () => {
    video.pause();
    mouseClick = true;
});
progressVideo.addEventListener('mouseup', () => {
    mouseClick = false;
    video.play();
    btnPlay.style.display = 'none';
    btnCntlPlay.classList.replace('video__control--play', 'video__control--pause');
});
progressVideo.addEventListener('touchstart', () => {
    video.pause();
    mouseClick = true;
});
progressVideo.addEventListener('touchstop', () => {
    mouseClick = false;
    video.play();
    btnPlay.style.display = 'none';
    btnCntlPlay.classList.replace('video__control--play', 'video__control--pause');
});
document.addEventListener('keydown', e => {
    if (topS < window.scrollY && window.scrollY < bottomS) {
        pressed.add(e.keyCode);
        if (pressed.has(16) && pressed.has(188)) {
            speedPlay('-');
        }
        if (pressed.has(16) && pressed.has(190)) {
            speedPlay('+');
        }
        if (e.code === 'Space') {
            e.preventDefault();
            togglePlay();
        }
        if (e.code === 'KeyM') {
            toggleVolume();
        }
        if (e.code === 'KeyF') {
            toggleFull();
        }
        if (e.code == 'ArrowRight') {
            speedPlay('+');
        }
        if (e.code == 'ArrowLeft') {
            speedPlay('-');
        }
        if (e.code === 'KeyK') {
            togglePlay();
        }
        if (e.code === 'KeyJ') {
            video.currentTime -= 10;
        }
        if (e.code === 'KeyL') {
            video.currentTime += 10;
        }
        if (e.key === '1') {
            video.currentTime = video.duration * 0.1;
        }
        if (e.key === '2') {
            video.currentTime = video.duration * 0.2;
        }
        if (e.key === '3') {
            video.currentTime = video.duration * 0.3;
        }
        if (e.key === '4') {
            video.currentTime = video.duration * 0.4;
        }
        if (e.key === '5') {
            video.currentTime = video.duration * 0.5;
        }
        if (e.key === '6') {
            video.currentTime = video.duration * 0.6;
        }
        if (e.key === '8') {
            video.currentTime = video.duration * 0.8;
        }
        if (e.key === '7') {
            video.currentTime = video.duration * 0.7;
        }
        if (e.key === '9') {
            video.currentTime = video.duration * 0.9;
        }
        if (e.key === '0') {
            video.currentTime = 0;
        }
    }
});
document.addEventListener('keyup', (e) => {
    pressed.delete(e.keyCode);
});

$('.video__slider--inner').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    appendArrows: $('.video__slider--control'),
    appendDots: $('.video__slider--control'),
    prevArrow: ' <button class="video__slider--control_arrow video__slider--control_arrowL"></button>',
    nextArrow: '<button class="video__slider--control_arrow video__slider--control_arrowR"></button>',
    dots: true,
    dotsClass: 'video__slider--control_boolet',
    responsive: [{
        breakpoint: 956,
        settings: {
            slidesToShow: 2
        }
    }]
});

$('.video__slider--inner').on('afterChange', function (event, slick, currentSlide) {
    video.src = `assets/video/video${currentSlide}.mp4`;
    video.poster = `assets/video/poster${currentSlide}.jpg`;
    progressVideo.value = 0;
    updateRange(progressVideo);
    btnPlay.style.display = 'block';
    btnCntlPlay.classList.replace('video__control--pause', 'video__control--play');
    pauseIframe();
});