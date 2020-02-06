import {ON_BOOKMARKED, ON_REMOVE_BOOKMARK} from './types';

const INITIAL_STATE = {
  downloads: {},
  bookmarks: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ON_BOOKMARKED:
      return {
        ...state,
        bookmarks: {...state.bookmarks, [action.payload.id]: action.payload},
      };
    case ON_REMOVE_BOOKMARK:
      return {
        ...state,
        bookmarks: {...state.bookmarks, [action.payload.id]: null},
      };
    default:
      return state;
  }
};
