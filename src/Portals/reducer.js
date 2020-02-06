import {CATEGORY_PORTALS_FETCH,POPULAR_PORTALS_FETCH} from "./types";

const STATE_ITEM = {
    is_loading: true,
    error: false,
    items: {}
};
const INITIAL_STATE = {
    popular: STATE_ITEM,
    politics: STATE_ITEM
};

export default (state = INITIAL_STATE, action) => {
    let popular = null;
    let category_data = null;
    let category_key = null;
    switch (action.type) {
        // POPULAR
        case POPULAR_PORTALS_FETCH.FETCH:
            popular = {...state.popular, is_loading: true, error: false};
            return {
                ...state,
                popular: popular
            };
        case POPULAR_PORTALS_FETCH.SUCCESS:
            let items = {};
            items = action.payload.items;

            popular = {
                ...state.popular,
                items:items,
                is_loading: false,
                error: false
            };
            return {
                ...state,
                popular: popular
            };
        case POPULAR_PORTALS_FETCH.FAILURE:
            popular = {...state.popular, is_loading: false, error: true};
            return {
                ...state,
                popular: popular
            };
        ///////////
        //category
        case CATEGORY_PORTALS_FETCH.FETCH:
            category_key = action.payload.category.key;
            category_data = {...state[category_key], is_loading: true, error: false};
            return {
                ...state,
                [category_key]:category_data
            };
        case CATEGORY_PORTALS_FETCH.SUCCESS:
            category_key = action.payload.category.key;
            let category_items = {};
            category_items = action.payload.items;
            category_data = {
                ...state[category_key],
                items:category_items,
                is_loading: false,
                error: false
            };
            return {
                ...state,
                [category_key]:category_data
            };
        case CATEGORY_PORTALS_FETCH.FAILURE:
            category_key = action.payload.category.key;
            category_data = {...state[category_key], is_loading: false, error: true};
            return {
                ...state,
                [category_key]:category_data
            };
        /////////
        default:
            return state
    }
}