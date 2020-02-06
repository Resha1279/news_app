import {defineAction} from 'redux-define';

const appNameSpace = defineAction('PROTONEWS');

export const SELECT_LANGUAGE = defineAction('LANGUAGE_SELECT',
    ['SELECT_ENGLISH', 'SELECT_NEPALI'],
    appNameSpace);

export const LOAD_IMAGE_ON_DATA_CHANGED = "LOAD_IMAGE_ON_DATA_CHANGED";
export const FONT_SIZE = defineAction('FONT_SIZE',
    ['ZOOM_IN', 'ZOOM_OUT'],
    appNameSpace);

export const TTS_SPEECH_RATE_CHANGED = "TTS_SPEECH_RATE_CHANGED";


export const FEED_LIST_VIEW_CHANGED = "FEED_LIST_VIEW_CHANGED";
export const FEED_LIST_VIEW_CHANGE = "FEED_LIST_VIEW_CHANGE";

export const ON_TAB_ROUTE_CHANGED = "ON_TAB_ROUTE_CHANGED";
export const ON_ROUTE_CHANGED = "ON_ROUTE_CHANGED";


export const INCREASE_COUNT = "INCREASE_COUNT";
export const DECREASE_COUNT = "DECREASE_COUNT";
export const MAKE_COUNT_ZERO = "MAKE_COUNT_ZERO";
export const APP_OPENED = "APP_OPENED";
export const WELCOMED = "WELCOMED";
