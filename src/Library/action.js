import {ON_BOOKMARKED, ON_REMOVE_BOOKMARK} from './types';

export function bookmark(item) {
  return {type: ON_BOOKMARKED, payload: item};
}

export function remove_bookmark(item) {
  return {type: ON_REMOVE_BOOKMARK, payload: item};
}
