export const appReducer = (state, action) => {
  switch (action.type) {
    case "ingredientsGet":
      return { ...state, ingredients: action.payload };
    case "ingredientsError":
      return { ...state, ingredientsError: action.payload };
    case "closeModal":
      return { ...state, modalIsOpen: false };
    case "totalPrice":
      return { ...state, totalPrice: action.payload };
    case "order":
      return {
        ...state,
        modalMode: "order-details",
        modalIsOpen: true,
        orderDetails: action.payload,
        orderError: "",
      };
    case "orderError":
      return {
        ...state,
        modalMode: "order-details",
        modalIsOpen: true,
        orderError: action.payload,
      };
    case "deleteTopping":
      return {
        ...state,
        burgerData: {
          ...state.burgerData,
          toppings: state.burgerData.toppings.filter(
            (topping, index) => index !== action.payload
          ),
        },
      };
    case "addBun":
      return {
        ...state,
        burgerData: {
          ...state.burgerData,
          bun: action.payload,
        },
        modalMode: "ingredient-details",
        modalIsOpen: true,
        ingredientInfo: action.payload,
      };
    case "addTopping":
      return {
        ...state,
        burgerData: {
          ...state.burgerData,
          toppings: [...state.burgerData.toppings, action.payload],
        },
        modalMode: "ingredient-details",
        modalIsOpen: true,
        ingredientInfo: action.payload,
      };
    default:
      return state;
  }
};
