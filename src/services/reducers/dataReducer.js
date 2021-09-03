import {
    ACTION_ITEM,
    ADD_BUN,
    ADD_ITEM,
    DEL_ITEM,
    GET_DATA_FAILED,
    GET_DATA_REQUEST,
    GET_DATA_SUCCESS,
    RESET_STATE
} from '../actions/dataActions'

export const initialState = {
    bun: null,
    data: [],
    items: [],
    isLoading: false,
    hasError: false
};

export const dataReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_DATA_REQUEST:
            return {
                ...state,
                isLoading: true,
                hasError: false
            };

        case GET_DATA_SUCCESS:
            return {
                ...state,
                data: action.data,
                isLoading: false,
                hasError: false
            };

        case GET_DATA_FAILED:
            return {
                ...state,
                data: [],
                isLoading: false,
                hasError: true
            };

        case ADD_BUN:
            return {
                ...state,
                bun: action.bun,
            };

        case ADD_ITEM:
            return {
                ...state,
                items: [
                    ...state.items,
                    {
                        ...action.item,
                        constructorItemId: action.constructorItemId,
                    },
                ],
            };

        case DEL_ITEM:
            return {
                ...state,
                items: [
                    ...state.items.filter(
                        (item) => item.constructorItemId !== action.itemId
                    ),
                ],
            };

        case ACTION_ITEM:
            const arr = [...state.items];
            const dragItem = arr[action.dragIndex];
            const hoverItem = arr[action.hoverIndex];
            arr[action.hoverIndex] = dragItem;
            arr[action.dragIndex] = hoverItem;
            return {
                ...state,
                items: arr,
            };

        case RESET_STATE:
            return {
                ...state,
                bun: null,
                items: [],
            };


        default:
            return state;
    }
};
