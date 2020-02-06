import {
  APP_OPENED,
  FEED_LIST_VIEW_CHANGE,
  FEED_LIST_VIEW_CHANGED,
  FONT_SIZE,
  LOAD_IMAGE_ON_DATA_CHANGED,
  ON_ROUTE_CHANGED,
  ON_TAB_ROUTE_CHANGED,
  SELECT_LANGUAGE,
  TTS_SPEECH_RATE_CHANGED,
  WELCOMED,
} from './types';
import {REHYDRATE} from 'redux-persist';
import {
  DEFAULT_FEED_LIST_VIEW_TYPE,
  DEFAULT_FONT_SIZE,
  MAX_FONT_SIZE,
  MINIMUM_FONT_SIZE,
} from '../common/constants';

const INITIAL_STATE = {
  language: 'en',
  load_image_on_data: false,
  font_size: DEFAULT_FONT_SIZE,
  feed_list_view_type: DEFAULT_FEED_LIST_VIEW_TYPE,
  current_tab_route_name: null,
  current_route: null,
  is_app_opened_for_first_time: true,
  welcomed: false,
};

export default (state = INITIAL_STATE, action) => {
  const {font_size} = state;
  let new_font_size = 0;
  switch (action.type) {
    case SELECT_LANGUAGE.SELECT_ENGLISH:
      return {...state, language: 'en'};
    case SELECT_LANGUAGE.SELECT_NEPALI:
      return {...state, language: 'ne'};
    case LOAD_IMAGE_ON_DATA_CHANGED:
      return {...state, load_image_on_data: action.payload};
    case FONT_SIZE.ZOOM_IN:
      new_font_size = font_size < MAX_FONT_SIZE ? font_size + 3 : font_size;
      return {...state, font_size: new_font_size};
    case FONT_SIZE.ZOOM_OUT:
      new_font_size = font_size > MINIMUM_FONT_SIZE ? font_size - 3 : font_size;
      return {...state, font_size: new_font_size};
    case FEED_LIST_VIEW_CHANGE:
      return {...state, feed_list_view_type: action.payload};
    case ON_TAB_ROUTE_CHANGED:
      return {...state, current_tab_route_name: action.payload};
    case ON_ROUTE_CHANGED:
      return {...state, current_route: action.payload};
    case APP_OPENED:
      return {...state, is_app_opened_for_first_time: false};
    case WELCOMED:
      return {...state, welcomed: true};
    default:
      return state;
  }
};
