import {createSelector} from 'reselect';
import moment from 'moment';
import {__DEV__, ADS_INTERVAL} from '../common/constants';
import {insertAdsFeeds, objectToList} from '../common/utils';
import moment_timezone from 'moment-timezone';
import DeviceInfo from 'react-native-device-info';
const getFeedsCategory = (state, category) => state.feeds[category.key];
const getFeeds = state => state.feeds;
const getFeedListViewType = (state, category) =>
  state.settings.feed_list_view_type;
const getBookmarks = (state, category) => state.library.bookmarks;
const getTts = (state, category) => state.tts;
const getFeedsLatest = (state, category) => state.feeds.latest;
const getConstants = (state, category) => state.constants;

export const getLatestFeeds = createSelector(
  [getFeedsLatest, getFeedListViewType, getBookmarks, getTts],
  (feeds, feed_list_view_type, bookmarks, tts) => {
    const bookmark_list = objectToList(bookmarks);
    const items = editItems(
      objectToList(feeds.items),
      bookmark_list,
      feed_list_view_type,
      tts,
    );
    const items_with_ads = items;
    const first = items_with_ads.slice(0, 5);
    const second = items_with_ads.slice(0, items_with_ads.length - 1);
    if (__DEV__) {
      console.log('final list : ', items);
    }
    return {...feeds, items: {first, second}};
  },
);

// const getCategory = (state, category) => category;

export const getFeedsByCategory = createSelector(
  [getFeedsCategory, getFeedListViewType, getBookmarks, getTts],
  (feeds, feed_list_view_type, bookmarks, tts) => {
    let items = [];
    let items_with_ads = [];
    const bookmark_list = objectToList(bookmarks);
    if (feeds) {
      items = editItems(
        objectToList(feeds.items),
        bookmark_list,
        feed_list_view_type,
        tts,
      );
      items_with_ads = items;
    }
     return {...feeds, items: items_with_ads};
   // return {...feeds};
  },
);

export const getPagerFeeds = createSelector(
  [getFeedsCategory, getFeedListViewType, getBookmarks, getTts, getConstants],
  (feeds, feed_list_view_type, bookmarks, tts, constants) => {
    let items = [];
    const bookmark_list = objectToList(bookmarks);
    if (feeds) {
      items = editItems(
        objectToList(feeds.items),
        bookmark_list,
        feed_list_view_type,
        tts,
      );
    }

    //get view_pager_length from remote config
    const view_pager_length = constants.constants['view_pager_length'];
    return {
      first: filterViewPagerItems(items, view_pager_length),
      // second: filterViewPagerItems(category_items, view_pager_length, category)
    };
  },
);

function filterViewPagerItems(items, view_pager_length, category) {
  let final_list = [];
  items.forEach(item => {
    if (item['images']) {
      final_list.push(item);
    }
  });
  return final_list.slice(0, view_pager_length);
}

export function editItems(items, bookmarks, feed_list_view_type, tts) {
  const viewType = feed_list_view_type;
  const localeMoment = moment;
  const timezone = DeviceInfo.getTimezone();
  if (__DEV__) {
    console.log('timezone : ', timezone);
    //console.log('timezone : ', DeviceInfo.getUniqueID());
  }
  // localeMoment.locale(locale);
  let final_items = [];

  if (items && items.length > 0) {
    items.forEach(item => {
      if (item) {
        if (item['type'] !== 'ads') {
          let formatted_item = {...item};
          const date = item['created_date'];
          if (__DEV__) {
            console.log('created_date : ', date);
          }
          const thumb_url = item['thumb_url'];
          const word_count = item['word_count'];
          formatted_item['type'] =
            thumb_url && thumb_url !== '' ? 'withImage' : 'withoutImage';
          formatted_item['read_time'] = word_count
            ? getReadTime(word_count, tts.speech_rate)
            : '';
          formatted_item['ago'] = moment_timezone(date)
            .tz(timezone)
            .fromNow();
          formatted_item['display_date'] = moment_timezone(date)
            .tz(timezone)
            .format('MMMM DD,YYYY');
          formatted_item['site_title'] = 'Site';
          formatted_item['bookmarked'] = isBookmarked(item, bookmarks);
          formatted_item['is_playing'] = isPlaying(item, tts.playing_item);
          formatted_item['play_index'] = getPlayIndex(item, tts);
          formatted_item['play_status'] = getPlayStatus(item, tts);
          formatted_item['view_type'] = viewType;
          formatted_item['has_image'] = thumb_url && thumb_url !== '';
          formatted_item['analytics_item'] = getFeedItemForAnalytics(
            formatted_item,
          );
          formatted_item['short_description'] = formatted_item[
            'short_description'
          ]
            ? formatted_item['short_description']
            : formatted_item['desc_list'];
          final_items.push(formatted_item);
        } 
        else {
          final_items.push(item);
        }
      }
    });
  }

  return final_items;
}

function getReadTime(word_count, rate) {
  let result = word_count * 0.388 * rate;
  if (result > 60) {
    return (result / 60).toFixed(1).toString() + ' minutes';
  }
  return (
    parseInt(result)
      .toString()
      .slice(0, 3) + ' seconds'
  );
}

function getFeedItemForAnalytics(formatted_item) {
  const {category, bookmarked, has_image, ago} = formatted_item;
  return {
    category: category,
    ago: ago,
    bookmarked: bookmarked,
    has_image: has_image,
  };
}

function isBookmarked(item, bookmarks) {
  let isBookmarked = false;

  bookmarks.forEach(bookmark => {
    if (bookmark) {
      if (bookmark.id === item.id) {
        isBookmarked = true;
      }
    }
  });
  return isBookmarked;
}

function isPlaying(item, playing_item) {
  if (playing_item) {
    return item.id === playing_item.id;
  }
  return false;
}

function getPlayIndex(item, tts) {
  if (isPlaying(item, tts.playing_item)) {
    return tts.playing.index;
  }
  return 0;
}

function getPlayStatus(item, tts) {
  if (isPlaying(item, tts.playing_item)) {
    return tts.play_status;
  }
  return null;
}
