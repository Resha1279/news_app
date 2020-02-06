import {Component} from 'react';
import React from 'react';
import {Share, View, ScrollView, StatusBar, Animated} from 'react-native';
import {globalStyles} from '../../../styles/index';
import DetailHeader from '../../headers/FeedsDetailHeader';
import {__DEV__, SCREENS} from '../../../constants/index';
import type {FeedItem} from './DetailView';

import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from '../../Icon';
import {
  BACKGROUND_COLOR_WHITE,
  ICON_COLOR,
  PRIMARY_COLOR,
  STATUS_BAR,
  TERTIARY_TEXT_COLOR,
} from '../../../styles/variables';
import ProtoText from '../../ProtoText';
import ProtoConnectionAwareImageView from '../../ProtoConnectionAwareImageView';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import {bookmark, remove_bookmark} from '../../../../Library/action';
import {incrementFeedRead} from '../../../../Feeds/action';
import connectLocalization from '../../../localization/connectLocalization';
import {withNavigation} from 'react-navigation';
import ProtoTouchable from '../../ProtoTouchable';
import ProtoArticleViewImage from '../../ProtoArticleViewImage';
import ProtoButton from '../../ProtoButton';
import Communications from 'react-native-communications';
import RectangleBanner from '../../../containers/Ads/admob/RectangleBanner';
import {ADS_PLACEMENT_IDS} from '../../../constants';
import {feedsItemShare} from '../../../utils/analytics';

export type FeedDetail = FeedItem;

class FeedsDetailItem extends React.Component {
  props: {
    item: FeedDetail,
    index: number,
  };

  constructor() {
    super();
    this.onVisitSiteClicked = this.onVisitSiteClicked.bind(this);
  }

  componentWillMount() {}
  infoWithIcon(icon, info) {
    const viewBox = icon === 'views' ? '0 0 23 15' : '0 0 23 18';
    return (
      <View style={[styles.infoWithIcon, {marginLeft: 16}]}>
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

  onVisitSiteClicked() {
    const {news_url} = this.props.item;
    this.props.navigation.navigate(SCREENS.WebViewer, {link: news_url});
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
    const {index, onArticleViewPressed, item} = this.props;
    // const read_time = '3 min';
    const {
      title,
      desc_list,
      read_time,
      bookmarked,
      display_date,
      short_description,
      images,
      source_image,
      ago,
      num_reads,
    } = item;
    return (
      <View style={[globalStyles.container, styles.container]}>
        <StatusBar
          backgroundColor={STATUS_BAR}
          animated={true}
          hidden={false}
        />
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{paddingBottom: 60}}>
          <ProtoText style={[globalStyles.primaryText, styles.newsTitle]}>
            {title}
          </ProtoText>
          <View style={styles.userInteractionInfo}>
            <ProtoText style={globalStyles.tertiaryText}>
              {display_date}
            </ProtoText>
            {/*{this.infoWithIcon('views', num_reads)}*/}
            {this.infoWithIcon('readTime', read_time)}
          </View>
          {images && images.length > 0 ? (
            <ProtoArticleViewImage
              from={'FeedsDetailItem'}
              source={{uri: images[0]}}
              style={styles.thumbnail}
              resizeMode={FastImage.resizeMode.cover}
            />
          ) : (
            <View />
          )}

          <ProtoText
            style={[globalStyles.secondaryText, styles.newsDescription]}>
            {short_description}
          </ProtoText>
          <View style={styles.buttonVessel}>
            <ProtoButton
              backgroundColor={BACKGROUND_COLOR_WHITE}
              style={{
                width: 130,
                // elevation: 3 ,
                borderColor: PRIMARY_COLOR,
                shadowOpacity: 0.2,
                shadowRadius: 2,
                shadowColor: '#000',
                shadowOffset: {height: 2, width: 0},
              }}
              iconName="share"
              label={this.props.i18n.button_labels.share}
              tintColor={PRIMARY_COLOR}
              onClick={this.onFeedItemShareClicked(item)}
            />
            <ProtoButton
              backgroundColor={PRIMARY_COLOR}
              style={{
                width: 130,
                elevation: 3,
                shadowOpacity: 0.2,
                shadowRadius: 2,
                shadowColor: '#000',
                shadowOffset: {height: 2, width: 0},
              }}
              iconName="visitSite"
              label={this.props.i18n.button_labels.feed_detail_visit_site}
              tintColor={BACKGROUND_COLOR_WHITE}
              onClick={this.onVisitSiteClicked}
            />
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={[
                globalStyles.card,
                {
                  height: 250,
                  width: 300,
                  marginTop: 20,
                  marginBottom: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              {/* <RectangleBanner /> */}
            </View>
          </View>
        </ScrollView>
        {/*<Text>{source_image}</Text>*/}
        {/*<Button title={"Article View"} onPress={onArticleViewPressed}/>*/}
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  buttonVessel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
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
  userInteractionInfo: {
    height: 35,
    padding: 5,
    paddingRight: 16,
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  infoWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newsTitle: {
    fontWeight: '500',
    color: '$secondaryTextColor',
    padding: 16,
    paddingBottom: 0,
  },
  newsDescription: {
    padding: 16,
    lineHeight: 22,
  },
  thumbnail: {
    height: 220,
    width: '100%',
  },
  actionButtonContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.6)',
    height: 40,
    borderRadius: 30,
    overflow: 'hidden',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  break: {
    height: 55,
    width: 1,
    backgroundColor: '$backgroundColorWhite',
    opacity: 0.4,
  },
});
export default connect(
  null,
  {bookmark, remove_bookmark},
)(connectLocalization(withNavigation(FeedsDetailItem)));
