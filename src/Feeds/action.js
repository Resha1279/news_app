import firebase from 'react-native-firebase';
import {__DEV__, FEEDS_BATCH, FEEDS_CATEGORIES} from '../common/constants';
import {LATEST_FEEDS, CATEGORY_FEEDS} from './types';
import firestore_callbacks from '../common/utils/firestore_callbacks';

export function fetchLatestFeeds(is_first_load, lastValue) {
  return (dispatch, getState) => {
    const store = getState();
    dispatch({type: LATEST_FEEDS.FETCH, payload: {is_first_load}});
    let ref = firebase
      .firestore()
      .collection('news_feeds')
      .orderBy('created_date', 'desc');

    if (lastValue) {
      ref = ref.startAt(lastValue).limit(FEEDS_BATCH);
    } else {
      ref = ref.limit(FEEDS_BATCH);
    }
    if (__DEV__) {
      console.log(
        'feeds action : is_first_load , lastValue',
        is_first_load,
        lastValue,
        ref,
      );
    }

    firestore_callbacks['latest'] = ref.onSnapshot(
      querySnapshot => {
        if (__DEV__) {
          console.log('feeds action : query snapshot', querySnapshot);
        }

        if (!querySnapshot.empty) {
          let items = {};
          let lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
          let is_last_item = false;
          let count = 0;
          querySnapshot.forEach(item => {
            count++;
            if (count === 1 && lastValue) {
              // do not do anything
            } else {
              items[item.data().id] = item.data();
            }
          });

          if (lastValue && lastVisible._data.id === lastValue._data.id) {
            is_last_item = true;
            dispatch({
              type: LATEST_FEEDS.SUCCESS,
              payload: {
                items: {},
                lastVisible: null,
                lastValue,
                is_last_item,
                store,
              },
            });
          } else {
            dispatch({
              type: LATEST_FEEDS.SUCCESS,
              payload: {items, lastVisible, lastValue, is_first_load, store},
            });
          }
        } else {
          let is_last_item = true;
          dispatch({
            type: LATEST_FEEDS.SUCCESS,
            payload: {
              items: {},
              lastVisible: null,
              lastValue,
              is_last_item,
              store,
            },
          });
        }
      },
      error => {
        dispatch({type: LATEST_FEEDS.FAILURE, payload: {}});
        if (__DEV__) {
          console.log('feeds action : error :', error);
        }
      },
    );
  };
}

export function fetchFeedsByCategory(is_first_load, category, lastValue) {
  return (dispatch, getState) => {
    const store = getState();
    dispatch({type: CATEGORY_FEEDS.FETCH, payload: {category, is_first_load}});
    let ref = firebase
      .firestore()
      .collection('news_feeds')
      .where('category', '==', category.key)
      .orderBy('created_date', 'desc');

    if (lastValue) {
      ref = ref.startAt(lastValue).limit(FEEDS_BATCH);
    } else {
      ref = ref.limit(FEEDS_BATCH);
    }
    firestore_callbacks[category.key] = ref.onSnapshot(
      querySnapshot => {
        if (!querySnapshot.empty) {
          let items = {};
          let lastVisible =
            querySnapshot.docs.length > 0
              ? querySnapshot.docs[querySnapshot.docs.length - 1]
              : lastValue;
          let is_last_item = false;
          let count = 0;

          querySnapshot.forEach(item => {
            count++;
            if (count === 1 && lastValue) {
              // do not do anything
            } else {
              items[item.data().id] = item.data();
            }
          });
          if (__DEV__) {
            console.log('feeds:category fetch', category, items);
          }

          if (lastValue && lastVisible._data.id === lastValue._data.id) {
            is_last_item = true;
            dispatch({
              type: CATEGORY_FEEDS.SUCCESS,
              payload: {
                items: {},
                lastVisible,
                lastValue,
                is_last_item,
                category,
                store,
              },
            });
          } else {
            dispatch({
              type: CATEGORY_FEEDS.SUCCESS,
              payload: {
                is_first_load,
                items,
                lastVisible,
                lastValue,
                category,
                store,
              },
            });
          }
        } else {
          let is_last_item = true;
          dispatch({
            type: CATEGORY_FEEDS.SUCCESS,
            payload: {
              items: {},
              lastVisible: null,
              lastValue,
              is_last_item,
              category,
              store,
            },
          });
        }
      },
      error => {
        dispatch({type: CATEGORY_FEEDS.FAILURE, payload: {category}});
        if (__DEV__) {
          console.log('feeds action : error :', error);
        }
      },
    );
  };
}

export function incrementFeedRead(item) {
  return dispatch => {
    if (item) {
      const ref = firebase
        .firestore()
        .collection('news_feeds')
        .doc(item.id);
      firebase
        .firestore()
        .runTransaction(async transaction => {
          const doc = await transaction.get(ref);

          // if it does not exist set the population to one
          if (!doc.exists) {
            transaction.set(ref, {...item, num_reads: 1});
            // return the new value so we know what the new population is
            return 0;
          }

          // exists already so lets increment it + 1
          const increased_reads = doc.data().num_reads + 1;

          transaction.update(ref, {
            num_reads: increased_reads,
          });
          // return the new value so we know what the new population is
          return increased_reads;
        })
        .then(increasedReads => {
          if (__DEV__) {
            console.log(
              `Transaction successfully committed and new population is '${increasedReads}'.`,
            );
          }
        })
        .catch(error => {
          if (__DEV__) {
            console.log('Transaction failed: ', error);
          }
        });
    }
  };
}
