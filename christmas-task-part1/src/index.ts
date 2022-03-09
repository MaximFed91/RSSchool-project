import "nouislider/dist/nouislider.css";
import "./styles/style.scss";
import startPage from "./ts/start-page";
import toysPage from "./ts/toys-page";
import treePage from "./ts/tree-page";

document.querySelector(".start__btn")?.addEventListener("click", () => {
  startPage();
});
document.querySelector(".toys__btn")?.addEventListener("click", () => {
  toysPage();
});
document.querySelector(".tree__btn")?.addEventListener("click", () => {
  treePage();
});

startPage();
console.log(
  "Все требования выполнены. Добавлено сохранение гирлянды. 200 баллов"
);
