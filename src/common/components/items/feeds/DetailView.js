import React from 'react';
import {View, Animated, Easing, ToastAndroid} from 'react-native';
import ProtoText from '../../ProtoText';
import {globalStyles} from '../../../styles/index';
import EStyleSheet from 'react-native-extended-stylesheet';
import {__DEV__} from '../../../constants/index';
import ProtoTouchable from '../../ProtoTouchable';
import FastImage from 'react-native-fast-image';
import Icon from '../../Icon';
import {
  createBookmark,
  deleteBookmark,
  checkBookmarkId,
} from '../../../../realm/bookmarks';
import {
  CARD_BACKGROUND_COLOR,
  CARD_ON_PLAY,
  ICON_COLOR,
  PRIMARY_COLOR,
  TERTIARY_TEXT_COLOR,
  SEPARATOR,
} from '../../../styles/variables';
import {connect} from 'react-redux';
import {bookmark, remove_bookmark} from '../../../../Library/action';
import {incrementFeedRead} from '../../../../Feeds/action';
import ProtoConnectionAwareImageView from '../../ProtoConnectionAwareImageView';
import {play, pause} from '../../../../TTS/action';
import {FeedItemAnalytics} from '../../../utils/analytics';
import {feedsItemPlay} from '../../../utils/analytics';
import connectLocalization from '../../../localization/connectLocalization';
import {all} from 'bluebird';

export type FeedItem = {
  id: number,
  id_original: number,
  news_url: string,
  category: string,
  site_name: string,
  title: string,
  short_desc?: string,
  desc_original: string,
  desc_formatted?: string,
  desc_list: Array<string>,
  images?: Array<string>,
  thumb_url?: string,
  published_date?: string,
  created_date: Date,
  author?: string,
  tags: Array<string>,
  num_reads: number,
  ago: string,
  read_time: string,
  site_title: string,
  bookmarked: boolean,
  display_date: string,
  is_playing: boolean,
  play_index: number,
  play_status: string,
  view_type: string,
  has_image: boolean,
  showCategory: boolean,
  analytics_item: FeedItemAnalytics,
  show_notification: boolean,
  source_thumb_url: string,
  word_count: number,
  onCategoryClicked: () => {},
};

class DetailView extends React.Component {
  props: {item: FeedItem};

  constructor() {
    super();
    this.onBookmarkPressed = this.onBookmarkPressed.bind(this);
    this.onFeedItemClicked = this.onFeedItemClicked.bind(this);
    this.onPlayButtonPressed = this.onPlayButtonPressed.bind(this);
    this.onShareButtonPressed = this.onShareButtonPressed.bind(this);
    this.state = {
      animateItem: new Animated.Value(0),
    };
  }

  shouldComponentUpdate(nextProps) {
    const {
      bookmarked: prevBookmarked,
      num_reads: prevNumReads,
      ago: prevAgo,
      play_status: prevPlayStatus,
    } = this.props.item;
    const {refresh: prevRefresh} = this.props;
    const {refresh} = nextProps;
    const {bookmarked, num_reads, play_status, ago} = nextProps.item;
    return (
      prevBookmarked !== bookmarked ||
      prevRefresh !== refresh ||
      ago !== prevAgo ||
      play_status !== prevPlayStatus
    );
  }

  componentWillMount() {
    Animated.timing(this.state.animateItem, {
      toValue: 1,
      duration: 1000,
      easing: Easing.out(Easing.ease),
    }).start();
  }

