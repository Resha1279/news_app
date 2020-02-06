import React, {Component} from 'react';
import {
  AppState,
  StatusBar,
  BackHandler,
  Alert,
  ToastAndroid,
  View,
  DeviceEventEmitter,
  InteractionManager,
  Modal,
  ScrollView,
} from 'react-native';

import NetInfo from 'react-native-netinfo';

import {MessageBar, MessageBarManager} from 'react-native-message-bar';
import Toast, {DURATION} from 'react-native-easy-toast';

import NavigationService from '../../common/navigators/helpers/NavigationService';
import connectLocalization from '../../common/localization/connectLocalization';
import {connect} from 'react-redux';
import {
  selectLanguage,
  setCurrentScreen,
  setCurrentTabRoute,
} from '../../Settings/action';
import AppNavigator from '../../common/navigators/AppNavigator';
import firebase from 'react-native-firebase';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  APPBAR_HEIGHT,
  BACKGROUND_COLOR,
  BACKGROUND_COLOR_WHITE,
  CAPTION_COLOR,
  CAPTION_SIZE,
  CARD_BACKGROUND_COLOR,
  HEADER_BACKGROUND_COLOR,
  PRIMARY_COLOR,
  PRIMARY_TEXT_COLOR,
  PRIMARY_TEXT_SIZE,
  SECONDARY_TEXT_COLOR,
  SECONDARY_TEXT_SIZE,
  STATUS_BAR,
  TERTIARY_TEXT_COLOR,
  TERTIARY_TEXT_SIZE,
} from '../../common/styles/variables';

import {
  __DEV__,
  APP_NAME,
  NOTIFICATION_CHANNEL_DESCRIPTION,
  NOTIFICATION_CHANNEL_ID,
  SCREENS,
} from '../../common/constants';
import {anonymousLogin} from '../../common/auth/action';
import {getRemoteConfigs} from '../../common/constants/remote_config/action';
import {onConnectivityStatusChange} from '../../common/utils/connectivity/action';
import Loader from '../../common/components/Loader';
// import {NativeAdsManager} from "react-native-fbads";
import TTS from '../../TTS/component/TtsComponent';
import {
  createChannel,
  notificationPermissionHandler,
  subscribeToTopic,
} from '../../common/utils/notification_helper';
import {editItems} from '../../Feeds/selector';
import {isAppOpenedForFirstTime} from '../../Settings/selector';
import IntroPager from '../../Intro/screens/IntroPager';
import {getIsRehydrated} from '../selector';
import {fetchFeedsByCategory, fetchLatestFeeds} from '../../Feeds/action';
import SplashScreen from 'react-native-splash-screen';
import InviteFriend from '../../common/components/InviteFriend';
import {pause} from '../../TTS/action';
import {ADMOD_APP_ID} from '../../common/constants/index';
import {globalStyles} from '../../common/styles';

type Props = {};
EStyleSheet.build({
  $primaryColor: `${PRIMARY_COLOR}`,
  $cardBackgroundColor: `${CARD_BACKGROUND_COLOR}`,
  $headerBackgroundColor: `${HEADER_BACKGROUND_COLOR}`,
  $backgroundColor: `${BACKGROUND_COLOR}`,
  $backgroundColorWhite: `${BACKGROUND_COLOR_WHITE}`,

  $captionTextSize: `${CAPTION_SIZE}rem`,
  $primaryTextSize: `${PRIMARY_TEXT_SIZE}rem`,
  $secondaryTextSize: `${SECONDARY_TEXT_SIZE}rem`,
  $tertiaryTextSize: `${TERTIARY_TEXT_SIZE}rem`,

  $captionTextColor: `${CAPTION_COLOR}`,
  $primaryTextColor: `${PRIMARY_TEXT_COLOR}`,
  $secondaryTextColor: `${SECONDARY_TEXT_COLOR}`,
  $tertiaryTextColor: `${TERTIARY_TEXT_COLOR}`,

  $iconHeight: 50,
  $logoHeight: 45,
  $appBarHeight: APPBAR_HEIGHT,
});

