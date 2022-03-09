import data from "../data";
import { createSnowFlake, renderTreeToy } from "./renders";

function treePage(): void {
  (
    document.querySelector(".main") as HTMLElement
  ).innerHTML = `<div class="tree-bg">
  <div class="container">
    <div class="tree">
      <div class="snow-container"></div>
      <section class="tree-settings">
        <div class="tree-settings__buttons">
          <button class="tree-settings__button audio-btn">
            <img src="./assets/svg/audio.svg" alt="audio" class="tree-settings__button-img">
          </button>
          <button class="tree-settings__button snow-btn">
            <img src="./assets/svg/snow.svg" alt="snow" class="tree-settings__button-img">
          </button>
        </div>
        <div class="tree-settings__trees">
          <h3 class="tree-settings__trees-title tree__title">
            выберите ёлку
          </h3>
          <div class="tree-settings__trees-inner">
            <button class="tree-settings__trees-item" data-src="1"><img src="./assets/tree/1.png"
                alt="tree"></button>
            <button class="tree-settings__trees-item" data-src="2"><img src="./assets/tree/2.png"
                alt="tree"></button>
            <button class="tree-settings__trees-item" data-src="3"><img src="./assets/tree/3.png"
                alt="tree"></button>
            <button class="tree-settings__trees-item" data-src="4"><img src="./assets/tree/4.png"
                alt="tree"></button>
          </div>
        </div>
        <div class="tree-settings__bg">
          <h3 class="tree-settings__bg-title tree__title">
            выберите фон
          </h3>
          <div class="tree-settings__bg-inner">
            <button class="tree-settings__bg-item" data-src="1"><img src="./assets/bg/1.jpg"
                alt="background"></button>
            <button class="tree-settings__bg-item" data-src="2"><img src="./assets/bg/2.jpg"
                alt="background"></button>
            <button class="tree-settings__bg-item" data-src="3"><img src="./assets/bg/3.jpg"
                alt="background"></button>
            <button class="tree-settings__bg-item" data-src="4"><img src="./assets/bg/4.jpg"
                alt="background"></button>
            <button class="tree-settings__bg-item" data-src="5"><img src="./assets/bg/5.jpg"
                alt="background"></button>
            <button class="tree-settings__bg-item" data-src="6"><img src="./assets/bg/6.jpg"
                alt="background"></button>
            <button class="tree-settings__bg-item" data-src="7"><img src="./assets/bg/7.jpg"
                alt="background"></button>
            <button class="tree-settings__bg-item" data-src="8"><img src="./assets/bg/8.jpg"
                alt="background"></button>
          </div>
        </div>
        <div class="tree-settings__lights">
          <h3 class="tree-settings__lights-title tree__title">
            гирлянда
          </h3>
          <div class="tree-settings__lights-inner">
            <button class="tree-settings__lights-item tree-settings__lights-color"></button>
            <button class="tree-settings__lights-item tree-settings__lights-red" data-color="red"></button>
            <button class="tree-settings__lights-item tree-settings__lights-blue" data-color="blue"></button>
            <button class="tree-settings__lights-item tree-settings__lights-green" data-color="green"></button>
            <button class="tree-settings__lights-item tree-settings__lights-yellow" data-color="yellow"></button>
            <label class="tree-settings__lights-switch">
              <input class="tree-settings__lights-checkbox" type="checkbox">
              <span class="tree-settings__lights-slider"></span>
            </label>
          </div>
        </div>
        <button class="filter__button tree-settings__reset">Сброс настроек</button>
      </section>
      <section class="tree-tree">
        <div class="tree-tree__inner">
          <map name="image-map">
            <area class="area" target="" alt="" title="" href=""
              coords="121,671,351,675,445,668,483,546,437,461,381,347,365,287,353,218,335,131,287,69,256,15,212,66,174,138,126,228,94,360,60,452,35,554,67,631"
              shape="poly">
          </map>
          <img class="tree-tree__img" usemap="#image-map" src="./assets/tree/1.png" alt="Christmas Tree">
          <ul class="lightrope lights1 hide-lights">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <ul class="lightrope lights2 hide-lights">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <ul class="lightrope lights3 hide-lights">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <ul class="lightrope lights4 hide-lights">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </section>
      <section class="tree-toys">
        <h3 class="tree-toys__title tree__title">игрушки</h3>
        <div class="tree-toys__grid">
          
        </div>
      </section>
      <audio class="audio" src="./assets/audio/audio.mp3"></audio>
    </div>
  </div>
</div>`;

  const treeBtns = document.querySelectorAll(".tree-settings__trees-item");
  const bgBtns = document.querySelectorAll(".tree-settings__bg-item");
  const lightsCheckbox = document.querySelector(
    ".tree-settings__lights-checkbox"
  ) as HTMLInputElement;
  const lights = document.querySelectorAll(".lightrope");
  const treeImg = document.querySelector(".tree-tree__img") as HTMLImageElement;
  const treeBg = document.querySelector(".tree-tree") as HTMLElement;
  const area = document.querySelector(".area");
  const audio = document.querySelector(".audio") as HTMLAudioElement;
  const audioBtn = document.querySelector(".audio-btn");
  const snowBtn = document.querySelector(".snow-btn");
  const lightsBtns = document.querySelectorAll(".tree-settings__lights-item");
  const treeContainer = document.querySelector(".tree-tree__inner");
  const treeResetBtn = document.querySelector(".tree-settings__reset");

  let toysNumber = 0;
  let timer = setInterval(createSnowFlake, 50);
  clearInterval(timer);
  let settings = {
    audio: false,
    snow: false,
    tree: "1",
    background: "1",
    lights: [false, ""],
  };

  const arrToy = renderTreeToy(data);
  if (localStorage.getItem("settings")) {
    settings = JSON.parse(String(localStorage.getItem("settings")));
  }
  treeImg.src = `./assets/tree/${settings.tree}.png`;
  treeBg.style.backgroundImage = `url(./assets/bg/${settings.background}.jpg)`;
  if (settings.snow) timer = setInterval(createSnowFlake, 50);
  if (settings.audio) audio.play();

  treeBtns.forEach((item) => {
    const btn = item as HTMLElement;
    btn.addEventListener("click", () => {
      treeImg.src = `./assets/tree/${btn.dataset.src}.png`;
      settings.tree = String(btn.dataset.src);
      localStorage.setItem("settings", JSON.stringify(settings));
    });
  });

  bgBtns.forEach((item) => {
    const btn = item as HTMLElement;
    btn.addEventListener("click", () => {
      treeBg.style.backgroundImage = `url(./assets/bg/${btn.dataset.src}.jpg)`;
      settings.background = String(btn.dataset.src);
      localStorage.setItem("settings", JSON.stringify(settings));
    });
  });

  area?.addEventListener("click", (e) => {
    e.preventDefault();
  });
  area?.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  area?.addEventListener("drop", (e) => {
    const num = (e as DragEvent).dataTransfer?.getData("num");
    const type = (e as DragEvent).dataTransfer?.getData("type");
    const [inst] = arrToy.filter((item) => item.num === num);
    if (type === "1") {
      inst.count = `${+inst.count - 1}`;
      if (inst.count === "0") {
        inst.img.remove();
      }
      inst.span.textContent = inst.count;
      const img = document.createElement("img");
      img.src = `./assets/toys/${inst.num}.png`;
      img.className = "tree-tree__drop";
      img.dataset.number = `${toysNumber}`;
      img.style.top = `${(e as DragEvent).offsetY}px`;
      img.style.left = `${(e as DragEvent).offsetX - 20}px`;
      img?.addEventListener("dragstart", (event) => {
        event.dataTransfer?.setData("num", inst.num);
        event.dataTransfer?.setData("type", "2");
        event.dataTransfer?.setData("number", `${img.dataset.number}`);
      });
      treeContainer?.append(img);
      toysNumber += 1;
    } else {
      const treeToy = document.querySelector(
        `[data-number="${(e as DragEvent).dataTransfer?.getData("number")}"]`
      ) as HTMLElement;
      treeToy.style.top = `${(e as DragEvent).offsetY}px`;
      treeToy.style.left = `${(e as DragEvent).offsetX - 20}px`;
    }
  });

  audio.addEventListener("timeupdate", () => {
    if (audio.ended) audio.play();
  });

  audioBtn?.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      settings.audio = true;
    } else {
      audio.pause();
      settings.audio = false;
    }
    localStorage.setItem("settings", JSON.stringify(settings));
  });

  snowBtn?.addEventListener("click", () => {
    if (settings.snow) {
      clearInterval(timer);
      settings.snow = false;
    } else {
      settings.snow = true;
      timer = setInterval(createSnowFlake, 50);
    }
    localStorage.setItem("settings", JSON.stringify(settings));
  });

  lightsCheckbox?.addEventListener("change", () => {
    if (lightsCheckbox.checked) {
      lights.forEach((item) => {
        item.classList.remove("hide-lights");
      });
    } else {
      lights.forEach((item) => {
        item.classList.add("hide-lights");
      });
    }
    settings.lights[0] = lightsCheckbox.checked;
    localStorage.setItem("settings", JSON.stringify(settings));
  });

  lightsBtns.forEach((btnLights) => {
    const btn = btnLights as HTMLElement;
    btnLights.addEventListener("click", () => {
      if (!lightsCheckbox.checked) {
        lightsCheckbox.checked = true;
        lightsCheckbox.dispatchEvent(new Event("change"));
      }
      lights.forEach((item) => {
        item.classList.remove(
          "lights-red",
          "lights-blue",
          "lights-green",
          "lights-yellow"
        );
        if (btn.dataset.color) {
          item.classList.add(`lights-${btn.dataset.color}`);
          settings.lights = [true, btn.dataset.color];
        } else {
          settings.lights = [true, ""];
        }
      });
      localStorage.setItem("settings", JSON.stringify(settings));
    });
  });

  if (settings.lights[0]) {
    lightsCheckbox.checked = true;
    lightsCheckbox.dispatchEvent(new Event("change"));
    lights.forEach((item) => {
      item.classList.remove(
        "lights-red",
        "lights-blue",
        "lights-green",
        "lights-yellow"
      );
      if (settings.lights[1]) {
        item.classList.add(`lights-${settings.lights[1]}`);
      }
    });
  }

  treeResetBtn?.addEventListener("click", () => {
    localStorage.removeItem("settings");
    clearInterval(timer);
    treePage();
  });
}

export default treePage;