  render() {
    const {
      item,
      index,
      onClick,
      hideViews,
      showCategory,
      onCategoryClicked,
    } = this.props;
    const source_title = item.site_name.replace('.com', '');
    if (__DEV__) {
      // console.log('feeds item : ', item)
    }
    const {
      bookmarked,
      read_time,
      is_playing,
      play_status,
      source_thumb_url,
    } = item;
    const bookmark_icon = bookmarked ? 'bookmark' : 'bookmarkOutline';
    const play_text = is_playing
      ? play_status !== 'paused'
        ? 'Pause'
        : 'Play'
      : 'Play';
    const player_icon = is_playing
      ? play_status !== 'paused'
        ? 'pause'
        : 'play'
      : 'play';
    let sourceImage = source_thumb_url;
    return (
      <ProtoTouchable
        style={[
          globalStyles.card,
          {
            backgroundColor: is_playing
              ? play_status !== 'paused'
                ? CARD_ON_PLAY
                : CARD_BACKGROUND_COLOR
              : CARD_BACKGROUND_COLOR,
          },
        ]}
        onPress={this.onFeedItemClicked}>
        <View style={[styles.feedsCardContent]}>
          <View style={styles.headerContainer}>
            <View style={styles.headerContent}>
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
                  style={[globalStyles.secondaryText, styles.sourceTitle]}>
                  {source_title}
                </ProtoText>
                <ProtoText
                  style={[globalStyles.tertiaryText, styles.ago]}
                  numberOfLines={1}>
                  {item.ago} . {item.display_date}
                  {console.log(item.ago, item.display_date)}
                </ProtoText>
              </View>
            </View>
            <View style={globalStyles.roundButtonContainer}>
              <ProtoTouchable
                style={globalStyles.roundButton}
                onPress={this.onBookmarkPressed}>
                <Icon
                  name={bookmark_icon}
                  height="24"
                  width="24"
                  viewBox="0 0 15 19"
                  fill={ICON_COLOR}
                />
              </ProtoTouchable>
            </View>
          </View>

          {item.thumb_url ? (
            <ProtoConnectionAwareImageView
              show_setting={false}
              source={{uri: item.thumb_url}}
              style={styles.thumbnail}
              resizeMode={FastImage.resizeMode.cover}
            />
          ) : (
            <View />
          )}
          {/*views and read time*/}

          <View
            style={[
              styles.userInteractionInfo,
              {
                justifyContent: !showCategory ? 'flex-start' : null,
                marginTop: 10,
              },
            ]}>
            {showCategory ? (
              <ProtoTouchable
                style={{padding: 10, paddingLeft: 0}}
                onPress={onCategoryClicked}>
                <ProtoText style={[globalStyles.tertiaryText, styles.category]}>
                  #{item.category.toUpperCase()}
                </ProtoText>
              </ProtoTouchable>
            ) : (
              <View />
            )}
            {this.infoWithIcon('readTime', `${read_time} read`)}
          </View>
          {/*title*/}
          <ProtoText
            style={[globalStyles.primaryText, styles.newsTitle]}
            numberOfLines={2}>
            {item.title}
          </ProtoText>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <ProtoText
              style={[
                globalStyles.secondaryText,
                styles.newsDescription,
                // {
                //     width: item.thumb_url ? '62%' : '100%',
                // }
              ]}
              numberOfLines={3}>
              {item.desc_list}
            </ProtoText>

            {/*thumbnail image*/}
            {/*{item.thumb_url ?*/}
            {/*<ProtoConnectionAwareImageView*/}
            {/*show_setting={false}*/}
            {/*source={{uri: item.thumb_url}}*/}
            {/*style={styles.thumbnail}*/}
            {/*resizeMode={FastImage.resizeMode.cover}*/}
            {/*/> : <View/>*/}
            {/*}*/}
          </View>
          {/*description*/}
        </View>
        <View style={styles.actionButtons}>
          {this.renderActionButtons(
            player_icon,
            play_text,
            this.onPlayButtonPressed,
          )}
          <View style={styles.break} />
          {this.renderActionButtons(
            'share',
            'Share',
            this.onShareButtonPressed,
          )}
        </View>
      </ProtoTouchable>
    );
  }

  infoWithIcon(icon, info) {
    return (
      <View style={styles.infoWithIcon}>
        <Icon
          name={icon}
          height="20"
          width="20"
          viewBox="0 0 23 18"
          fill={TERTIARY_TEXT_COLOR}
        />
        <ProtoText style={[globalStyles.tertiaryText, {marginLeft: 10}]}>
          {info}
        </ProtoText>
      </View>
    );
  }

