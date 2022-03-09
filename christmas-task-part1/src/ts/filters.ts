import { IToy } from "./class-toy";

function search(arr: IToy[], searchStr: string): IToy[] {
  return arr.filter((item) =>
    item.name.toLocaleLowerCase().includes(searchStr.toLocaleLowerCase())
  );
}

function sort(arr: IToy[], type: number): IToy[] {
  switch (type) {
    case 0:
      return arr.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
    case 1:
      return arr.sort((a, b) => {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
        return 0;
      });
    case 2:
      return arr.sort((a, b) => {
        return +a.year - +b.year;
      });
    case 3:
      return arr.sort((a, b) => {
        return +b.year - +a.year;
      });
    default:
      return arr;
  }
}

interface IObj {
  [key: number]: string;
}
interface IObjSet {
  shape: IObj;
  color: IObj;
  size: IObj;
}

function BtnFilter(arr: IToy[], objFilter: IObj, type: keyof IToy): IToy[] {
  if (Object.keys(objFilter).length === 0) {
    return arr;
  }
  return arr.filter((item) => Object.values(objFilter).includes(item[type]));
}

function toggleFilterBtn(
  btn: HTMLButtonElement,
  num: number,
  dataFilter: string,
  type: keyof IObjSet
): IObj {
  const objSet: IObjSet = JSON.parse(
    String(localStorage.getItem("filters"))
  ).btnFilter;
  if (num in objSet[type]) {
    btn.classList.remove(`filter__${type}_btn-active`);
    delete objSet[type][num];
  } else {
    btn.classList.add(`filter__${type}_btn-active`);
    objSet[type][num] = dataFilter;
  }
  return objSet[type];
}

interface IObjRange {
  count: number[];
  year: number[];
}

interface IRange {
  count: string[];
  year: string[];
}

const objRange: IObjRange = {
  count: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  year: [1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020],
};

function rangeFilter(
  arrData: IToy[],
  arrRange: string[],
  type: keyof IObjRange
): IToy[] {
  const range = objRange[type].filter(
    (item) => item >= +arrRange[0] && item <= +arrRange[1]
  );
  return arrData.filter((item) => range.includes(+item[type]));
}

function favoritesFilter(arr: IToy[], onlyFavorites: boolean): IToy[] {
  if (onlyFavorites) {
    return arr.filter((item) => item.favorite === onlyFavorites);
  }
  return arr;
}

interface ISetFilters {
  btnFilter: IObjSet;
  rangeFilter: IRange;
  favorites: boolean;
}

function filters(
  data: IToy[],
  objSetFilters: ISetFilters,
  sortType = 0,
  searchStr = ""
): IToy[] {
  let result = BtnFilter(data, objSetFilters.btnFilter.shape, "shape");
  result = BtnFilter(result, objSetFilters.btnFilter.color, "color");
  result = BtnFilter(result, objSetFilters.btnFilter.size, "size");
  result = rangeFilter(result, objSetFilters.rangeFilter.count, "count");
  result = rangeFilter(result, objSetFilters.rangeFilter.year, "year");
  result = favoritesFilter(result, objSetFilters.favorites);
  result = search(result, searchStr);
  result = sort(result, sortType);
  return result;
}

export {
  search,
  sort,
  toggleFilterBtn,
  filters,
  IObjSet,
  IObj,
  IRange,
  ISetFilters,
};
