import _ from 'lodash';
import {__DEV__, ADS_PLACEMENT_IDS} from '../constants';
import {store} from '../../App/screen/Root';
import index from '../localization/locales/index';

export function getKeys(obj) {
  return Object.keys(obj);
}

export function objectToList(obj) {
  const items = _.map(obj, (val, id) => {
    if (val) {
      return val;
    }
  });
  return items;
}

export function generateRandomId() {
  return (
    Math.random()
      .toString(36)
      .substring(2) + new Date().getTime().toString(36)
  );
}

export function insertAdsFeeds(state, items) {
  let final_items = objectToList(items);
  // let interval_remote_config =
  //   state['constants']['constants']['feeds_item_ads_interval'];
  // interval_remote_config = parseInt(interval_remote_config);
  // if (final_items.length > 0) {
  //   const no_of_ads = parseInt(final_items.length / interval_remote_config);
  //   let insert_index = interval_remote_config;
  //   for (let i = 1; i < no_of_ads + 1; i++) {
  //     if (final_items[insert_index - 1].type !== 'ads') {
  //       const ads_data = {type: 'ads', id: generateRandomId()};
  //       final_items.splice(insert_index, 0, ads_data);
  //     }
  //     insert_index = insert_index + interval_remote_config + 1;
  //   }
  //   const ads_data = {type: 'ads', id: generateRandomId()};
  //   // items.push(ads_data);
  //   return listToObject(final_items);
  // }
  return final_items;
}

export function listToObject(items) {
  let final_items = {};
  items.forEach(item => {
    if (item) {
      final_items[item.id] = item;
    }
  });
  return final_items;
}
