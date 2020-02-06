import {
  APP_OPENED,
  FEED_LIST_VIEW_CHANGE,
  FEED_LIST_VIEW_CHANGED,
  FONT_SIZE,
  LOAD_IMAGE_ON_DATA_CHANGED,
  ON_ROUTE_CHANGED,
  ON_TAB_ROUTE_CHANGED,
  SELECT_LANGUAGE,
} from './types';
import i18n from '../common/localization/i18n';
export function selectLanguage(lang) {
  i18n.setLanguage(lang);
  if (lang === 'en') {
    return {type: SELECT_LANGUAGE.SELECT_ENGLISH, payload: null};
  }
  return {type: SELECT_LANGUAGE.SELECT_NEPALI, payload: null};
}

export function setLoadImageOnData(boolean) {
  return {type: LOAD_IMAGE_ON_DATA_CHANGED, payload: boolean};
}

export function zoomInText() {
  return {type: FONT_SIZE.ZOOM_IN, payload: {}};
}

export function zoomOutText() {
  return {type: FONT_SIZE.ZOOM_OUT, payload: {}};
}

export function feedListViewTypeChangeSuccess() {
  return {type: FEED_LIST_VIEW_CHANGED, payload: {}};
}

export function feedListViewTypeChangeStart(viewType) {
  return {type: FEED_LIST_VIEW_CHANGE, payload: viewType};
}

export function setCurrentTabRoute(routeName) {
  return {type: ON_TAB_ROUTE_CHANGED, payload: routeName};
}

export function setCurrentScreen(routeName) {
  return {type: ON_ROUTE_CHANGED, payload: routeName};
}

export function setAppOpened() {
  return {type: APP_OPENED, payload: {}};
}

export function welcomed() {
  return {type: 'WELCOMED', payload: {}};
}
