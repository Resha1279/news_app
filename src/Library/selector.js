import {createSelector} from 'reselect';
import {__DEV__, ADS_INTERVAL} from '../common/constants';
import {insertAdsFeeds, objectToList} from '../common/utils';
import {editItems} from '../Feeds/selector';

const getLanguage = state => state.settings.language;
const getBookmarks = state => state.library.bookmarks;
const getTts = (state, category) => state.tts;
const getState = state => state;

export const getBookmarkedFeeds = createSelector(
  [getLanguage, getBookmarks, getTts, getState],
  (language, bookmarks, tts, state) => {
    const bookmark_list = objectToList(insertAdsFeeds(state, bookmarks));
    let items = editItems(bookmark_list, bookmark_list, language, tts);
    // sort items
    items.sort((a, b) => {
      return b['bookmark_time'] - a['bookmark_time'];
    });
    const itemsWithAds = items;
    return {items: itemsWithAds};
  },
);
