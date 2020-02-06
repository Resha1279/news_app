import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistReducer, persistStore} from 'redux-persist';
import {AsyncStorage} from 'react-native';
import FilesystemStorage from 'redux-persist-filesystem-storage';

import reducers from './root_reducer';

import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

export function configureStore() {
  const rootPersistConfig = {
    key: 'root',
    storage: FilesystemStorage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['settings', 'constants', 'library', 'tts'],
  };

  const persistedReducer = persistReducer(rootPersistConfig, reducers);

  const store = createStore(
    persistedReducer,
    {},
    compose(applyMiddleware(thunk)),
  );
  if (process.env['NODE_ENV'] !== 'production') {
    if (module.hot) {
      module.hot.accept(() => {
        const nextRootReducer = require('./root_reducer').default;
        store.replaceReducer(nextRootReducer);
      });
    }
  }

  const persistor = persistStore(store);

  return {store, persistor};
}
