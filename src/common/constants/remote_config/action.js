import firebase from 'react-native-firebase';
import {CONSTANTS} from './defaults';
import {__DEV__} from '../index';
import {REMOTE_CONFIG} from './types';
import {FAILURE} from '../stateConstants';
import {
  MEMBERS_RECEIVE,
  MEMBERS_RECEIVE_ERROR,
  MEMBERS_RECEIVE_SUCCESS,
} from '../../auth/types';
export function getRemoteConfigs() {
  return dispatch => {
    dispatch({type: REMOTE_CONFIG.FETCH, payload: {}});
    if (__DEV__) {
      firebase.config().enableDeveloperMode();
    }
    firebase.config().setDefaults(CONSTANTS);
    firebase
      .config()
      .fetch(0)
      .then(() => firebase.config().activateFetched())
      .then(() => firebase.config().getKeysByPrefix())
      .then(arr => firebase.config().getValues(arr))
      .then(objects => {
        let data = {};
        // Retrieve values
        Object.keys(objects).forEach(key => {
          data[key] = objects[key].val();
        });
        if (__DEV__) {
          console.log('Remote config data ', data);
        }
        dispatch({type: REMOTE_CONFIG.SUCCESS, payload: data});
      })
      .catch(error => {
        dispatch({type: REMOTE_CONFIG.FAILURE, payload: error});
        if (__DEV__) {
          console.log(`Error processing config: ${error}`);
        }
      });
  };
}

export function getMembers() {
  return dispatch => {
    dispatch({type: MEMBERS_RECEIVE, payload: {}});
    let ref = firebase.firestore().collection('members');

    ref
      .get()
      .then(querySnapshot => {
        if (!querySnapshot.empty) {
          let final_data = {};
          querySnapshot.forEach(item => {
            const data_item = item.data();
            final_data[data_item['id']] = data_item;
          });
          dispatch({
            type: MEMBERS_RECEIVE_SUCCESS,
            payload: {items: final_data},
          });
        } else {
          dispatch({type: MEMBERS_RECEIVE_ERROR, payload: {items: {}}});
        }
      })
      .catch(error => {
        if (__DEV__) {
          console.log('Error : ', error);
        }
      });
  };
}
