import React, {Component} from 'react';
import {Dimensions, View, ImageBackground} from 'react-native';
import {Button, Text} from 'react-native-elements';
import type {FeedItem} from './feeds/DetailView';
import ProtoTouchable from '../ProtoTouchable';
import ProtoText from '../ProtoText';
import EStyleSheet from 'react-native-extended-stylesheet';
import FastImage from 'react-native-fast-image';
import {__DEV__} from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import {globalStyles} from '../../styles';

class FeedsPagerItem extends React.PureComponent {
  props: {
    item: FeedItem,
    onPress: () => {},
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  render() {
    const {item, onPress} = this.props;
    const image = item['images'][0];
    if (__DEV__) {
      console.log('Feed Pager Item props ::', item);
    }
    return (
      <View style={{height: 300, backgroundColor: '#f4f4f4'}}>
        <ProtoTouchable onPress={onPress}>
          <ImageBackground source={{uri: image}} style={styles.image}>
            <LinearGradient
              colors={[
                'rgba(0,0,0,0)',
                'rgba(0,0,0,0)',
                'rgba(0,0,0,0.5)',
                'rgba(0,0,0,0.7)',
              ]}
              style={styles.linearGradient}>
              <ProtoText
                numberOfLines={2}
                style={[globalStyles.secondaryText, styles.caption]}>
                {item.title}
              </ProtoText>
              <ProtoText
                numberOfLines={2}
                style={[globalStyles.tertiaryText, styles.description]}>
                {item.short_description}
              </ProtoText>
            </LinearGradient>
          </ImageBackground>
        </ProtoTouchable>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  image: {
    width: '100%',
    height: 300,
    // resizeMode: 'contain',
  },
  linearGradient: {
    height: 300,
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    padding: 16,
    paddingBottom: 26,
  },
  caption: {
    color: '$backgroundColorWhite',
    fontWeight: '500',
  },
  description: {
    color: '$backgroundColorWhite',
    opacity: 0.8,
    lineHeight: 18,
  },
});
export default FeedsPagerItem;
