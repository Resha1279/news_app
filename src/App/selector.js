import {createSelector} from 'reselect';
import {FEEDS_CATEGORIES} from '../common/constants';

const getFeeds = state => state.feeds;
export const getIsRehydrated = createSelector(
  [getFeeds],
  feeds => {
    // return true;
    return feeds.rehydrated;
  },
);
