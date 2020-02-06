import {Component} from 'react';
import React from 'react';
import {Button, Text, View, DeviceEventEmitter} from 'react-native';
import connectLocalization from '../../common/localization/connectLocalization';
import {connect} from 'react-redux';
import {selectLanguage} from '../../Settings/action';
import {MessageBarManager} from 'react-native-message-bar';
import {downloader} from '../../common/downloader/action';
import RNFetchBlob from 'rn-fetch-blob';
import {showToast} from '../../common/utils/toast';
import {ADS_PLACEMENT_IDS, SCREENS} from '../../common/constants/index';
import firebase from 'react-native-firebase';
/// ads
import {BannerView, InterstitialAdManager} from 'react-native-fbads';
import {RewardedVideoAdManager} from 'react-native-fbads';
const imageUrls = [
  'https://wallpaperbrowse.com/media/images/soap-bubble-1958650_960_720.jpg',
  'https://wallpaperbrowse.com/media/images/3848765-wallpaper-images-download.jpg',
];

class Test extends Component {
  constructor() {
    super();
    this.selectLanguage = this.selectLanguage.bind(this);
    this.fullImage = this.fullImage.bind(this);
    this.loadVideoAds = this.loadVideoAds.bind(this);
    this.showVideoAds = this.showVideoAds.bind(this);
    this.viewPager = this.viewPager.bind(this);
    this.state = {fb_video_ads_loaded: false};
  }

  componentWillMount() {}

  render() {
    return (
      <View style={{flex: 1}}>
        <Button
          onPress={this.selectLanguage}
          title={this.props.i18n.switch_lang}
        />
        <Button onPress={this.showMessage} title="show message bar " />
        <Button onPress={downloader} title="Download images" />
        <Button onPress={this.actionView} title="Action View" />
        <Button onPress={this.fullImage} title="Full Image" />
        <Button onPress={this.viewPager} title="View Pager" />
        <Text>Facebook Ads * </Text>
        <Button onPress={this.showInterstitial} title="Show Interstitial" />
        <Button onPress={this.loadVideoAds} title="Load Video Ads" />
        <Button onPress={this.showVideoAds} title="Show Video Ads" />
        {this.viewWithBanner()}
        <Text>Admob Ads</Text>
        <Button
          onPress={this.showInterstitialAdmob}
          title="Show Interstitial"
        />
        <Button onPress={this.showVideoAdsAdmob} title="Show Video Ads" />
        {this.viewBannerAddmob()}
      </View>
    );
  }

  viewPager() {
    const data = {items: imageUrls, index: 0};
    this.props.navigation.navigate(SCREENS.ProtoDetailView, {...data});
  }

  showInterstitialAdmob() {
    const advert = firebase
      .admob()
      .interstitial(ADS_PLACEMENT_IDS.test.admob.interstitial_video);

    const AdRequest = firebase.admob.AdRequest;
    const request = new AdRequest();
    request.addKeyword('foo').addKeyword('bar');

    // Load the advert with our AdRequest
    advert.loadAd(request.build());

    advert.on('onAdLoaded', () => {
      console.log('Advert ready to show.');
      advert.show();
    });

    // Simulate the interstitial being shown "sometime" later during the apps lifecycle
    //         setTimeout(() => {
    //             if (advert.isLoaded()) {
    //                 advert.show();
    //             } else {
    //                 // Unable to show interstitial - not loaded yet.
    //             }
    //         }, 1000);
  }

  showVideoAdsAdmob() {
    const advert = firebase
      .admob()
      .rewarded(ADS_PLACEMENT_IDS.test.admob.video);

    const AdRequest = firebase.admob.AdRequest;
    const request = new AdRequest();
    request.addKeyword('foo').addKeyword('bar');

    // Load the advert with our AdRequest
    advert.loadAd(request.build());

    advert.on('onAdLoaded', () => {
      console.log('Advert ready to show. Video');
      advert.show();
    });

    advert.on('onRewarded', event => {
      console.log(
        'The user watched the entire video and will now be rewarded!',
        event,
      );
    });
  }
  viewBannerAddmob() {
    const Banner = firebase.admob.Banner;
    const AdRequest = firebase.admob.AdRequest;
    const request = new AdRequest();
    request.addKeyword('foobar');
    return (
      <Banner
        unitId={ADS_PLACEMENT_IDS.test.admob.banner}
        request={request.build()}
        onAdLoaded={() => {
          console.log('Advert loaded');
        }}
        onAdFailedToLoad={e => {
          console.log('Admob ads failed to load ', e);
        }}
      />
    );
  }

  viewWithBanner() {
    return (
      <View>
        <BannerView
          placementId={ADS_PLACEMENT_IDS.test.fb.banner}
          type="standard"
          onPress={() => console.log('click')}
          onError={err => console.log('banner error', err)}
        />
      </View>
    );
  }

  loadVideoAds() {
    RewardedVideoAdManager.loadAd('placement')
      .then(() => {}) // fill success
      .catch(e => {
        console.log('Error on video ad loading ', e);
      }); // no fill or SDK error
  }

  showVideoAds() {
    if (this.state.fb_video_ads_loaded) {
      RewardedVideoAdManager.showAd()
        .then(() => {
          console.log('Video ads watched');
        }) // fully watched video, set your reward.
        .catch(e => {
          console.log('Video ads error ', e);
        }); // error
    } else {
      showToast('Video ad not loaded');
    }
  }

  showInterstitial() {
    InterstitialAdManager.showAd(ADS_PLACEMENT_IDS.test.fb.interstitial)
      .then(didClick => {})
      .catch(error => {});
  }

  fullImage() {
    firebase.analytics().logEvent('full_image_clicked', {name: 'test'});
    const data = {images: imageUrls, viewerIndex: 0};
    this.props.navigation.navigate(SCREENS.ImageViewer, {...data});
  }

  actionView() {
    const IMG_PATH = '/storage/emulated/0/Pictures/protonews/';
    const android = RNFetchBlob.android;
    android.actionViewIntent(IMG_PATH, '*/*');
  }

  showMessage() {
    console.log('show message bar called');
    MessageBarManager.showAlert({
      title: 'Your alert title goes here',
      message: 'Your alert message goes here',
      alertType: 'success',
      position: 'bottom',
      animationType: 'SlideFromBottom',
      shouldHideAfterDelay: true,
    });
  }

  selectLanguage() {
    if (this.props.lang === 'ne') {
      this.props.selectLanguage('en');
    } else {
      this.props.selectLanguage('ne');
    }
  }
}

export default connect(
  null,
  {selectLanguage},
)(connectLocalization(Test));
