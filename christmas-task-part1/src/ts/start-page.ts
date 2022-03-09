import toysPage from "./toys-page";

function startPage(): void {
  (
    document.querySelector(".main") as HTMLElement
  ).innerHTML = `<div class="start-page">
  <dir class="start-page__message">
    <p class="start-page__message_text">
      Помогите бабушке нарядить ёлку
    </p>
  </dir>
  <button class="start-page__btn">
    Начать
  </button>
</div>`;
  document.querySelector(".start-page__btn")?.addEventListener("click", () => {
    toysPage();
  });
}

export default startPage;
