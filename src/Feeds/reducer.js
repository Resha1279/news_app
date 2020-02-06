import {CATEGORY_FEEDS, LATEST_FEEDS} from "./types";
import {insertAdsFeeds} from "../common/utils";
import {FEEDS_CATEGORIES} from "../common/constants";
import {__DEV__} from "../common/constants/index";
import {REHYDRATE} from "redux-persist";

const STATE_ITEM = {
    is_loading: true,
    error: false,
    is_first_load: true,
    items: {}
};
const INITIAL_STATE = {
    rehydrated:false,
    latest: STATE_ITEM,
    politics: STATE_ITEM,
    [FEEDS_CATEGORIES[0].key]:STATE_ITEM
};

export default (state = INITIAL_STATE, action) => {
    let latest = null;
    let category_data = null;
    let category_key = null;
    switch (action.type) {
        case REHYDRATE:
            return {
                ...state,
                rehydrated:true
            };
        // LATEST
        case LATEST_FEEDS.FETCH:
            latest = {...state.latest, is_loading: true, error: false,is_first_load: action.payload.is_first_load};
            return {
                ...state,
                latest
            };
        case LATEST_FEEDS.SUCCESS:
            let items = {};
            if (action.payload.lastValue) {
                if (__DEV__){
                    console.log("state and payload ", state.latest.items, action.payload )
                }
                items = {...state.latest.items,...insertAdsFeeds(action.payload.store,action.payload.items)}
            }else {
                items = insertAdsFeeds(action.payload.store,action.payload.items);
            }
            latest = {
                ...state.latest,
                items:items,
                lastVisible:action.payload.lastVisible,
                is_last_item:action.payload.is_last_item,
                is_loading: false,
                error: false,
                is_first_load: false
            };
            return {
                ...state,
                latest: latest
            };
        case LATEST_FEEDS.FAILURE:
            latest = {...state.latest, is_loading: false, error: true};
            return {
                ...state,
                latest: latest
            };
        ///////////
            //category
        case CATEGORY_FEEDS.FETCH:
            category_key = action.payload.category.key;
            category_data = {...state[category_key], is_loading: true, error: false,is_first_load: action.payload.is_first_load};
            return {
                ...state,
                [category_key]:category_data
            };
        case CATEGORY_FEEDS.SUCCESS:
            category_key = action.payload.category.key;
            let category_items = {};
            if (action.payload.lastValue) {
                category_items = {...state[category_key]['items'],...insertAdsFeeds(action.payload.store,action.payload.items)}
            }else {
                category_items = insertAdsFeeds(action.payload.store, action.payload.items);
            }
            category_data = {
                ...state[category_key],
                items:category_items,
                lastVisible:action.payload.lastVisible,
                is_last_item:action.payload.is_last_item,
                is_first_load: false,
                is_loading: false,
                error: false
            };
            return {
                ...state,
                [category_key]:category_data
            };
        case CATEGORY_FEEDS.FAILURE:
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
