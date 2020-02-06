import React from 'react';
import {View, Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {globalStyles} from '../../styles/index';
import ProtoTouchable from '../ProtoTouchable';
import Icon from '../Icon';
import {
  BACKGROUND_COLOR_WHITE,
  ICON_COLOR,
  TERTIARY_TEXT_COLOR,
} from '../../styles/variables';
import {__DEV__} from '../../constants/index';
import FastImage from 'react-native-fast-image';
import ProtoText from '../ProtoText';
import {withNavigation} from 'react-navigation';
import {HeaderBackButton} from 'react-navigation-stack';
import {FeedItem} from '../items/feeds/DetailView';
import {connect} from 'react-redux';
import {zoomInText, zoomOutText} from '../../../Settings/action';
import {ADS_PLACEMENT_IDS} from '../../constants';
import {
  loadAdmobInterstitialAds,
  isLoadInterstitialVideoAds,
  isShowInterstitialAds,
} from '../../utils/ads';

class DetailHeaderArticleView extends React.PureComponent {
  props: {item: FeedItem, isArticleView: boolean};

  constructor() {
    super();
    this.onBackPressed = this.onBackPressed.bind(this);
    this.onBookmarkPressed = this.onBookmarkPressed.bind(this);
    this.onClosePressed = this.onClosePressed.bind(this);
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

  onBookmarkPressed() {
    const {onBookmarkClicked} = this.props;
    onBookmarkClicked();
    this.setState({time: Date.now()});
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
          fill={BACKGROUND_COLOR_WHITE}
        />
        <ProtoText
          style={[
            globalStyles.tertiaryText,
            styles.whiteText,
            {marginLeft: 10},
          ]}>
          {info}
        </ProtoText>
      </View>
    );
  }

  onClosePressed() {
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

  render() {
    const {
      item,
      isArticleView,
      closeArticleView,
      onPlay,
      playOrPause,
    } = this.props;
    const {bookmarked, display_date, num_reads, source_thumb_url, type} = item;
    const bookmark_icon = bookmarked ? 'bookmark' : 'bookmarkOutline';
    let sourceImage = source_thumb_url;
    // if (type === 'ads') {
    //   return <View />;
    // }
    return (
      <View style={{elevation: 3, backgroundColor: '#fff'}}>
        <View style={styles.headerContainer}>
          {/*Header Left components*/}

          <View style={styles.headerLeft}>
            {/*Back Button*/}
            {!isArticleView ? (
              <HeaderBackButton onPress={this.onBackPressed} />
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
                    style={[globalStyles.tertiaryText, styles.sourceTitle]}>
                    {item.site_name}
                  </ProtoText>
                  <ProtoText style={[globalStyles.tertiaryText, styles.ago]}>
                    {item.ago}
                  </ProtoText>
                </View>
              </View>
            </View>
          </View>

          {/*Header Right Components*/}

          <View style={styles.headerRight}>
            {/*/!* + - Button*!/*/}
            {/*{*/}
            {/*isArticleView ?*/}
            {/*<View style={globalStyles.roundButtonContainer}>*/}
            {/*<ProtoTouchable style={globalStyles.roundButton} onPress={this.zoomInText}>*/}
            {/*<Text>+</Text>*/}
            {/*</ProtoTouchable>*/}
            {/*<ProtoTouchable style={globalStyles.roundButton} onPress={this.zoomOutText}>*/}
            {/*<Text>-</Text>*/}
            {/*</ProtoTouchable>*/}
            {/*</View> : <View/>*/}
            {/*}*/}
            {/*Play Button*/}
            {playOrPause === 'Play' ? (
              <View style={globalStyles.roundButtonContainer}>
                <ProtoTouchable
                  style={globalStyles.roundButton}
                  onPress={onPlay}>
                  <Icon
                    name={playOrPause.toLowerCase()}
                    height="20"
                    width="20"
                    viewBox="0 0 20 20"
                    fill={BACKGROUND_COLOR_WHITE}
                  />
                </ProtoTouchable>
              </View>
            ) : (
              <View style={globalStyles.roundButtonContainer}>
                <ProtoTouchable
                  style={globalStyles.roundButton}
                  onPress={onPlay}>
                  <Icon
                    name={playOrPause.toLowerCase()}
                    height="20"
                    width="20"
                    viewBox="0 0 20 20"
                    fill={BACKGROUND_COLOR_WHITE}
                  />
                </ProtoTouchable>
              </View>
            )}

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
                  fill={BACKGROUND_COLOR_WHITE}
                />
              </ProtoTouchable>
            </View>

            {/*Toggle Article View button*/}
            {isArticleView ? (
              <View style={globalStyles.roundButtonContainer}>
                <ProtoTouchable
                  style={globalStyles.roundButton}
                  onPress={this.onClosePressed}>
                  <Icon
                    name="close"
                    height="20"
                    width="20"
                    viewBox="0 0 15 15"
                    fill={BACKGROUND_COLOR_WHITE}
                  />
                </ProtoTouchable>
              </View>
            ) : (
              <View style={globalStyles.roundButtonContainer}>
                <ProtoTouchable
                  style={globalStyles.roundButton}
                  onPress={closeArticleView}>
                  <Icon
                    name="articleView"
                    height="20"
                    width="20"
                    viewBox="0 0 19 21"
                    fill={BACKGROUND_COLOR_WHITE}
                  />
                </ProtoTouchable>
              </View>
            )}
          </View>
        </View>
        {/*<View style={styles.userInteractionInfo}>*/}
        {/*<ProtoText style={[globalStyles.tertiaryText,styles.whiteText]}>*/}
        {/*{display_date}*/}
        {/*</ProtoText>*/}
        {/*{this.infoWithIcon('views', num_reads)}*/}
        {/*{this.infoWithIcon('readTime', read_time)}*/}
        {/*</View>*/}
      </View>
    );
  }
}

export default withNavigation(DetailHeaderArticleView);
const styles = EStyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '$secondaryTextColor',
    paddingTop: 2,
    paddingBottom: 2,
  },
  userInteractionInfo: {
    height: 35,
    padding: 5,
    paddingRight: 16,
    paddingLeft: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '$secondaryTextColor',
  },
  infoWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
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
    backgroundColor: '$primaryTextColor',
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
  },
  sourceTitle: {
    color: '$backgroundColorWhite',
  },
  ago: {
    color: '$backgroundColorWhite',
  },
  whiteText: {
    color: '$backgroundColorWhite',
    opacity: 0.8,
  },
});
