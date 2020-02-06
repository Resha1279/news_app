import firebase from 'react-native-firebase';
import {__DEV__} from '../constants';

export function notificationPermissionHandler() {
  firebase
    .messaging()
    .hasPermission()
    .then(enabled => {
      if (enabled) {
        // user has permissions
        if (__DEV__) {
          console.log('user has notification permission');
        }
      } else {
        // user doesn't have permission
        if (__DEV__) {
          console.log('user do not have permission');
        }
        firebase
          .messaging()
          .requestPermission()
          .then(() => {
            // User has authorised
            if (__DEV__) {
              console.log('authorized for notification');
            }
          })
          .catch(error => {
            // User has rejected permissions
            if (__DEV__) {
              console.log('unauthorized for notification ', error);
            }
          });
      }
    });
}

export function subscribeToTopic(topic) {
  if (__DEV__) {
    console.log('subscribed to topic : ', topic);
  }
  firebase.messaging().subscribeToTopic(topic);
}

export function unsubscribeToTopic(topic) {
  firebase.messaging().unsubscribeFromTopic(topic);
}
export function createChannel(channelId, channelName) {
  // Build a channel
  const channel = new firebase.notifications.Android.Channel(
    channelId,
    channelName,
    firebase.notifications.Android.Importance.Max,
  ).setDescription('notification channel description');

  // Create the channel
  firebase.notifications().android.createChannel(channel);
}
