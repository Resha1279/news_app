import {Component} from 'react';
import React from 'react';
import {
  View,
  Text,
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
import {
  __DEV__,
  FEEDS_CATEGORIES,
  SCREENS,
  FEEDS_CATEGORIES_TITLE,
} from '../../common/constants';
import {getFeedListViewType} from '../../Settings/selector';
import firestore_callbacks from '../../common/utils/firestore_callbacks';
import {globalStyles} from '../../common/styles/index';
import InviteFriendsModal from '../../common/containers/InviteFriendsModal';
import {withNavigation} from 'react-navigation';
import UpdateAvailableButton from '../../common/components/UpdateAvailableButton';
import Feeds from './Feeds';
import connectLocalization from '../../common/localization/connectLocalization';
import ModalDropdown from 'react-native-modal-dropdown-with-flatlist';

class FeedsCategory extends Component {
  constructor(props) {
    super(props);
    const {feeds_category} = props.i18n;
    let categories = [];
    FEEDS_CATEGORIES.map(category => {
      let item = {key: category.key, title: category.key};
      categories.push(item);
      if (__DEV__) {
        console.log('Categories in feed categories ', item);
      }
    });
    this.state = {
      is_mounting: true,
      show_update_available: false,
      index: 0,
      routes: categories,
    };
  }

  componentWillReceiveProps(nextProps, nextState) {
    const {lang: prevLang} = this.props;
    const {lang, i18n} = nextProps;
    const {feeds_category} = nextProps.i18n;
    let categories = [];
    FEEDS_CATEGORIES.map(category => {
      let item = {key: category.key, title: category.key};
      categories.push(item);
    });
    if (lang !== prevLang) {
      this.setState({
        routes: categories,
      });
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({is_mounting: false});
    });
  }

  handleChangeTab = index => {
    this.setState({index});
  };

  renderScene = route => {
    if (__DEV__) {
      console.log('Render Scene route:: ', route);
    }
    this.setState({index: route});
    // switch (routes.key) {
    //   case FEEDS_CATEGORIES[0].key:
    //     return <Feeds category={FEEDS_CATEGORIES[0]} />;
    //   case FEEDS_CATEGORIES[1].key:
    //     return <Feeds category={FEEDS_CATEGORIES[1]} />;
    //   case FEEDS_CATEGORIES[2].key:
    //     return <Feeds category={FEEDS_CATEGORIES[2]} />;
    //   case FEEDS_CATEGORIES[3].key:
    //     return <Feeds category={FEEDS_CATEGORIES[3]} />;
    //   case FEEDS_CATEGORIES[4].key:
    //     return <Feeds category={FEEDS_CATEGORIES[4]} />;
    //   case FEEDS_CATEGORIES[5].key:
    //     return <Feeds category={FEEDS_CATEGORIES[5]} />;
    //   case FEEDS_CATEGORIES[6].key:
    //     return <Feeds category={FEEDS_CATEGORIES[6]} />;
    //   default:
    //     return <Feeds category={FEEDS_CATEGORIES[0]} />;
    // }
  };

  render() {
    if (this.state.is_mounting) {
      return <Loader />;
    }
    return (
      <View style={globalStyles.container}>
        <ModalDropdown
          options={FEEDS_CATEGORIES_TITLE}
          defaultValue={FEEDS_CATEGORIES_TITLE[0]}
          selectedOptionIndex={0}
          onSelect={this.renderScene}
          style={{
            backgroundColor: 'red',
            height: 40,
            justifyContent: 'center',
            // position: 'absolute',
            // top: -0,
            // right: 0,
            // zIndex:100,
          }}
        />
        <Feeds category={FEEDS_CATEGORIES[this.state.index]} />
      </View>
    );
  }
}

export default connectLocalization(FeedsCategory);
