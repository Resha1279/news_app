import {defineAction} from 'redux-define';
import {FETCH, FAILURE, SUCCESS} from "../common/constants/stateConstants";

const appNameSpace = defineAction('PROTONEWS');


export const LATEST_FEEDS = defineAction('FEEDS_LATEST_FETCH',
    [FETCH, SUCCESS, FAILURE],
    appNameSpace);

export const CATEGORY_FEEDS = defineAction('FEEDS_POLITICS_FETCH',
    [FETCH, SUCCESS, FAILURE],
    appNameSpace);
