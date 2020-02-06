import {CATEGORY_PORTALS_FETCH} from './types';
import {__DEV__} from '../common/constants';
import firebase from 'react-native-firebase';

export const PORTALS_DATA = [
  {
    id: 'onlinekhabar',
    link: 'https://onlinekhabar.com',
    title: 'Online Khabar',
    title_other: 'Online Khabar Np',
    icon_url: '',
    category: '',
    order: 1,
  },
  {
    id: 'khabaronline',
    link: 'https://onlinekhabar.com',
    title: 'Khabar Online',
    title_other: 'Online Khabar Np',
    icon_url: '',
    category: '',
    order: 2,
  },
];

export function getPortalsByCategory(category) {
  return dispatch => {
    dispatch({type: CATEGORY_PORTALS_FETCH.FETCH, payload: {category}});
    let ref = firebase
      .firestore()
      .collection('portals')
      .where('category', '==', category.key)
      .orderBy('order');
    ref.onSnapshot(
      querySnapshot => {
        if (!querySnapshot.empty) {
          let final_data = {};
          querySnapshot.forEach(item => {
            const data_item = item.data();
            final_data[data_item['id']] = data_item;
          });
          dispatch({
            type: CATEGORY_PORTALS_FETCH.SUCCESS,
            payload: {items: final_data, category: category},
          });
        } else {
          dispatch({
            type: CATEGORY_PORTALS_FETCH.SUCCESS,
            payload: {items: {}, category: category},
          });
        }
      },
      error => {
        if (__DEV__) {
          console.log('Error : ', error);
        }
      },
    );
  };
}
