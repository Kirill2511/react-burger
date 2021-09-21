import iconBerger from "../../images/icon-burger.svg";

// TODO mosk data TIngredient
const dataTIngredient = {
  _id: "60666c42cc7b410027a1a9b1",
  name: "Краторная булка N-200i",
  type: "bun",
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  __v: 0,
};
const dataIngredientEmpty = {
  _id: "60666c42cc7b410027a1a9b2",
  name: "Собери здесь свой бургер",
  type: "empty",
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 0,
  image: iconBerger,
  image_mobile: iconBerger,
  image_large: iconBerger,
  __v: 0,
};
const dataTIngredientFillers = [
  {
    "_id":"60666c42cc7b410027a1a9bc",
    "name":"Плоды Фалленианского дерева",
    "type": "main",
    "proteins":20,
    "fat":5,
    "carbohydrates":55,
    "calories":77,
    "price":874,
    "image":"https://code.s3.yandex.net/react/code/sp_1.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/sp_1-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/sp_1-large.png",
    "__v":0
  },
  {
    "_id":"60666c42cc7b410027a1a9bb",
    "name":"Хрустящие минеральные кольца",
    "type": "main",
    "proteins":808,
    "fat":689,
    "carbohydrates":609,
    "calories":986,
    "price":300,
    "image":"https://code.s3.yandex.net/react/code/mineral_rings.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/mineral_rings-large.png",
    "__v":0
  },
  {
    "_id":"60666c42cc7b410027a1a9ba",
    "name":"Соус с шипами Антарианского плоскоходца",
    "type": "sauce",
    "proteins":101,
    "fat":99,
    "carbohydrates":100,
    "calories":100,
    "price":88,
    "image":"https://code.s3.yandex.net/react/code/sauce-01.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/sauce-01-large.png",
    "__v":0
  }
];
// TODO Экспорт данных для использования в компонентах
export { dataTIngredient, dataIngredientEmpty, dataTIngredientFillers };
