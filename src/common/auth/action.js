import firebase from 'react-native-firebase';
import {__DEV__} from '../constants';
import {USER_LOGGED_IN, USER_TOKEN_ID_RECEIVED} from './types';
export function anonymousLogin() {
  return dispatch => {
    firebase
      .auth()
      .signInAnonymouslyAndRetrieveData()
      .then(user => {
        if (user) {
          dispatch({type: USER_LOGGED_IN, payload: user});
          firebase
            .auth()
            .currentUser.getIdToken(false)
            .then(token => {
              dispatch({type: USER_TOKEN_ID_RECEIVED, payload: token});
            });
        }
      });
  };
}