class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.renderCondition = this.renderCondition.bind(this);
    this.navigationStateHandler = this.navigationStateHandler.bind(this);
    this.authStateListener = this.authStateListener.bind(this);
    this.handleConnectivityChange = this.handleConnectivityChange.bind(this);
    this.showIntroModal = this.showIntroModal.bind(this);
    this.hideIntroModal = this.hideIntroModal.bind(this);
    this.renderLoadingModal = this.renderLoadingModal.bind(this);
    this.showInviteModal = this.showInviteModal.bind(this);
    this.hideInviteFriendsModal = this.hideInviteFriendsModal.bind(this);
    this.renderInviteFriendsModal = this.renderInviteFriendsModal.bind(this);
    this._handleAppStateChange = this._handleAppStateChange.bind(this);
    this.state = {
      is_mounting: true,
      show_intro_modal: false,
      show_invite_friends_modal: false,
    };
  }

  componentWillMount() {
    this.props.selectLanguage(this.props.lang);
    this.props.getRemoteConfigs();
    this.props.fetchLatestFeeds(true);
    // this.props.fetchFeedsByCategory(true, FEEDS_CATEGORIES[0]);
    this.authStateListener();
    subscribeToTopic(APP_NAME);
    //TODO: uncomment subscribe to topic
    // subscribeToTopic(`${APP_NAME}-politics`);
    // if (this.props.is_app_opened_for_first_time){

    // }
    firebase.admob().initialize(ADMOD_APP_ID);
    // if (process.env['NODE_ENV'] === 'production') {
    //     adsManager = new NativeAdsManager(ADS_PLACEMENT_IDS.release.fb.native)
    // } else {
    //     adsManager = new NativeAdsManager(ADS_PLACEMENT_IDS.test.fb.native, 10)
    //
    // }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      // this.props.fetchLatestFeeds(true);
      this.setState({is_mounting: false});
      AppState.addEventListener('change', this._handleAppStateChange);
     // NetInfo.getConnectionInfo().then(this.handleConnectivityChange);
      // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
      // NetInfo.addEventListener(
      //   'connectionChange',
      //   this.handleConnectivityChange,
      // );
      this.props.setCurrentScreen(SCREENS.Home);
      this.props.setCurrentTabRoute(SCREENS.Home);
    });
    this.notificationSubscriptions();

    MessageBarManager.registerMessageBar(this.messageBarAlert);
    this.showToastListener = DeviceEventEmitter.addListener(
      'showToast',
      text => {
        this.toast.show(text, DURATION.LENGTH_SHORT);
      },
    );

    const {is_rehydrated} = this.props;
    if (is_rehydrated) {
      // call when reopen app after exit by back button on android
      SplashScreen.hide();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      is_rehydrated: prevRehydrated,
      is_app_opened_for_first_time: prev_is_app_opened_for_first_time,
      lang: prevLang,
    } = this.props;
    const {is_rehydrated, is_app_opened_for_first_time, lang} = nextProps;
    const {
      is_mounting: prevIsMounting,
      show_intro_modal: prevShowIntroModal,
      show_invite_friends_modal: prevShowInviteFriendsModal,
    } = this.state;
    const {is_mounting, show_intro_modal, show_invite_friend_modal} = nextState;

    if (
      prevRehydrated !== is_rehydrated ||
      prev_is_app_opened_for_first_time !== is_app_opened_for_first_time ||
      prevLang !== lang ||
      prevIsMounting !== is_mounting ||
      prevShowIntroModal !== show_intro_modal ||
      prevShowInviteFriendsModal !== show_invite_friend_modal
    ) {
      return true;
    }

    return false;
  }

  componentWillReceiveProps(nextProps, nextState) {
    const {is_rehydrated: prevRehydrated} = this.props;
    const {is_rehydrated} = nextProps;
    if (!prevRehydrated && is_rehydrated && !nextState.is_mounting) {
      // SplashScreen.hide();
    }
  }

  handleBackButton = () => {
    if (this.current_screen !== SCREENS.Home) {
      return false;
    }
    Alert.alert(
      'Exit App',
      'Exiting the application?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            if (__DEV__) {
              console.log('Cancel exit app alert Pressed');
            }
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {
        cancelable: true,
      },
    );
    return true;
  };

  _handleAppStateChange = nextAppState => {
    if (nextAppState === 'background' || nextAppState === 'background') {
      this.props.pause();
    }
  };

  componentWillUnmount() {
    MessageBarManager.unregisterMessageBar();
    AppState.removeEventListener('change', this._handleAppStateChange);
    this.showToastListener.remove();
    // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    // NetInfo.removeEventListener(
    //   'connectionChange',
    //   this.handleConnectivityChange,
    // );

    if (this.unSubscribeAuthSubscription) {
      this.unSubscribeAuthSubscription();
    }

    this.notificationDisplayedListener();
    this.notificationListener();
    this.notificationOpenedListener();
  }

  showIntroModal() {
    this.setState({show_intro_modal: true});
  }

  hideIntroModal() {
    this.setState({show_intro_modal: false});
  }

  notificationSubscriptions() {
    notificationPermissionHandler();
    createChannel(NOTIFICATION_CHANNEL_ID, NOTIFICATION_CHANNEL_DESCRIPTION);
    this.notificationHandlerAppOpen();
    this.notificationHandlerAppClosed();
    this.notificationDisplayListener();
    this.notificationOpenListener();
  }

  getCurrentRouteName(navigationState) {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];
    if (route.routes) {
      return this.getCurrentRouteName(route);
    }
    return route.routeName;
  }

  navigationStateHandler(prev, next) {
    const prevTabRouteIndex = prev.routes[0].index;
    const currentTabRouteIndex = next.routes[0].index;
    if (prevTabRouteIndex !== currentTabRouteIndex) {
      const {routes, index} = next.routes[0];
      const route = routes[index];
      const {routeName} = route;
      this.props.setCurrentTabRoute(routeName);
    }
    this.current_screen = this.getCurrentRouteName(next);
    if (this.current_screen === SCREENS.ArticleView) {
      this.props.setCurrentScreen(this.current_screen);
    }

    // const { translucent, backgroundColor, barStyle } = getStatusBarConfig(
    //     current_screen
    // );
    // if (Platform.OS === 'android') {
    //     StatusBar.setTranslucent(translucent);
    //     StatusBar.setBackgroundColor(backgroundColor);
    // }
    // StatusBar.setBarStyle(barStyle);

    firebase.analytics().setCurrentScreen(this.current_screen);
  }

  showInviteModal() {
    this.setState({show_invite_friends_modal: true});
  }

  hideInviteFriendsModal() {
    this.setState({show_invite_friends_modal: false});
  }

  renderInviteFriendsModal() {
    const {show_invite_friends_modal} = this.state;
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={show_invite_friends_modal}
        onRequestClose={this.hideInviteFriendsModal}>
        <ScrollView
          style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.3)'}}
          contentContainerStyle={{
            justifyContent: 'center',
          }}>
          <InviteFriend hideModal={this.hideInviteFriendsModal} />
        </ScrollView>
      </Modal>
    );
  }

  renderCondition() {
    const {i18n} = this.props;
    if (this.state.is_mounting) {
      return <Loader />;
    }
    SplashScreen.hide();
    return (
      <AppNavigator
        screenProps={{i18n, showInvite: this.showInviteModal}}
        onNavigationStateChange={this.navigationStateHandler}
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }

  renderIntroModal() {
    const {is_app_opened_for_first_time} = this.props;
    return (
      <Modal
        animationType="fade"
        transparent={false}
        visible={is_app_opened_for_first_time}
        onRequestClose={this.hideIntroModal}>
        <IntroPager closeModal={this.hideIntroModal} />
      </Modal>
    );
  }

  renderLoadingModal() {
    const {is_app_opened_for_first_time} = this.props;
    return (
      <Modal
        animationType="fade"
        transparent={false}
        visible={this.props.is_loading && !is_app_opened_for_first_time}
        onRequestClose={() => {}}>
        <Loader absolutePosition />
      </Modal>
    );
  }

  render() {
    return (
      <View style={globalStyles.container}>
        <StatusBar
          backgroundColor={STATUS_BAR}
          barStyle="light-content"
          animated={true}
        />
        {this.renderInviteFriendsModal()}
        {this.renderCondition()}
        <TTS />
        {/*{this.renderLoadingModal()}*/}
        {this.renderIntroModal()}
        <MessageBar ref={ref => (this.messageBarAlert = ref)} />
        <Toast ref={ref => (this.toast = ref)} opacity={0.7} />
      </View>
    );
  }

  authStateListener() {
    this.unSubscribeAuthSubscription = firebase
      .auth()
      .onAuthStateChanged(user => {
        if (user) {
          let u = user._user;
        } else {
          this.props.anonymousLogin();
        }
      });
  }

  handleConnectivityChange(connectionInfo) {
    if (__DEV__) {
      console.log(
        'Connection change, type: ' +
          connectionInfo.type +
          ', effectiveType: ' +
          connectionInfo.effectiveType,
      );
    }
    this.props.onConnectivityStatusChange(connectionInfo);
  }

  notificationHandlerAppOpen() {
    this.notificationListener = firebase
      .notifications()
      .onNotification((notification: Notification) => {
        // Process your notification as required
        if (__DEV__) {
          console.log(
            'notification received \n ',
            notification,
            notification.data,
          );
        }
        const notification_display = new firebase.notifications.Notification().android
          .setChannelId(NOTIFICATION_CHANNEL_ID)
          .setNotificationId(notification['notificationId'])
          .setTitle(notification.title)
          .setBody(notification.body)
          .setSound('default')
          .setData(notification.data);
        if (notification['data']['image']) {
          notification_display.android.setBigPicture(
            notification['data']['image'],
          );
          notification_display.android.setLargeIcon(
            notification['data']['image'],
          );
        }
        firebase.notifications().displayNotification(notification_display);
      });
  }

  notificationHandlerAppClosed() {
    firebase
      .notifications()
      .getInitialNotification()
      .then((notificationOpen: NotificationOpen) => {
        if (notificationOpen) {
          // App was opened by a notification
          // Get the action triggered by the notification being opened
          const action = notificationOpen.action;
          // Get information about the notification that was opened
          const notification: Notification = notificationOpen.notification;
          this.onNotificationOpen(notification);
          if (__DEV__) {
            console.log(
              'On notification clicked, app closed , action: ',
              action,
              'notification : ',
              notification.data,
            );
          }
        }
      });
  }

  notificationDisplayListener() {
    this.notificationDisplayedListener = firebase
      .notifications()
      .onNotificationDisplayed((notification: Notification) => {
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID.
        // You will have to specify this manually if you'd like to re-display the notification.
        if (__DEV__) {
          console.log('notification displayed');
        }
      });
  }

  notificationOpenListener() {
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened((notificationOpen: NotificationOpen) => {
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notification: Notification = notificationOpen.notification;
        this.onNotificationOpen(notification);

        if (__DEV__) {
          console.log(
            'On notification clicked , action: ',
            action,
            'notification : ',
            notification.data,
          );
        }
      });
  }

  onNotificationOpen(notification) {
    firebase
      .notifications()
      .removeDeliveredNotification(notification['notificationId']);
    let data = notification.data;
    if (__DEV__) {
      console.log('notification data : ', data);
    }
    ToastAndroid.show('Opening. Please wait !', ToastAndroid.SHORT);
    if (data['id']) {
      firebase
        .firestore()
        .collection('news_feeds')
        .doc(data['id'])
        .get()
        .then(doc => {
          if (doc.exists) {
            const data = doc.data();
            let edited_data = editItems([data], [], 'normal', {});
            let items = [];
            items.push(edited_data);
            if (__DEV__) {
              console.log(
                'Notification : opened : data fetched ',
                edited_data,
                items,
              );
            }
            NavigationService.navigate(SCREENS.FeedsDetail, {
              items: edited_data,
              item: edited_data[0],
              index: 0,
            });
          }
        });
    }
  }
}

const mapStateToProps = state => {
  return {
    is_app_opened_for_first_time: isAppOpenedForFirstTime(state),
    is_rehydrated: getIsRehydrated(state),
  };
};

export default connectLocalization(
  connect(
    mapStateToProps,
    {
      selectLanguage,
      anonymousLogin,
      getRemoteConfigs,
      onConnectivityStatusChange,
      setCurrentTabRoute,
      setCurrentScreen,
      fetchLatestFeeds,
      fetchFeedsByCategory,
      pause,
    },
  )(App),
);
