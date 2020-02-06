import {Component} from 'react';
import React from 'react';
import {
  View,
  Image,
  InteractionManager,
  ToastAndroid,
  ImageBackground,
  Modal,
  Text,
  TouchableHighlight,
  Button,
  RefreshControl,
} from 'react-native';
import NetInfo from 'react-native-netinfo';
import ViewPagerIndicator from '../../common/containers/ViewPagerIndicator';
import {getLatestFeeds, getPagerFeeds} from '../../Feeds/selector';
import {connect} from 'react-redux';
import FeedsList from '../../common/containers/FeedsList';
import {__DEV__, ADS_PLACEMENT_IDS, SCREENS} from '../../common/constants';
import {fetchFeedsByCategory, fetchLatestFeeds} from '../../Feeds/action';
import Loading from '../../common/components/Loading';
import {globalStyles} from '../../common/styles';
import Loader from '../../common/components/Loader';
import firestore_callbacks from '../../common/utils/firestore_callbacks';
import equals from 'shallow-equals';
import {loadAdmobVideoAds} from '../../common/utils/ads';
import {welcomed} from '../../Settings/action';
import {isWelcomed} from '../../Settings/selector';
import Empty from '../../common/components/Empty';

import UpdateAvailableButton from '../../common/components/UpdateAvailableButton';
import WelcomeCard from '../../common/components/WelcomeCard';
import connectLocalization from '../../common/localization/connectLocalization';
import {
  MAX_FEEDS_ITEMS,
  VIEW_PAGER_FEED_CATEGORY,
} from '../../common/constants/index';
import AppUpdateAvailable from '../../common/components/AppUpdateAvailable';

class Home extends Component {
  constructor() {
    super();
    this.loadMoreItems = this.loadMoreItems.bind(this);
    this.onWelcomeClosePress = this.onWelcomeClosePress.bind(this);
    this.onRetry = this.onRetry.bind(this);
    this.hideUpdateAvailable = this.hideUpdateAvailable.bind(this);
    this.renderEmpty = this.renderEmpty.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
    this.headerComponent = this.headerComponent.bind(this);
    this.refreshControl = this.refreshControl.bind(this);
    this.getRef = this.getRef.bind(this);
    this.toastCalled = this.toastCalled.bind(this);
    this.show_toast = true;
    this.state = {
      title: 'Press Me',
      is_mounting: true,
      showIntroCard: true,
      show_invite_friends_modal: false,
      refreshing: false,
      date_time: null, // set is just to update the component
    };
  }

  componentDidMount() {
    const {navigation, fetchLatestFeeds, fetchFeedsByCategory} = this.props;
    InteractionManager.runAfterInteractions(() => {
      fetchLatestFeeds(true);
      fetchFeedsByCategory(true, VIEW_PAGER_FEED_CATEGORY);
      this.setState({is_mounting: false});
      navigation.setParams({
        scrollToTop: this._scrollToTop,
      });
      loadAdmobVideoAds(ADS_PLACEMENT_IDS.test.admob.video);
    });
  }

  componentWillUnmount() {
    if (firestore_callbacks['latest']) {
      firestore_callbacks['latest']();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      latest: {
        items: {second: prevItems},
      },
      latest: prevLatest,
    } = this.props;
    const {
      latest: {
        items: {second: items},
      },
      latest,
      navigation,
    } = nextProps;
    const {
      i18n: {
        extras: {please_refresh},
      },
    } = nextProps;
    if (!prevLatest.is_loading) {
      if (prevItems.length > 0 && items.length > 0) {
        if (prevItems[0]['id'] !== items[0]['id']) {
          if (this.show_toast) {
            this.toastCalled();
            ToastAndroid.show(please_refresh, ToastAndroid.SHORT);
          }
          this.show_toast = false;
          return false;
        } else if (prevLatest['lastVisible'] !== latest['lastVisible']) {
          return false;
        } else {
          return true;
        }
      }
    }

    return true;
  }

