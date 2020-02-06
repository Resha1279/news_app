import React from 'react';
import {View} from 'react-native';
import ProtoText from '../../ProtoText';
import {globalStyles} from '../../../styles/index';
import EStyleSheet from 'react-native-extended-stylesheet';
import {__DEV__} from '../../../constants/index';
import ProtoTouchable from '../../ProtoTouchable';
import FastImage from 'react-native-fast-image';
import Icon from '../../Icon';
import {ICON_COLOR, TERTIARY_TEXT_COLOR} from '../../../styles/variables';
import {connect} from 'react-redux';
import {bookmark, remove_bookmark} from '../../../../Library/action';
import {incrementFeedRead} from '../../../../Feeds/action';
import type {FeedItem} from './DetailView';

class FeedsItemWithoutImage extends React.PureComponent {
  props: {item: FeedItem};

  constructor() {
    super();
    this.onBookmarkPressed = this.onBookmarkPressed.bind(this);
    this.onFeedItemClicked = this.onFeedItemClicked.bind(this);
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
    if (item) {
      if (!item.bookmarked) {
        this.props.bookmark(item);
      } else {
        this.props.remove_bookmark(item);
      }
    }
  }

  onPlayButtonPressed() {
    if (__DEV__) {
      console.log('Play ProtoButton Pressed');
    }
  }

  onShareButtonPressed() {
    if (__DEV__) {
      console.log('Share ProtoButton Pressed');
    }
  }
  onFeedItemClicked() {
    const {item, index, onClick} = this.props;
    // this.props.incrementFeedRead(item);
    onClick();
  }

  render() {
    const {item, index, onClick} = this.props;
    const source_title = item.site_name.replace('.com', '');
    const ago = '2 hrs';
    const views = '2,034';
    const read_time = '5 min';
    if (__DEV__) {
      console.log('feeds item : ', item);
    }
    const {bookmarked} = item;
    const bookmark_icon = bookmarked ? 'bookmark' : 'bookmarkOutline';
    let sourceImage;
    return (
      <ProtoTouchable
        style={globalStyles.card}
        onPress={this.onFeedItemClicked}>
        <View style={styles.feedsCardContent}>
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
                  style={[globalStyles.tertiaryText, styles.sourceTitle]}>
                  {source_title}
                </ProtoText>
                <ProtoText style={[globalStyles.tertiaryText]}>{ago}</ProtoText>
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

          {/*thumbnail image*/}

          <FastImage
            source={{uri: item.thumb_url}}
            style={styles.thumbnail}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={styles.metaData}>
            <ProtoTouchable
              style={{padding: 10, paddingLeft: 0}}
              onPress={this.onCategoryPressed}>
              <ProtoText style={[globalStyles.tertiaryText, styles.category]}>
                #{item.category.toUpperCase()}
              </ProtoText>
            </ProtoTouchable>

            <ProtoText style={[globalStyles.tertiaryText]}>
              {/*{`${item.created_date.getFullYear()}/${item.created_date.getMonth()}/${item.created_date.getDate()}`}*/}
            </ProtoText>
          </View>

          {/*views and read time*/}

          <View style={styles.userInteractionInfo}>
            {this.infoWithIcon('views', views)}
            {this.infoWithIcon('readTime', read_time)}
          </View>

          {/*title*/}
          <ProtoText
            style={[globalStyles.primaryText, styles.newsTitle]}
            numberOfLines={3}>
            {item.title}
          </ProtoText>

          {/*description*/}

          <ProtoText
            style={[globalStyles.tertiaryText, styles.newsDescription]}
            numberOfLines={4}>
            {item.desc_list}
          </ProtoText>
        </View>
        <View style={styles.actionButtons}>
          {this.renderActionButtons('play', 'Play', this.onPlayButtonPressed)}
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
}

export default connect(
  null,
  {bookmark, remove_bookmark, incrementFeedRead},
)(FeedsItemWithoutImage);

const styles = EStyleSheet.create({
  feedsCardContent: {},
  headerContainer: {
    padding: 16,
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
  },
  sourceTitle: {
    color: '$primaryTextColor',
  },

  thumbnail: {
    height: 180,
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
    padding: 16,
    paddingTop: 0,
  },
  newsDescription: {
    padding: 16,
    paddingTop: 0,
  },
  userInteractionInfo: {
    paddingBottom: 10,
    flexDirection: 'row',
  },
  infoWithIcon: {
    marginLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtons: {
    borderTopWidth: 1,
    borderTopColor: '$backgroundColor',
    flexDirection: 'row',
  },
  break: {
    width: 1,
    backgroundColor: '$backgroundColor',
  },
});
