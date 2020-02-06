import {Component} from 'react';
import React from 'react';
import {
  View,
  ToastAndroid,
  InteractionManager,
  ScrollView,
  RefreshControl,
  Button,
} from 'react-native';
import FeedsList from '../../common/containers/FeedsList';
import {getFeedsByCategory, getLatestFeeds} from '../selector';
import {connect} from 'react-redux';
import {fetchFeedsByCategory, fetchLatestFeeds} from '../action';
import Loader from '../../common/components/Loader';
import {__DEV__, FEEDS_CATEGORIES, SCREENS} from '../../common/constants';
import {getFeedListViewType} from '../../Settings/selector';
import firestore_callbacks from '../../common/utils/firestore_callbacks';
import {globalStyles} from '../../common/styles/index';
import InviteFriendsModal from '../../common/containers/InviteFriendsModal';
import {withNavigation} from 'react-navigation';
import UpdateAvailableButton from '../../common/components/UpdateAvailableButton';
import equals from 'shallow-equals';
import connectLocalization from '../../common/localization/connectLocalization';
import {MAX_FEEDS_ITEMS} from '../../common/constants/index';

class Feeds extends Component {
  props: {
    category: {
      key: string,
      title: string,
      title_other: string,
    },
  };

  constructor() {
    super();
    this.loadMoreItems = this.loadMoreItems.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
    this.hideUpdateAvailable = this.hideUpdateAvailable.bind(this);
    this.refreshControl = this.refreshControl.bind(this);
    this.getRef = this.getRef.bind(this);
    this.toastCalled = this.toastCalled.bind(this);
    this.show_toast = true;
    this.state = {
      is_mounting: true,
      refreshing: false,
      show_update_available: false,
    };
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   //TODO: automatic refresh after new feeds are available
  //   const {
  //     data: {items: prevItems},
  //     data: prevData,
  //   } = this.props;
  //   const {
  //     data: {items},
  //     data,
  //   } = nextProps;
  //   const {
  //     i18n: {
  //       extras: {please_refresh},
  //     },
  //   } = nextProps;
  //   if (!prevData.is_loading) {
  //     if (prevItems.length > 0) {
  //       if (prevItems[0]['id'] !== items[0]['id']) {
  //         if (this.show_toast) {
  //           this.toastCalled();
  //           ToastAndroid.show(please_refresh, ToastAndroid.SHORT);
  //         }
  //         this.show_toast = false;
  //         return false;
  //       } else {
  //         const result = !equals(
  //           {...prevData, lastVisible: null},
  //           {...data, lastVisible: null},
  //         );
  //         return result;
  //       }
  //     }
  //   }
  //   return true;
  // }

  toastCalled() {
    setTimeout(() => {
      this.show_toast = true;
    }, 2 * 1000);
  }

  componentDidMount() {
    const {category} = this.props;
    InteractionManager.runAfterInteractions(() => {
      this.props.fetchFeedsByCategory(true, category);
      this.props.navigation.setParams({
        scrollToTop: this._scrollToTop,
      });
      this.setState({is_mounting: false});
    });
  }

  componentWillUnmount() {
    const {category} = this.props;
    if (firestore_callbacks[category.key]) {
      firestore_callbacks[category.key]();
    }
  }

  loadMoreItems() {
    const {
      data: {items, lastVisible, is_last_item, is_loading},
      category,
      data,
    } = this.props;
    // if (items.length < MAX_FEEDS_ITEMS) {
    if (lastVisible) {
      if (!is_loading && !is_last_item) {
        if (__DEV__) {
          console.log('load more called', data);
        }
        this.props.fetchFeedsByCategory(false, category, lastVisible);
      }
    }
    // }
  }

  hideUpdateAvailable() {
    this.setState({show_update_available: false});
  }

  _onRefresh() {
    this.setState({refreshing: true});
    setTimeout(() => {
      this.setState({refreshing: false, show_update_available: false});
    }, 2 * 1000);
  }

  _scrollToTop = () => {
    if (this.flatList) {
      this.flatList.scrollToIndex({index: 0, animated: true});
    }
  };

  refreshControl() {
    return (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this._onRefresh}
      />
    );
  }

  getRef(flatList) {
    this.flatList = flatList;
  }

  render() {
    if (this.state.is_mounting) {
      return (
        <View style={{flex: 1}}>
          <Loader />
        </View>
      );
    }
    if (__DEV__) {
      console.log('feeds : props ', this.props);
    }
    const {
      data,
      data: {is_first_load, is_loading},
    } = this.props;
    return (
      <View style={globalStyles.container}>
        {this.state.show_update_available ? (
          <UpdateAvailableButton onPress={this._onRefresh} />
        ) : (
          <View />
        )}
        {/*<ScrollView*/}
        {/*ref={(ref) => {*/}
        {/*this.flatList = ref*/}
        {/*}}*/}
        {/*refreshControl={*/}
        {/*<RefreshControl*/}
        {/*refreshing={this.state.refreshing}*/}
        {/*onRefresh={this._onRefresh}*/}
        {/*/>*/}
        {/*}*/}
        {/*style={globalStyles.container}>*/}

        <FeedsList
          from={SCREENS.FeedCategory}
          data={data}
          getRef={this.getRef}
          refreshControl={this.refreshControl()}
          loadMoreItems={this.loadMoreItems}
        />
        {/*</ScrollView>*/}
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const data = getFeedsByCategory(state, ownProps.category);
  return {data};
};

export default connect(
  mapStateToProps,
  {fetchLatestFeeds, fetchFeedsByCategory},
)(withNavigation(connectLocalization(Feeds)));
