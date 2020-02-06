import React from 'react';
import {View, Text, Animated, Easing, Share} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {globalStyles} from '../../styles/index';
import ProtoTouchable from '../ProtoTouchable';
import Icon from '../Icon';
import {
  APPBAR_HEIGHT,
  BACKGROUND_COLOR,
  BACKGROUND_COLOR_WHITE,
  HEADER_ICON,
  ICON_COLOR,
  PRIMARY_COLOR,
  TAB_BACKGROUND_COLOR,
  TERTIARY_TEXT_COLOR,
} from '../../styles/variables';
import {__DEV__, ADS_PLACEMENT_IDS, SCREENS} from '../../constants/index';
import FastImage from 'react-native-fast-image';
import ProtoText from '../ProtoText';
import {withNavigation} from 'react-navigation';
import {HeaderBackButton} from 'react-navigation-stack';
import type {FeedItem} from '../items/feeds/DetailView';
import {connect} from 'react-redux';
import {zoomInText, zoomOutText} from '../../../Settings/action';
import {
  loadAdmobInterstitialAds,
  isLoadInterstitialVideoAds,
  isShowInterstitialAds,
} from '../../utils/ads';
import {articleViewOpen, feedsItemShare} from '../../utils/analytics';
import NativeBannerAds from '../../containers/Ads/NativeBannerAds';
import {adsManager} from '../../../App/screen/App';
import {showToast} from '../../utils/toast';

class DetailHeader extends React.PureComponent {
  props: {
    item: FeedItem,
    isArticleView: boolean,
  };

  constructor() {
    super();
    this.onBackPressed = this.onBackPressed.bind(this);
    this.onBookmarkPressed = this.onBookmarkPressed.bind(this);
    this.navigateToArticleView = this.navigateToArticleView.bind(this);
  }

  componentDidMount() {
    // let ad_unit;
    // if (process.env['NODE_ENV'] === 'production') {
    //   ad_unit = ADS_PLACEMENT_IDS.release.admob.interstitial;
    //   if (isLoadInterstitialVideoAds()) {
    //     ad_unit = ADS_PLACEMENT_IDS.release.admob.interstitial_video;
    //   }
    // } else {
    //   ad_unit = ADS_PLACEMENT_IDS.test.admob.interstitial;
    //   if (isLoadInterstitialVideoAds()) {
    //     ad_unit = ADS_PLACEMENT_IDS.test.admob.interstitial_video;
    //   }
    // }
    // this.advert = loadAdmobInterstitialAds(ad_unit);
  }

  onBackPressed() {
    const {navigation} = this.props;
    if (navigation) {
      navigation.goBack();
    }
    window.requestAnimationFrame(() => {
      if (isShowInterstitialAds()) {
        this.advert.show();
      }
    });
  }

  infoWithIcon(icon, info) {
    const viewBox = icon === 'views' ? '0 0 23 15' : '0 0 23 18';
    return (
      <View style={styles.infoWithIcon}>
        <Icon
          name={icon}
          height="20"
          width="20"
          viewBox={viewBox}
          fill={TERTIARY_TEXT_COLOR}
        />
        <ProtoText style={[globalStyles.tertiaryText, {marginLeft: 10}]}>
          {info}
        </ProtoText>
      </View>
    );
  }

  onBookmarkPressed() {
    const {onBookmarkClicked} = this.props;
    onBookmarkClicked();
    this.setState({time: Date.now()});
  }

  navigateToArticleView() {
    articleViewOpen(SCREENS.FeedsDetail);
    const {item} = this.props;
    this.props.navigation.navigate(SCREENS.ArticleView, {item: item});
  }

  onFeedItemShareClicked = item => () => {
    const params_for_analytics = {
      ...item['analytics_item'],
      from: 'Feed Detail',
    };
    feedsItemShare(params_for_analytics);

    const message = {title: item.title, message: item.news_url};
    const options = {dialogTitle: 'Share'};
    Share.share(message, options);
  };

