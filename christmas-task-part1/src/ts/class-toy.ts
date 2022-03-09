interface IToy {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}

class Toy {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
  select: boolean;
  element: HTMLElement;
  elementTree: HTMLElement;
  span: HTMLElement;
  img: HTMLImageElement;

  constructor(obj: IToy) {
    this.num = obj.num;
    this.name = obj.name;
    this.count = obj.count;
    this.year = obj.year;
    this.shape = obj.shape;
    this.color = obj.color;
    this.size = obj.size;
    this.favorite = obj.favorite;
    this.select = false;
    this.element = document.createElement("div");
    this.elementTree = document.createElement("div");
    this.span = document.createElement("span");
    this.img = document.createElement("img");
  }

  static setSelected: Set<number> = new Set();
  static addSelect(num: number): boolean {
    if (Toy.setSelected.size < 20) {
      Toy.setSelected.add(num);
      return true;
    }
    return false;
  }

  create(): HTMLElement {
    const selectedCount = document.querySelector(
      ".header__selected"
    ) as HTMLElement;
    this.element.className = "toys__item";
    this.element.innerHTML = ` <h4 class="toys__item_title">${this.name}</h4>
    <div class="toys__item_img-container">
      <img src="./assets/toys/${this.num}.png" alt="toy" class="toys__item_img">
    </div>
    <p class="toys__item_description toys__item_amount">Количество: ${
      this.count
    }</p>
    <p class="toys__item_description toys__item_year">Год покупки: ${
      this.year
    } год</p>
    <p class="toys__item_description toys__item_shape">Форма игрушки: ${
      this.shape
    }</p>
    <p class="toys__item_description toys__item_color">Цвет игрушки: ${
      this.color
    }</p>
    <p class="toys__item_description toys__item_size">Размер игрушки: ${
      this.size
    }</p>
    <p class="toys__item_description toys__item_favorite">Любимая: ${
      this.favorite ? "да" : "нет"
    }</p>`;
    this.element.addEventListener("click", () => {
      this.toggleSelect(this.element);
      selectedCount.textContent = `Игрушек в избранном: ${Toy.setSelected.size}`;
    });
    return this.element;
  }

  createElementTree(): HTMLElement {
    this.elementTree.className = "tree-toys__item";
    this.img.src = `./assets/toys/${this.num}.png`;
    this.span.className = "tree-toys__item-count";
    this.span.textContent = this.count;
    this.elementTree.append(this.img);
    this.elementTree.append(this.span);
    this.img?.addEventListener("dragstart", (e) => {
      e.dataTransfer?.setData("num", this.num);
      e.dataTransfer?.setData("type", "1");
    });
    this.elementTree?.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    this.elementTree?.addEventListener("drop", (e) => {
      if (
        e.dataTransfer?.getData("type") === "2" &&
        this.num === e.dataTransfer?.getData("num")
      ) {
        this.count = `${+this.count + 1}`;
        this.span.textContent = this.count;
        if (this.count === "1") {
          this.elementTree.insertAdjacentElement("afterbegin", this.img);
        }
        document
          .querySelector(`[data-number="${e.dataTransfer?.getData("number")}"]`)
          ?.remove();
      }
    });
    return this.elementTree;
  }

  showMessage(): void {
    const message = document.createElement("p");
    message.textContent = "Извините, все слоты заполнены.";
    message.className = "toys__item_message";
    this.element.append(message);
    setTimeout(() => {
      message.remove();
    }, 1500);
  }

  private toggleSelect(item: HTMLElement): void {
    if (this.select) {
      this.select = false;
      item.classList.remove("toys__item-active");
      Toy.setSelected.delete(+this.num);
    } else if (Toy.addSelect(+this.num)) {
      this.select = true;
      item.classList.add("toys__item-active");
    } else {
      this.showMessage();
    }
    localStorage.setItem("toys", JSON.stringify(Array.from(Toy.setSelected)));
  }
}

export { Toy, IToy };
