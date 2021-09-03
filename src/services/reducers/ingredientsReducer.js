import {
    GET_FEED_REQUEST,
    GET_FEED_SUCCESS,
    GET_FEED_FAILED
} from '../actions/feed';

export const initialState = {
    orders: [],
    isFeedRequest: false,
    isFeedSuccess: false,
    isFeedFailed: false
};

export const feedReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FEED_REQUEST:
            return {
                ...state,
                isFeedRequest: true,
                isFeedSuccess: false,
                isFeedFailed: false
            }

        case GET_FEED_SUCCESS:
            return {
                ...state,
                orders: action.data,
                isFeedRequest: false,
                isFeedSuccess: true,
                isFeedFailed: false
            }

        case GET_FEED_FAILED:
            return {
                ...state,
                isFeedRequest: false,
                isFeedSuccess: false,
                isFeedFailed: true
            }

        default:
            return state;
    }
}
