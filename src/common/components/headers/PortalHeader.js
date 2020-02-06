import React from 'react';
import {
  View,
  Text,
  Modal,
  Animated,
  Easing,
  TouchableHighlight,
  ScrollView,
  Clipboard,
  ToastAndroid,
} from 'react-native';
import {Button} from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import ProtoTouchable from '../ProtoTouchable';
import {globalStyles} from '../../styles/index';
import {
  BACKGROUND_COLOR,
  BACKGROUND_COLOR_WHITE,
  ICON_COLOR,
  PRIMARY_COLOR,
  PRIMARY_TEXT_COLOR,
  SECONDARY_TEXT_COLOR,
  STATUS_BAR,
} from '../../styles/variables';
import Icon from '../Icon';
import ProtoText from '../ProtoText';
import * as globalStyleVariables from '../../styles/variables';
import ProgressBar from 'react-native-progress/Bar';
import ProgressCircle from 'react-native-progress/Circle';
import {withNavigation} from 'react-navigation';
import {HeaderBackButton} from 'react-navigation-stack';
import {
  isLoadInterstitialVideoAds,
  isShowInterstitialAds,
  loadAdmobInterstitialAds,
} from '../../utils/ads';
import {ADS_PLACEMENT_IDS} from '../../constants';

class PortalHeader extends React.Component {
  constructor() {
    super();
    this.renderButton = this.renderButton.bind(this);
    this.renderReloadAndStop = this.renderReloadAndStop.bind(this);
    this.onMoreClicked = this.onMoreClicked.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.onNavigationBackPressed = this.onNavigationBackPressed.bind(this);
    this.onAddressBarClicked = this.onAddressBarClicked.bind(this);
    this.state = {
      optionsVisible: false,
    };
  }

  componentDidMount() {
    let ad_unit = ADS_PLACEMENT_IDS.test.admob.interstitial;
    if (isLoadInterstitialVideoAds()) {
      ad_unit = ADS_PLACEMENT_IDS.test.admob.interstitial_video;
    }
    this.advert = loadAdmobInterstitialAds(ad_unit);
  }

  renderButton(icon, onPress, main) {
    let viewbox;
    const iconColor = ICON_COLOR;
    if (icon === 'moreVertical') {
      viewbox = '0 0 4 17';
    } else {
      viewbox = '0 0 17 17';
    }
    return (
      <View style={globalStyles.roundButtonContainer}>
        <ProtoTouchable onPress={onPress} style={globalStyles.roundButton}>
          <Icon
            name={icon}
            fill={iconColor}
            height="16"
            width="16"
            viewBox={viewbox}
          />
        </ProtoTouchable>
      </View>
    );
  }

  renderReloadAndStop(main) {
    const iconColor = ICON_COLOR;
    return (
      <View>
        {this.props.loading ? (
          <View style={globalStyles.roundButtonContainer}>
            <ProtoTouchable
              onPress={this.props.onStopLoadingPressed}
              style={globalStyles.roundButton}>
              <Icon
                name="close"
                fill={iconColor}
                unfilledColor={STATUS_BAR}
                height="14"
                width="14"
                viewBox="0 0 14 14"
              />
            </ProtoTouchable>
          </View>
        ) : (
          <View style={globalStyles.roundButtonContainer}>
            <ProtoTouchable
              onPress={this.props.onReloadPressed}
              style={globalStyles.roundButton}>
              <Icon
                name="reload"
                fill={iconColor}
                height="16"
                width="16"
                viewBox="0 0 17 17"
              />
            </ProtoTouchable>
          </View>
        )}
      </View>
    );
  }

  renderOptions() {
    const {
      onBackPressed,
      onForwardPressed,
      onShareClicked,
      openWith,
    } = this.props;
    return (
      <View
        style={[
          styles.headerContainer,
          {
            backgroundColor: BACKGROUND_COLOR_WHITE,
            borderBottomWidth: this.props.loading ? 0 : 3,
            borderBottomColor: PRIMARY_COLOR,
          },
        ]}>
        <View
          style={{
            position: 'absolute',
            top: 50,
          }}>
          {this.props.loading ? (
            <ProgressBar
              indeterminate
              borderRadius={0}
              height={2}
              width={globalStyleVariables.WINDOW_WIDTH}
              useNativeDriver={true}
              color={PRIMARY_COLOR}
              unfilledColor={BACKGROUND_COLOR_WHITE}
              borderColor={BACKGROUND_COLOR_WHITE}
            />
          ) : (
            <View />
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: 10,
            paddingRight: 10,
          }}>
          {this.renderButton('share', onShareClicked)}
          {this.renderButton('visitSite', openWith)}

          {this.renderButton('backward', onBackPressed)}
          {this.renderButton('forward', onForwardPressed)}
          {this.renderButton('close', this.hideModal)}
        </View>
      </View>
    );
  }

  onMoreClicked() {
    this.setState({
      optionsVisible: true,
    });
  }

  hideModal() {
    this.setState({
      optionsVisible: false,
    });
  }

  onNavigationBackPressed() {
    const {goBack} = this.props.navigation;
    goBack();
    window.requestAnimationFrame(() => {
      if (isShowInterstitialAds()) {
        this.advert.show();
      }
    });
  }
  onAddressBarClicked() {
    const {link} = this.props;
    Clipboard.setString(link);
    ToastAndroid.show('Link Copied', ToastAndroid.SHORT);
  }
  render() {
    const {link, title} = this.props;
    return (
      <View>
        {this.state.optionsVisible ? (
          this.renderOptions()
        ) : (
          <View
            style={[
              styles.headerContainer,
              {
                flexDirection: 'row',
                alignItems: 'center',
              },
            ]}>
            <HeaderBackButton
              onPress={this.onNavigationBackPressed}
              tintColor={SECONDARY_TEXT_COLOR}
            />

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <ProtoTouchable
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 25,
                  height: 38,
                  backgroundColor: BACKGROUND_COLOR,
                  paddingLeft: 10,
                  paddingRight: 10,
                  width: '55%',
                  elevation: 0,
                  // overflow: 'scroll'
                }}
                onPress={this.onAddressBarClicked}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  <ProtoText
                    style={[globalStyles.tertiaryText, {fontSize: 12}]}
                    allowFontScaling={false}>
                    {link}
                  </ProtoText>
                </ScrollView>
                {this.props.loading ? (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 38,
                      width: 38,
                    }}>
                    <ProgressCircle
                      indeterminate
                      size={16}
                      useNativeDriver={true}
                      color={SECONDARY_TEXT_COLOR}
                      // borderColor={BACKGROUND_COLOR_WHITE}
                    />
                  </View>
                ) : (
                  <View />
                )}
              </ProtoTouchable>
              {/*<ProtoText numberOfLines={1} style={[globalStyles.tertiaryText, styles.link]}>*/}
              {/*{link}*/}
              {/*</ProtoText>*/}
              <View
                style={{
                  width: 150,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                {this.renderReloadAndStop(true)}
                {this.renderButton('moreVertical', this.onMoreClicked, true)}
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default withNavigation(PortalHeader);
const styles = EStyleSheet.create({
  headerContainer: {
    height: 55,
    backgroundColor: '$backgroundColorWhite',
    elevation: 6,
  },
  title: {
    color: '$backgroundColorWhite',
    fontWeight: '500',
    marginRight: 10,
  },
  link: {
    color: '$backgroundColorWhite',
    opacity: 0.6,
    width: '90%',
  },
});