  toastCalled() {
    setTimeout(() => {
      this.show_toast = true;
    }, 2 * 1000);
  }

  _scrollToTop = () => {
    if (this.flatList) {
      this.flatList.scrollToIndex({
        index: 0,
        animated: true,
      });
    }
  };

  hideUpdateAvailable() {
    this.setState({show_update_available: false});
  }

  loadMoreItems() {
    const {
      latest: {
        items: {second},
        lastVisible,
        is_last_item,
        is_loading,
      },
    } = this.props;
    if (__DEV__) {
      console.log('load more called latest ', this.props);
    }
    if (second.length < MAX_FEEDS_ITEMS) {
      if (lastVisible) {
        if (!is_loading && !is_last_item) {
          this.props.fetchLatestFeeds(false, lastVisible);
        }
      }
    }
  }

  onWelcomeClosePress() {
    this.props.welcomed();
  }

  onRetry() {
    this.props.fetchLatestFeeds(true);
  }

  renderEmpty() {
    return (
      <Empty
        image_name="empty_contents"
        type={'feeds'}
        onRetry={this.onRetry}
      />
    );
  }

  _onRefresh() {
    this.setState({refreshing: true, show_update_available: false});
    setTimeout(() => {
      this.setState({refreshing: false});
    }, 2 * 1000);
  }

  getRef(flatList) {
    this.flatList = flatList;
  }

  refreshControl() {
    return (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this._onRefresh}
      />
    );
  }

  headerComponent() {
    const {
      pager_items,
      latest,
      latest: {is_loading, error, items, is_first_load},
      isWelcomed,
      connectivity: {is_available},
    } = this.props;

    return (
      <View style={globalStyles.container}>
        <AppUpdateAvailable />
        {!isWelcomed && is_available && items && items.first.length > 0 ? (
          <WelcomeCard onClosePressed={this.onWelcomeClosePress} />
        ) : (
          <View />
        )}
        {pager_items && pager_items.first.length > 0 ? (
          <ViewPagerIndicator items={pager_items.first} />
        ) : (
          <View />
        )}

        {/*<FeedsList*/}
        {/*from={SCREENS.Home}*/}
        {/*showCategory={true}*/}
        {/*doNotLoadMore={true}*/}
        {/*renderEmpty={this.renderEmpty()}*/}
        {/*data={{...latest, items: items.first}}*/}
        {/*/>*/}
        {/*{pager_items.second.length > 0 ? < ViewPagerIndicator items={pager_items.second}/> : <View/>}*/}
      </View>
    );
  }

  render() {
    if (this.state.is_mounting) {
      return <Loading />;
    }
    const {
      pager_items,
      latest,
      latest: {is_loading, error, items, is_first_load},
      isWelcomed,
      connectivity: {is_available},
    } = this.props;
    if (!is_loading && !is_available && (error || items.length === 0)) {
      return (
        <View style={{flex: 1}}>
          <Empty image_name={'no_connection'} onRetry={this.onRetry} />
        </View>
      );
    }
    if (is_loading && is_first_load) {
      return <Loader absolutePosition />;
    }
    return (
      <View style={globalStyles.container}>
        {this.state.show_update_available ? (
          <UpdateAvailableButton onPress={this._onRefresh} />
        ) : (
          <View />
        )}

        <FeedsList
          from={SCREENS.Home}
          showCategory={true}
          doNotShowNoContent={true}
          getRef={this.getRef}
          refreshControl={this.refreshControl()}
          headerComponent={this.headerComponent}
          data={{...latest, items: items.second}}
          loadMoreItems={this.loadMoreItems}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    pager_items: getPagerFeeds(state, VIEW_PAGER_FEED_CATEGORY),
    latest: getLatestFeeds(state),
    isWelcomed: isWelcomed(state),
    connectivity: state.connectivity,
  };
};

export default connect(
  mapStateToProps,
  {fetchLatestFeeds, fetchFeedsByCategory, welcomed},
)(connectLocalization(Home));
