import noUiSlider, { target } from "nouislider";
import { renderToy } from "./renders";
import {
  toggleFilterBtn,
  filters,
  ISetFilters,
  IObj,
  IObjSet,
  IRange,
} from "./filters";
import data from "../data";

function toysPage(): void {
  (
    document.querySelector(".main") as HTMLElement
  ).innerHTML = `<div class="container">
  <div class="toys__inner">
    <aside class="filter">
      <div class="filter__search_inner">
        <input type="text" class="filter__search" placeholder="Поиск" autofocus>
        <button class="filter__search_reset">
          <span></span><span></span>
        </button>
      </div>
      <div class="filter__sorting">
        <p class="filter__sorting_title filter__text-title">сортировать</p>
        <select name="sort" class="filter__sorting_select">
          <option value="1" selected>По названия от "А" до "Я"</option>
          <option value="2">По названия от "Я" до "А"</option>
          <option value="3">По году приобретения по возрастанию</option>
          <option value="4">По году приобретения по убыванию</option>
        </select>
      </div>
      <h3 class="filter__title filter__text-title">фильтр:</h3>
      <div class="filter__shape">
        <p class="filter__shape_title">Форма</p>
        <div class="filter__shape_inner">
          <button class="filter__shape_btn" data-shape="шар"><img src="./assets/svg/ball.svg" alt="ball">Шар</button>
          <button class="filter__shape_btn" data-shape="колокольчик"><img src="./assets/svg/bell.svg" alt="bell">Колокол</button>
          <button class="filter__shape_btn" data-shape="шишка"><img src="./assets/svg/cone.svg" alt="cone">Шишка</button>
          <button class="filter__shape_btn" data-shape="снежинка"><img src="./assets/svg/snowflake.svg" alt="snowflake">Снежинка</button>
          <button class="filter__shape_btn" data-shape="фигурка"><img src="./assets/svg/toy.svg" alt="bear">Фигурка</button>
        </div>
      </div>
      <div class="filter__amount">
        <p class="filter__amount_title">Количество штук</p>
        <div class="filter__amount_range"></div>
        <div class="filter__amount_range-container value-container">
          <p class="filter__amount_range-value">1</p>
          <p class="filter__amount_range-value">12</p>
        </div>
      </div>
      <div class="filter__year">
        <p class="filter__year_title">Год приобретения</p>
        <div class="filter__year_range"></div>
        <div class="filter__year_range-container value-container">
          <p class="filter__year_range-value">1940</p>
          <p class="filter__year_range-value">2020</p>
        </div>
      </div>
      <div class="filter__color">
        <p class="filter__color_title">Цвет</p>
        <div class="filter__color_inner">
          <button class="filter__color_btn white" data-color="белый"></button>
          <button class="filter__color_btn yellow" data-color="желтый"></button>
          <button class="filter__color_btn red" data-color="красный"></button>
          <button class="filter__color_btn blue" data-color="синий"></button>
          <button class="filter__color_btn green" data-color="зелёный"></button>
        </div>
      </div>
      <div class="filter__size">
        <p class="filter__size_title">Размер</p>
        <div class="filter__size_inner">
          <button class="filter__size_btn big" data-size="большой"><img src="./assets/svg/ball-2.svg" alt="ball">Большой</button>
          <button class="filter__size_btn medium" data-size="средний"><img src="./assets/svg/ball-2.svg" alt="ball">Средний</button>
          <button class="filter__size_btn small" data-size="малый"><img src="./assets/svg/ball-2.svg" alt="ball">Маленький</button>
        </div>
      </div>
      <div class="filter__favorites">
        <span class="filter__favorites_title">Только любимые</span>
        <input type="checkbox" id="favorites" class="filter__favorites_checkbox">
        <label for="favorites" class="filter__favorites_label"></label>
      </div>
      <button class="filter__button filter__reset">Сбросить фильтр</button>
      <button class="filter__button filter__storage">Сбросить Local Storage</button>
    </aside>
    <section class="toys">
      <h2 class="toys__title">игрушки</h2>
      <div class="toys__grid">
      </div>
    </section>
  </div>
</div>`;

  const amountRange = document.querySelector(".filter__amount_range") as target;
  const yearRange = document.querySelector(".filter__year_range") as target;
  const amountRangeValue = document.querySelectorAll(
    ".filter__amount_range-value"
  );
  const yearRangeValue = document.querySelectorAll(".filter__year_range-value");
  const inputSearch = document.querySelector(
    ".filter__search"
  ) as HTMLInputElement;
  const sortSelect = document.querySelector(
    ".filter__sorting_select"
  ) as HTMLSelectElement;
  const shapeBtns = document.querySelectorAll(".filter__shape_btn");
  const colorBtns = document.querySelectorAll(".filter__color_btn");
  const sizeBtns = document.querySelectorAll(".filter__size_btn");
  const favoritesInput = document.querySelector(
    "#favorites"
  ) as HTMLInputElement;
  const resetBtn = document.querySelector(".filter__reset");
  const resetStorage = document.querySelector(".filter__storage");
  const resetSeach = document.querySelector(".filter__search_reset");

  noUiSlider.create(amountRange, {
    start: [1, 12],
    step: 1,
    connect: true,
    range: {
      min: 1,
      max: 12,
    },
  });

  noUiSlider.create(yearRange, {
    start: [1940, 2020],
    step: 10,
    connect: true,
    range: {
      min: 1940,
      max: 2020,
    },
  });

  const objSet: IObjSet = {
    shape: {},
    color: {},
    size: {},
  };
  const rangeSet: IRange = {
    count: ["1", "12"],
    year: ["1940", "2020"],
  };

  let settingsFilters: ISetFilters = {
    btnFilter: objSet,
    rangeFilter: rangeSet,
    favorites: false,
  };

  let sortType = 0;

  if (localStorage.getItem("filters")) {
    settingsFilters = JSON.parse(String(localStorage.getItem("filters")));
  } else {
    localStorage.setItem("filters", JSON.stringify(settingsFilters));
  }
  sortType = Number(localStorage.getItem("sort"));

  renderToy(filters(data, settingsFilters, sortType));
  amountRange.noUiSlider?.set(settingsFilters.rangeFilter.count);
  yearRange.noUiSlider?.set(settingsFilters.rangeFilter.year);
  sortSelect.selectedIndex = sortType;
  favoritesInput.checked = settingsFilters.favorites;
  (
    Object.keys(settingsFilters.btnFilter.color).map((item) =>
      Number(item)
    ) as Array<keyof IObj>
  ).forEach((item) => {
    colorBtns[item].classList.add("filter__color_btn-active");
  });
  (
    Object.keys(settingsFilters.btnFilter.shape).map((item) =>
      Number(item)
    ) as Array<keyof IObj>
  ).forEach((item) => {
    shapeBtns[item].classList.add("filter__shape_btn-active");
  });
  (
    Object.keys(settingsFilters.btnFilter.size).map((item) =>
      Number(item)
    ) as Array<keyof IObj>
  ).forEach((item) => {
    sizeBtns[item].classList.add("filter__size_btn-active");
  });

  inputSearch?.addEventListener("input", () => {
    renderToy(filters(data, settingsFilters, sortType, inputSearch.value));
  });

  sortSelect?.addEventListener("input", () => {
    sortType = sortSelect.selectedIndex;
    localStorage.setItem("sort", String(sortType));
    renderToy(filters(data, settingsFilters, sortType, inputSearch.value));
  });

  shapeBtns.forEach((item, i) => {
    item.addEventListener("click", () => {
      const btn = item as HTMLButtonElement;
      const shape = String(btn.dataset.shape);
      settingsFilters.btnFilter.shape = toggleFilterBtn(btn, i, shape, "shape");
      localStorage.setItem("filters", JSON.stringify(settingsFilters));
      renderToy(filters(data, settingsFilters, sortType, inputSearch.value));
    });
  });

  colorBtns.forEach((item, i) => {
    item.addEventListener("click", () => {
      const btn = item as HTMLButtonElement;
      const color = String(btn.dataset.color);
      settingsFilters.btnFilter.color = toggleFilterBtn(btn, i, color, "color");
      localStorage.setItem("filters", JSON.stringify(settingsFilters));
      renderToy(filters(data, settingsFilters, sortType, inputSearch.value));
    });
  });

  sizeBtns.forEach((item, i) => {
    item.addEventListener("click", () => {
      const btn = item as HTMLButtonElement;
      const size = String(btn.dataset.size);
      settingsFilters.btnFilter.size = toggleFilterBtn(btn, i, size, "size");
      localStorage.setItem("filters", JSON.stringify(settingsFilters));
      renderToy(filters(data, settingsFilters, sortType, inputSearch.value));
    });
  });

  amountRange.noUiSlider?.on("update", (values, handle) => {
    amountRangeValue[handle].textContent = String(values[handle]).slice(0, -3);
    const range = amountRange.noUiSlider?.get() as string[];
    settingsFilters.rangeFilter.count = range;
    renderToy(filters(data, settingsFilters, sortType, inputSearch.value));
  });

  yearRange.noUiSlider?.on("update", (values, handle) => {
    yearRangeValue[handle].textContent = String(values[handle]).slice(0, -3);
    const range = yearRange.noUiSlider?.get() as string[];
    settingsFilters.rangeFilter.year = range;
    renderToy(filters(data, settingsFilters, sortType, inputSearch.value));
  });

  amountRange.noUiSlider?.on("change", () => {
    localStorage.setItem("filters", JSON.stringify(settingsFilters));
  });

  yearRange.noUiSlider?.on("change", () => {
    localStorage.setItem("filters", JSON.stringify(settingsFilters));
  });

  favoritesInput?.addEventListener("change", () => {
    settingsFilters.favorites = favoritesInput.checked;
    localStorage.setItem("filters", JSON.stringify(settingsFilters));
    renderToy(filters(data, settingsFilters, sortType, inputSearch.value));
  });

  resetBtn?.addEventListener("click", () => {
    localStorage.removeItem("filters");
    toysPage();
  });

  resetSeach?.addEventListener("click", () => {
    inputSearch.value = "";
    renderToy(filters(data, settingsFilters, sortType, inputSearch.value));
  });

  resetStorage?.addEventListener("click", () => {
    localStorage.clear();
    toysPage();
  });
}

export default toysPage;
