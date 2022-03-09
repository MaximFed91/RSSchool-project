const slider = document.querySelector('.explore__slider'),
    img = document.querySelector('.explore__img-container'),
    inner = document.querySelector('.explore__img-inner'),
    w = img.offsetWidth;
    

slider.addEventListener("mousedown", slideReady);
window.addEventListener("mouseup", slideFinish);
slider.addEventListener("touchstart", slideReady);
window.addEventListener("touchstop", slideFinish);

let click = false;
function slideReady(e) {
    e.preventDefault();
    click = true;
    window.addEventListener("mousemove", slideMove);
    window.addEventListener("touchmove", slideMove);
}
function slideFinish() {
    click = false;
}
function slideMove(e) {
    let pos;
    if (!click) return false;
    pos = getCursorPos(e);
    if (pos < 0) pos = 0;
    if (pos > w) pos = w;
    slide(pos);
}
function getCursorPos(e) {
    let rect, x = 0;
    e = e || window.event;
    rect = img.getBoundingClientRect();
    x = e.pageX - rect.left;
    return x;
}
function slide(x) {
    const dif = x - w * 0.027;
    inner.style.width = x + "px";
    slider.style.left = dif + "px";
}