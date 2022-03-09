import { Toy, IToy } from "./class-toy";

function renderToy(arr: Array<IToy>): void {
  Toy.setSelected = new Set(JSON.parse(String(localStorage.getItem("toys"))));
  const selectedCount = document.querySelector(
    ".header__selected"
  ) as HTMLElement;
  const toysGrid = document.querySelector(".toys__grid") as HTMLElement;
  selectedCount.textContent = `Игрушек в избранном: ${Toy.setSelected.size}`;
  toysGrid.innerHTML = "";
  if (arr.length === 0) {
    const message = document.createElement("p");
    message.className = "toys__messages";
    message.textContent = "Извините, совпадений не обнаружено :(";
    toysGrid.append(message);
  } else {
    arr.forEach((item) => {
      const itemToy = new Toy(item);
      const elementToy = itemToy.create();
      if (Toy.setSelected.has(+item.num)) {
        itemToy.select = true;
        elementToy.classList.add("toys__item-active");
      }
      toysGrid.append(elementToy);
    });
  }
}

function renderTreeToy(arr: Array<IToy>): Toy[] {
  Toy.setSelected = new Set(JSON.parse(String(localStorage.getItem("toys"))));
  const selectedCount = document.querySelector(
    ".header__selected"
  ) as HTMLElement;
  selectedCount.textContent = `Игрушек в избранном: ${Toy.setSelected.size}`;
  const toysGrid = document.querySelector(".tree-toys__grid") as HTMLElement;
  const instToys: Toy[] = [];
  let arrToy: IToy[] = [];
  toysGrid.innerHTML = "";
  if (Toy.setSelected.size === 0) {
    arrToy = arr.slice(0, 20);
  } else {
    arrToy = arr.filter((obj) => Toy.setSelected.has(Number(obj.num)));
  }
  arrToy.forEach((toyObj) => {
    const instToy = new Toy(toyObj);
    instToys.push(instToy);
    toysGrid.append(instToy.createElementTree());
  });
  return instToys;
}

function createSnowFlake() {
  const snowFlake = document.createElement("i");
  snowFlake.classList.add("fa-snowflake");
  snowFlake.style.left = `${Math.random() * window.innerWidth}px`;
  snowFlake.style.animationDuration = `${Math.random() * 3 + 2}s`; // between 2 - 5 seconds
  snowFlake.style.opacity = String(Math.random());
  snowFlake.style.fontSize = `${Math.random() * 30 + 20}px`;
  snowFlake.textContent = "*";

  document.querySelector(".snow-container")?.appendChild(snowFlake);

  setTimeout(() => {
    snowFlake.remove();
  }, 5000);
}

export { renderToy, renderTreeToy, createSnowFlake };
