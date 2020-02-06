import {withNativeAd} from 'react-native-fbads';
import {Text} from 'react-native-elements';
import React from 'react';
import {View} from 'react-native';
import {__DEV__} from '../../constants';
import {globalStyles} from '../../styles';
import EStyleSheet from 'react-native-extended-stylesheet';
import FastImage from 'react-native-fast-image';
import ProtoText from '../../components/ProtoText';
import ProtoTouchable from '../../components/ProtoTouchable';
import ProtoButton from '../../components/ProtoButton';
import Icon from '../../components/Icon';
import {
  ICON_COLOR,
  TERTIARY_TEXT_COLOR,
  BACKGROUND_COLOR_WHITE,
  PRIMARY_COLOR,
} from '../../styles/variables';

/*
*sample data
*
callToActionText:
"Install Now"
coverImage:"https://static.xx.fbcdn.net/rsrc.php/v3/yb/r/E5W3BBFcz2Y.png"
description:"Your ad integration works. Woohoo!"
icon:"https://static.xx.fbcdn.net/rsrc.php/v3/y2/r/HgxmyzKUI9r.png"
subtitle:"An ad for Facebook"
title:"Facebook Test Ad"

* */

class NativeFeedsAds extends React.Component {
  componentWillMount() {}
  renderActionButtons(label, onPress) {
    return (
      <View style={{flex: 1}}>
        <ProtoTouchable
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderTopWidth: 1,
            borderTopColor: '#eaeaea',
            height: 50,
          }}>
          <ProtoText
            style={[
              globalStyles.tertiaryText,
              {
                marginLeft: 10,
                fontWeight: '600',
              },
            ]}>
            {label}
          </ProtoText>
        </ProtoTouchable>
      </View>
    );
  }
  render() {
    if (__DEV__) {
      // console.log("Native feeds ads : render : props ", this.props);
    }
    const {
      title,
      subtitle,
      icon,
      coverImage,
      callToActionText,
      description,
    } = this.props.nativeAd;
    return (
      <View style={[styles.adContainer]}>
        <View style={styles.headerContainer}>
          <View style={styles.headerContent}>
            <FastImage
              source={{uri: icon}}
              style={styles.icon}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View style={{marginLeft: 10, alignItems: 'center'}}>
              {/*<Text>{title}</Text>*/}
              <ProtoText style={[globalStyles.secondaryText, styles.title]}>
                {title}
              </ProtoText>
              <ProtoText style={[globalStyles.tertiaryText]}>
                {subtitle}
              </ProtoText>
            </View>
          </View>
        </View>
        <FastImage
          source={{uri: coverImage}}
          style={styles.coverImage}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View>
          <ProtoText style={[globalStyles.secondaryText, styles.description]}>
            {description}
          </ProtoText>
          {/* {this.renderActionButtons(callToActionText)} */}
          <ProtoButton
            backgroundColor={BACKGROUND_COLOR_WHITE}
            style={{
              width: '100%',
              // elevation: 3 ,
              borderColor: PRIMARY_COLOR,
              margin: 0,
              shadowOpacity: 0.2,
              shadowRadius: 2,
              shadowColor: '#000',
              shadowOffset: {height: 2, width: 0},
            }}
            // iconName='share'
            label={callToActionText}
            tintColor={PRIMARY_COLOR}
            // onClick={this.onVisitSiteClicked}
          />
        </View>
      </View>
    );
  }
}

export default withNativeAd(NativeFeedsAds);

const styles = EStyleSheet.create({
  adContainer: {
    elevation: 0,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    padding: 16,
    flexDirection: 'row',
  },
  sourceInfo: {
    marginLeft: 16,
    justifyContent: 'center',
  },
  icon: {
    height: '$logoHeight',
    width: '$logoHeight',
    borderRadius: '$iconHeight / 2',
  },
  coverImage: {
    height: 180,
    width: '100%',
  },
  title: {
    color: '$primaryTextColor',
  },
  actionButtons: {
    borderTopWidth: 1,
    borderTopColor: '$backgroundColor',
    flexDirection: 'row',
  },
  description: {
    padding: 16,
  },
});
// export default NativeFeedsAds;