  render() {
    const {item, isArticleView} = this.props;
    const {
      bookmarked,
      display_date,
      num_reads,
      read_time,
      type,
      source_thumb_url,
    } = item;
    const {is_playing, play_index, play_status} = item;
    const bookmark_icon = bookmarked ? 'bookmark' : 'bookmarkOutline';
    let sourceImage = source_thumb_url;
    if (type === 'ads') {
      return (
        <View
          style={{
            height: APPBAR_HEIGHT,
            backgroundColor: BACKGROUND_COLOR_WHITE,
          }}
        />
      );
    }

    return (
      <View
        style={{
          elevation: 3,
          backgroundColor: '#fff',
        }}>
        <View style={styles.headerContainer}>
          {/*Header Left components*/}

          <View style={styles.headerLeft}>
            {/*Back Button*/}
            {!isArticleView ? (
              <HeaderBackButton
                onPress={this.onBackPressed}
                tintColor={HEADER_ICON}
              />
            ) : (
              <View />
            )}

            <View
              style={[
                styles.sourceInfoContainer,
                {marginLeft: isArticleView ? 16 : 0},
              ]}>
              <View style={styles.sourceInfoContent}>
                {sourceImage ? (
                  <FastImage
                    source={{uri: sourceImage}}
                    style={styles.sourceImage}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                ) : (
                  <View style={styles.noImageContainer} />
                )}
                <View style={styles.sourceInfo}>
                  <ProtoText
                    style={[globalStyles.tertiaryText, styles.sourceTitle]}
                    numberOfLines={1}>
                    {item.site_name}
                  </ProtoText>
                  <ProtoText
                    numberOfLines={1}
                    style={[globalStyles.tertiaryText, styles.ago]}>
                    {item.ago}
                  </ProtoText>
                </View>
              </View>
            </View>
          </View>

          {/*Header Right Components*/}

          <View style={styles.headerRight}>
            {/*Bookmark Button*/}

            <View style={globalStyles.roundButtonContainer}>
              <ProtoTouchable
                style={globalStyles.roundButton}
                onPress={this.onBookmarkPressed}>
                <Icon
                  name={bookmark_icon}
                  height="20"
                  width="20"
                  viewBox="0 0 15 19"
                  fill={HEADER_ICON}
                />
              </ProtoTouchable>
            </View>

            {/*share button*/}

            {/* <View style={globalStyles.roundButtonContainer}>
                            <ProtoTouchable style={globalStyles.roundButton} onPress={this.onFeedItemShareClicked(item)}>
                                <Icon name={"share"} height='20' width='20' viewBox='0 0 15 19'
                                      fill={HEADER_ICON}/>
                            </ProtoTouchable>
                        </View> */}

            {/*Article View button*/}

            <View style={globalStyles.roundButtonContainer}>
              <ProtoTouchable
                style={globalStyles.roundButton}
                onPress={this.navigateToArticleView}>
                <Icon
                  name="articleView"
                  height="20"
                  width="20"
                  viewBox="0 0 19 21"
                  fill={HEADER_ICON}
                />
              </ProtoTouchable>
            </View>
          </View>
        </View>
        {/*<View style={styles.userInteractionInfo}>*/}
        {/*<ProtoText style={globalStyles.tertiaryText}>*/}
        {/*{display_date}*/}
        {/*</ProtoText>*/}
        {/*{this.infoWithIcon('views', num_reads)}*/}
        {/*{this.infoWithIcon('readTime', read_time)}*/}
        {/*</View>*/}
      </View>
    );
  }
}

export default withNavigation(DetailHeader);

const styles = EStyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '$headerBackgroundColor',
    paddingTop: 2,
    height: APPBAR_HEIGHT,
    paddingBottom: 2,
  },
  userInteractionInfo: {
    height: 35,
    padding: 5,
    paddingRight: 16,
    paddingLeft: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: TAB_BACKGROUND_COLOR,
  },
  infoWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '57%',
  },
  headerRight: {
    flexDirection: 'row',
    // width: 165,
  },
  sourceInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noImageContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  sourceImage: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  sourceInfoContent: {
    flexDirection: 'row',
  },
  sourceInfo: {
    marginLeft: 16,
    justifyContent: 'center',
    // width: '55%',
  },
  sourceTitle: {
    // color: '#fff'
  },
  ago: {
    // color: '#fff'
  },
});
