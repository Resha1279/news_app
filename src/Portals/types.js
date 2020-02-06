import {defineAction} from 'redux-define';
import {FETCH, FAILURE, SUCCESS} from "../common/constants/stateConstants";

const appNameSpace = defineAction('PROTONEWS');

export const POPULAR_PORTALS_FETCH = defineAction('PORTALS_POPULAR_FETCH',
    [FETCH, SUCCESS, FAILURE],
    appNameSpace);

export const CATEGORY_PORTALS_FETCH = defineAction('PORTALS_CATEGORY_FETCH',
    [FETCH, SUCCESS, FAILURE],
    appNameSpace);