  renderActionButtons(icon, label, onPress) {
    return (
      <View style={{flex: 1}}>
        <ProtoTouchable
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: 50,
          }}
          onPress={() => onPress()}>
          <Icon
            name={icon}
            height="20"
            width="20"
            viewBox="0 0 23 18"
            fill={TERTIARY_TEXT_COLOR}
          />
          <ProtoText
            style={{
              marginLeft: 10,
            }}>
            {label}
          </ProtoText>
        </ProtoTouchable>
      </View>
    );
  }

  onCategoryPressed() {
    if (__DEV__) {
      console.log('Category Pressed');
    }
  }

  onBookmarkPressed() {
    const {item} = this.props;
    const {toast} = this.props.i18n;

    // window.requestAnimationFrame(() => {
    //   if (item) {
    //     if (__DEV__) {
    //       console.log('item from detailview', item);
    //     }
    //     item['bookmark_time'] = Date.now();
    //     if (!item.bookmarked) {
    //       this.props.bookmark(item);
    //       ToastAndroid.show(toast.item_bookmarked, ToastAndroid.SHORT);
    //     } else {
    //       this.props.remove_bookmark(item);
    //       ToastAndroid.show(
    //         toast.item_removed_from_bookmarked,
    //         ToastAndroid.SHORT,
    //       );
    //     }
    //   }
    // });
    const bookmarks = {
      id: item.id,
      //short_description: item.short_description,
      word_count: item.word_count,
      site_name: item.site_name,
     // tags: item.tags,
      images: item.images,
      title: item.title,
      thumb_url: item.thumb_url,
      news_url: item.news_url,
      //author: item.author,
      desc_original: item.desc_original,
      source_thumb_url: item.source_thumb_url,
      has_image: item.has_image,
      num_reads: item.num_reads,
      image_urls: item.image_urls,
      id_original: item.id_original,
      category: item.category,
      //created_date: item.created_date,
      //desc_list: item.desc_list,
      type: item.type,
      read_time: item.read_time,
      ago: item.ago,
      display_date: item.display_date,
      bookmarked: this.bookmarked,
      is_playing: this.is_playing,
      site_title: item.site_title,
      play_index: item.play_index,
      play_status: item.play_status,
      view_type: item.view_type,
    };

    checkBookmarkId(item.id)
      .then(result => {
        if (result) {
          deleteBookmark(item.id)
            .then(
              this.props.remove_bookmark(item),
              ToastAndroid.show(
                toast.item_removed_from_bookmarked,
                ToastAndroid.SHORT,
              ),
            )
            .catch(error => {
              console.log(`Bookmarks delete error: ${error}`);
            });
        } else {
          createBookmark(bookmarks)
            .then(
              this.props.bookmark(item),
              ToastAndroid.show(toast.item_bookmarked, ToastAndroid.SHORT),
            )
            .catch(error => {
              console.log(`Bookmarks create error: ${error}`);
            });
        }
      })
      .catch(error => {
        console.log(`Bookmarks error: ${error}`);
      });
  }

  onPlayButtonPressed() {
    const {
      item: {is_playing, play_index, play_status},
      item,
      onCategoryClicked,
    } = this.props;
    const params_for_analytics = {
      ...item['analytics_item'],
      play_status,
      play_index,
      from: 'feeds_item',
    };
    feedsItemPlay(params_for_analytics);
    if (play_status && play_status === 'playing') {
      this.props.pause();
    } else {
      this.props.play(this.props.item, play_index);
    }
  }

  onShareButtonPressed() {
    this.props.shareOnClick();
  }

  onFeedItemClicked() {
    const {item, index, onClick} = this.props;
    // this.props.incrementFeedRead(item);
    onClick();
  }
}

const mapDispatchToProps = {
  bookmark,
  remove_bookmark,
  incrementFeedRead,
  play,
  pause,
};

export default connect(
  null,
  mapDispatchToProps,
)(connectLocalization(DetailView));

const styles = EStyleSheet.create({
  feedsCardContent: {},
  headerContainer: {
    padding: 16,
    paddingRight: 7,
    paddingBottom: 8,
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noImageContainer: {
    height: '$logoHeight',
    width: '$logoHeight',
    borderRadius: '$logoHeight / 2',
    backgroundColor: '$backgroundColor',
  },
  sourceImage: {
    height: '$logoHeight',
    width: '$logoHeight',
    borderRadius: '$logoHeight / 2',
  },
  headerContent: {
    flexDirection: 'row',
  },
  sourceInfo: {
    marginLeft: 16,
    justifyContent: 'center',
  },
  sourceTitle: {
    color: '$primaryTextColor',
  },

  thumbnail: {
    height: 160,
    width: '100%',
  },
  metaData: {
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: {
    color: '$primaryColor',
  },
  newsTitle: {
    fontWeight: '500',
    color: '$secondaryTextColor',
    fontSize: '$primaryTextSize-4',
    padding: 16,
    paddingBottom: 5,
    paddingTop: 0,
    lineHeight: 28,
  },
  newsDescription: {
    color: '$tertiaryTextColor',
    padding: 16,
    paddingTop: 0,
    lineHeight: 24,
  },
  userInteractionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 16,
    marginLeft: 6,
  },
  infoWithIcon: {
    marginLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtons: {
    borderTopWidth: 1,
    borderTopColor: SEPARATOR,
    flexDirection: 'row',
  },
  break: {
    width: 1,
    backgroundColor: SEPARATOR,
  },
});
