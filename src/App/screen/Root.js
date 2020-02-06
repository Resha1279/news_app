import React, {Component} from 'react';
import {Platform, StatusBar, DeviceEventEmitter} from 'react-native';
import LocalizationProvider from '../../common/localization/LocalizationProvider';
import App from './App';
import i18n from '../../common/localization/i18n';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Loading from '../../common/components/Loading';
import firebase from 'react-native-firebase';
import {configureStore} from '../../common/store';
import remote_config from '../../common/constants/remote_config/defaults';
import {__DEV__} from '../../common/constants';
import SplashScreen from 'react-native-splash-screen';
import Splash from '../../common/components/Splash';

type Props = {};
if (console) {
  console.disableYellowBox = true; // eslint-disable-line no-console
}
export const {store, persistor} = configureStore();
export default class Root extends Component<Props> {
  constructor(props) {
    super(props);
    if (Platform.OS === 'ios') {
      StatusBar.setBarStyle('default');
    }
  }

  componentWillMount() {
    firebase.firestore().settings({persistence: true});
    if (process.env['NODE_ENV'] === 'production') {
      firebase.analytics().setAnalyticsCollectionEnabled(true);
    } else {
    }

    // firebase.perf().setPerformanceCollectionEnabled(true)
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<Splash />} persistor={persistor}>
          <LocalizationProvider i18n={i18n}>
            <App />
          </LocalizationProvider>
        </PersistGate>
      </Provider>
    );
  }
}
