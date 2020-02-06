import React, {Component} from 'react';
import {
  StyleSheet,
  ToastAndroid,
  View,
  InteractionManager,
  Platform,
  StatusBar,
  UIManager,
  Modal,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import * as globalStyleVariables from '../../common/styles/variables';
import {globalStyles} from '../../common/styles/index';
import connectLocalization from '../../common/localization/connectLocalization';
import ProtoViewPager from '../../common/containers/ProtoViewPager';
import Loader from '../../common/components/Loader';
import {__DEV__, FEEDS_BATCH} from '../../common/constants';
import FeedsDetailItem from '../../common/components/items/feeds/FeedsDetailItem';
import NativeFeedsDetailAds from '../../common/containers/Ads/NativeFeedsDetailAds';
import {adsManager} from '../../App/screen/App';
import ProtoFeedDetailProgress from '../../common/components/ProtoFeedDetailProgress';
import DetailHeader from '../../common/components/headers/FeedsDetailHeader';
import ProtoText from '../../common/components/ProtoText';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from '../../common/components/Icon';
import {TERTIARY_TEXT_COLOR} from '../../common/styles/variables';
import {bookmark, remove_bookmark} from '../../Library/action';
import ArticleView from './ArticleView';
import {play, pause} from '../../TTS/action';
import ZoomButton from '../../common/components/ZoomButton';
import DetailHeaderArticleView from '../../common/components/headers/DetailHeaderArticleView';
import NativeBannerAds from '../../common/containers/Ads/NativeBannerAds';
import ProtoButton from '../../common/components/ProtoButton';
import {STATUS_BAR} from '../../common/styles/variables';
import {showToast} from '../../common/utils/toast';
import RectangleBanner from '../../common/containers/Ads/admob/RectangleBanner';
import {APPBAR_HEIGHT} from '../../common/styles/variables';
import {BACKGROUND_COLOR_WHITE} from '../../common/styles/variables';

const THUMBNAIL_SIZE = 30;

class FeedsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_mounting: true,
      selectedIndex: null,
      current_index: 0,
    };
    // if (Platform.OS === 'android') {
    //     /* eslint no-unused-expressions: ["error", { "allowShortCircuit": true }] */
    //     UIManager.setLayoutAnimationEnabledExperimental &&
    //     UIManager.setLayoutAnimationEnabledExperimental(true);
    // }
    this.renderMainContent = this.renderMainContent.bind(this);
    this.handleOnViewPagerPageSelected = this.handleOnViewPagerPageSelected.bind(
      this,
    );
    this.renderContent = this.renderContent.bind(this);
    this.onBookmarkPressed = this.onBookmarkPressed.bind(this);
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      if (this.detailView) {
        this.setState({is_mounting: false});
      }
    });
  }

  handleOnViewPagerPageSelected = index => {
    const {navigation} = this.props;
    const {params} = this.props.navigation.state;

    if (params.index !== undefined && params.index !== index) {
      const {setParams} = navigation;
      setParams({
        index,
      });
      // InteractionManager.runAfterInteractions(() => {
      //
      // });
    }
  };

  handleOnListEndReached = () => {
    const {onListEndReached} = this.props;
    if (onListEndReached) {
      onListEndReached();
    }
  };

  renderContent = ({item, index}) => {
    //  switch (item.type) {
    //   case 'ads':
    // return (
    //   <View
    //     style={[
    //       globalStyles.container,
    //       {justifyContent: 'center', alignItems: 'center'},
    //     ]}
    //     key={item.id}>
    //     {/*<NativeBannerAds index={index} adsManager={adsManager}/>*/}
    //     {/*<NativeFeedsDetailAds index={index} adsManager={adsManager}/>*/}
    //     {/*<View style={{height:APPBAR_HEIGHT, backgroundColor:BACKGROUND_COLOR_WHITE}}/>*/}
    //     {/* <RectangleBanner/> */}
    //   </View>
    // );
    // default:
    return (
      <View style={[styles.container, {width:globalStyleVariables.WINDOW_WIDTH}]} key={item.id}>
        <DetailHeader item={item} onBookmarkClicked={this.onBookmarkPressed} />
        <FeedsDetailItem
          item={item}
          index={index}
          onArticleViewPressed={this.openArticleView}
        />
      </View>
    );
  };

  renderMainContent() {
    const {items, item, index} = this.props.navigation.state.params;
    const {is_mounting} = this.state;
    if (is_mounting) {
      return <Loader />;
    }

    return (
      <View style={globalStyles.container}>
        <StatusBar
          backgroundColor={STATUS_BAR}
          animated={true}
          hidden={false}
        />
        <ProtoViewPager
          items={items}
          keyExtractor={item => item.id}
          index={index}
          renderContent={this.renderContent}
          onPageSelected={this.handleOnViewPagerPageSelected}
          onEndReached={this.handleOnListEndReached}
        />
      </View>
    );
  }

  onBookmarkPressed() {
    const {items, index} = this.props.navigation.state.params;
    const item = items[index];
    if (item) {
      item['bookmark_time'] = Date.now();
      if (!item.bookmarked) {
        ToastAndroid.show('Bookmarked', ToastAndroid.SHORT);
        item['bookmarked'] = true;
        this.props.bookmark(item);
      } else {
        item['bookmarked'] = false;
        this.props.remove_bookmark(item);
      }
    }
  }

  render() {
    const {i18n} = this.props;
    const {item, items, index} = this.props.navigation.state.params;
    const {is_mounting} = this.state;

    return (
      <View
        key={item.id}
        style={{flex: 1}}
        ref={ref => (this.detailView = ref)}>
        {index !== undefined && index !== null ? (
          <View>
            {!is_mounting ? (
              <ProtoFeedDetailProgress
                totalItems={items.length}
                index={index}
              />
            ) : (
              <View />
            )}
          </View>
        ) : (
          <View />
        )}

        {this.renderMainContent()}
      </View>
    );
  }
}

export default connect(
  null,
  {bookmark, remove_bookmark, play, pause},
)(connectLocalization(FeedsDetail));

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$backgroundColorWhite',
  },
  header: {
    backgroundColor: '$headerBackgroundColor',

    elevation: 3,

    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowRadius: 2,
  },

  newsTitle: {
    fontWeight: '500',
    color: '$secondaryTextColor',
    padding: 16,
  },
  newsDescription: {
    padding: 16,
    lineHeight: 22,
  },
  thumbnail: {
    height: 220,
    width: '100%',
  },
  pageStyle: {
    alignItems: 'center',
    padding: 20,
  },
  content: {
    flex: 1,
    width: globalStyleVariables.WINDOW_WIDTH,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: Platform.OS === 'android' ? 'flex-start' : 'center',
    ...Platform.select({
      ios: {
        maxWidth: globalStyleVariables.WINDOW_WIDTH - 150,
      },
    }),
  },
  headerThumnailNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameContainer: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  headerText: {
    color: '#fff',
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  modal: {
    flex: 1,
    marginTop: 4,
    backgroundColor: '$backgroundColorWhite',
  },
});
